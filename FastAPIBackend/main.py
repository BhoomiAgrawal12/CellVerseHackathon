from typing import Dict,List
from fastapi import FastAPI, HTTPException
from langchain_google_genai import ChatGoogleGenerativeAI
from pydantic import BaseModel
import os
import re
import json
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

from langchain.document_loaders import PyPDFLoader
from langchain.vectorstores import Chroma
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import HuggingFaceEmbeddings 
from langchain.chains import RetrievalQA
load_dotenv()


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
)


GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# system_prompt = """
# You are a rehabilitation doctor specializing in post-surgery recovery, physical therapy, 
# mental health support, and chronic pain management. Provide expert medical advice, suggest 
# exercises, and offer emotional encouragement. Ensure responses are empathetic, evidence-based, 
# and suitable for different recovery stages.Do not refer to the doctor,instead consider yourself as a doctor and ask all the related questions acclrdingly and process them,if at the later stage,its too complicated than only refer to the doctor.
# """


llm = ChatGoogleGenerativeAI(
    model="gemini-2.0-flash",
    temperature=0.7,
    google_api_key=GOOGLE_API_KEY,
    # system_message=system_prompt
) 
class ScreeningRequest(BaseModel):
    responses: Dict[str, str]

class DetailedAssessmentRequest(BaseModel):
    diseases: List[str]
    responses: Dict[str, str] 

class chatRequest(BaseModel):
    diseases: List[str]
    responses:Dict[str, str]
    chat_history: list[Dict[str, str]]=[]

screening_questions = {
    "PTSD": "Have you experienced a traumatic event that still causes distress?",
    "Depression": "Have you been feeling sad, hopeless, or lost interest in activities you once enjoyed?",
    "Anxiety": "Do you often feel nervous, anxious, or on edge, even without a clear reason?",
    "Stress": "Do you feel overwhelmed by daily life responsibilities?",
    "OCD": "Do you have repetitive thoughts or behaviors that you feel compelled to perform?",
    "Panic Disorder": "Have you ever experienced sudden intense fear, heart racing, or difficulty breathing?",
    "Substance Abuse": "Do you rely on alcohol or drugs to cope with emotions or stress?",
    "Eating Disorder": "Do you have concerns about your eating habits, weight, or body image?",
    "Drug Recovery": "Are you recovering from substance addiction but struggling with cravings?",
    "Alcohol Addiction": "Do you find it difficult to reduce your alcohol consumption?",
    "Anorexia Nervosa": "Do you restrict food intake and fear gaining weight?",
    "Bulimia Nervosa": "Do you engage in binge eating followed by purging (vomiting, excessive exercise, laxatives)?",
    "Binge Eating Disorder": "Do you frequently eat large amounts of food in a short time, even when not hungry?",
}

disease_specific_questions = {
    "PTSD": [
        "Do you experience flashbacks or nightmares related to past trauma?",
        "Do you avoid certain places or activities due to past trauma?",
        "Do sudden noises or events trigger intense fear or panic?"
    ],
    "Depression": [
        "Do you experience a persistent feeling of sadness or emptiness?",
        "Do you struggle with low energy and motivation daily?",
        "Have you had thoughts of self-harm or suicide?"
    ],
    "Anxiety": [
        "Do you experience physical symptoms like a racing heart, sweating, or trembling when anxious?",
        "Do you have excessive worrying that interferes with daily life?",
        "Do you find it hard to control your worries?"
    ],
    "OCD": [
        "Do you feel extreme distress if you are unable to complete a certain ritual?",
        "Do you repeatedly check things (like locks, stoves) even when unnecessary?",
        "Do you have unwanted intrusive thoughts that make you anxious?"
    ],
    "Panic Disorder": [
        "Do you experience episodes of intense fear without an obvious cause?",
        "Do you feel like you are losing control or having a heart attack during an episode?",
        "Have these episodes significantly affected your daily life?"
    ],
    "Substance Abuse": [
        "Do you feel guilty or ashamed about your substance use?",
        "Have you tried to quit or cut down but failed?",
        "Has your substance use affected your work, relationships, or daily responsibilities?"
    ],
    "Alcohol Addiction": [
        "Do you frequently drink more than you intend to?",
        "Do you experience withdrawal symptoms like sweating, shaking, or nausea when not drinking?",
        "Have you neglected responsibilities because of drinking?"
    ],
    "Eating Disorder": [
        "Do you feel out of control when eating?",
        "Do you feel guilt or shame after eating?",
        "Do you use extreme methods (fasting, purging, excessive exercise) to control weight?"
    ],
    "Stress": [
        "Do you feel constantly pressured, even with small tasks?",
        "Do you struggle to relax, even when you have free time?",
        "Do you experience frequent headaches, muscle tension, or fatigue?"
    ],
    "Drug Recovery": [
        "Do you experience intense urges to use drugs despite your commitment to recovery?",
        "Do you feel tempted to return to old habits when facing emotional distress?",
        "Do you struggle with maintaining motivation to stay sober?"
    ],
    "Anorexia Nervosa": [
        "Do you often skip meals or eat significantly less than your body needs?",
        "Do you feel intense fear or distress at the thought of gaining weight?",
        "Do you exercise excessively to control your weight?"
    ],
    "Bulimia Nervosa": [
        "Do you eat large amounts of food in a short time and feel out of control?",
        "Do you use vomiting, fasting, or excessive exercise to compensate for overeating?",
        "Do you feel ashamed or guilty after binge episodes?"
    ],
    "Binge Eating Disorder": [
        "Do you eat until you feel uncomfortably full, even when not hungry?",
        "Do you eat large amounts of food in secret or alone due to embarrassment?",
        "Do you feel guilt, disgust, or shame after binge eating?"
    ]
}
@app.get("/screening-questions")
async def get_screening_questions():
  return(screening_questions)
 
@app.post("/screening")
async def screening(request: ScreeningRequest):
    detected_diseases = []

    for disease, question in screening_questions.items():
        response = request.responses.get(disease, "").lower()
        if response in ["yes", "y"]:
            detected_diseases.append(disease)

    if not detected_diseases:
        return {"message": "No potential mental health conditions detected.", "diseases": []}

    return {
        "message": "Based on your responses, we suggest further assessment.",
        "diseases": detected_diseases
    }
@app.post("/detailed_assessment")
async def detailed_assessment(request: DetailedAssessmentRequest):
    questions = {disease: disease_specific_questions[disease] for disease in request.diseases}
    return {
        "message": "Please answer the following questions for assessment.",
        "questions": questions
    }

def clean_and_format_response(text):
           text = text.replace("*", "")
    
           text = re.sub(r'•\s*', '\n• ', text)  
           text = re.sub(r'\d+\.\s*', lambda x: f"\n{x.group()}", text)  
    
           text = re.sub(r'\n\s*\n', '\n', text) 
           text = text.strip() 

           return text
@app.post("/diet")
async def generate_diet_chart(request: DetailedAssessmentRequest):
    """
    Generates a personalized diet plan based on the user's disease and responses.
    """
    try:
        response_text = "\n".join([f"{q}: {a}" for q, a in request.responses.items()])

        diet_prompt = f"""
        You are a dietary expert specializing in health-focused meal plans.
        The patient has been diagnosed with {request.diseases} and provided the following details:\n
        {response_text}
        
        Based on this, provide a structured diet plan in **strict JSON format**:

        {{
          "focus": "Brief description of the diet focus for {request.diseases}",
          "keyNutrients": ["Nutrient 1", "Nutrient 2", "Nutrient 3"],
          "foodsToLimit": ["Food 1", "Food 2", "Food 3"],
          "mealPlan": {{
            "breakfast": [{{ "option": "Meal 1" }}, {{ "option": "Meal 2" }}],
            "lunch": [{{ "option": "Meal 1" }}, {{ "option": "Meal 2" }}],
            "dinner": [{{ "option": "Meal 1" }}, {{ "option": "Meal 2" }}],
            "snacks": [{{ "option": "Snack 1" }}, {{ "option": "Snack 2" }}]
          }},
          "importantConsiderations": {{
            "hydration": "Hydration advice",
            "regularMeals": "Meal consistency advice",
            "portionControl": "Portion control tips",
            "listenToYourBody": "Listening to hunger and fullness cues"
          }}
        }}

        **Only return a valid JSON object. No extra text.**
        """

        chat_history = [
            {"role": "system", "content": diet_prompt},
            {"role": "user", "content": "What should my diet plan be?"}
        ]

        response = llm.invoke(chat_history)
        print("Raw LLM Response:", response)

        # response_text = response.content if hasattr(response, "content") else str(response)

        # response_text = clean_and_format_response(response_text)
        # return {"diet_plan": response_text}
        # Ensure response contains valid JSON format
        if not hasattr(response, "content"):
            raise ValueError("Invalid response from LLM")
        response_text = response.content.strip()
        print("Cleaned LLM Response:", response_text)

        response_text = clean_and_format_response(response_text)
        return {"diet_plan": response_text}
    except Exception as e:
        print("Error:", e)
        raise HTTPException(status_code=500, detail=str(e))


pdf_path = "./archive/json-to-pdf.pdf"
loader = PyPDFLoader(pdf_path)
documents = loader.load()

splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=100)
docs = splitter.split_documents(documents)
embedding = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
db = Chroma.from_documents(docs, embedding, persist_directory="./chroma_db")
db.persist()

@app.post("/chat")
async def chat(request: chatRequest):
    print("Received Request:", request) 

    try:
        if not request.responses:
            raise HTTPException(status_code=400, detail="No responses provided")

      
        response_text = "\n".join([f"- **{q}**: {a}" for q, a in request.responses.items()])

        if len(request.chat_history) == 1:

           system_prompt = f"""
           You are a rehabilitation coach helping users recover from {request.diseases}.
           The user has answered the following questions regarding their condition:\n
           {response_text}
        
           Based on this, provide step-by-step recovery suggestions,    emotional support, 
           and self-improvement exercises. Do not refer to a psychiatrist or doctor.
           Instead, guide the user on what they can do themselves.
        
           The user should be able to ask follow-up questions, and 
            Your response **must be concise and within 100 words**.
            Use **short sentences and bullet points** if necessary.
            Keep your answer **clear and actionable**.
           """
           chat_history=[{"role": "system", "content": system_prompt}]
        else:
            chat_history = request.chat_history

        print("Chat History Before Processing:", chat_history)
        latest_message = (chat_history[-1]["content"] if chat_history else "What should I do next?")


        chat_history.append({"role": "user", "content": latest_message})

        formatted_history = "\n".join([f"{msg['role']}: {msg['content']}" for msg in chat_history])
 
        formatted_history += "\n\nPlease keep your response within 100 words."

        # response = llm.invoke(formatted_history)
        retriever = db.as_retriever(search_kwargs={"k": 3})
        retrieved_docs = retriever.get_relevant_documents(latest_message)
        rag_context = "\n".join([doc.page_content for doc in retrieved_docs])
        
        final_prompt = f"""
         Use the following context to help answer the user's query:\n
         {rag_context}

         Chat History:
         {formatted_history}
          """

        response = llm.invoke(final_prompt)
        if not response:
         raise HTTPException(status_code=500, detail="LLM returned empty response")
       
        response_text = response.content if hasattr(response, "content") else str(response)
        
        response_text = clean_and_format_response(response_text)
        chat_history.append({"role": "bot", "content": response_text})
        print("Chat History After Processing:", chat_history)

        return {"response": response_text,"chat_history":chat_history}

    except Exception as e:
        print("Error:", e)
        raise HTTPException(status_code=500, detail=str(e))



