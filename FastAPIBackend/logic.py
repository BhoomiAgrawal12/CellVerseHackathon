import random

# Diet Plan Generator
def generate_diet_plan(disease, responses):
    diet_plans = {
        "Anxiety": [
            "Include omega-3 rich foods (salmon, flaxseeds).",
            "Avoid caffeine and sugary foods.",
            "Eat magnesium-rich foods like spinach & nuts.",
            "Stay hydrated with herbal teas."
        ],
        "Depression": [
            "Increase vitamin B12 & folate (eggs, dairy, beans).",
            "Consume complex carbs (whole grains, vegetables).",
            "Avoid processed food & alcohol.",
            "Include lean protein (chicken, fish, tofu)."
        ]
    }
    return diet_plans.get(disease, ["Eat a balanced diet and stay hydrated."])

# Gamified Recovery Recommendations
def get_gamification_recommendations(disease):
    recommendations = {
        "Anxiety": ["Try meditation-based games on our site.", "Engage in stress-relief challenges."],
        "Depression": ["Track daily mood progress through interactive charts.", "Participate in virtual fitness challenges."]
    }
    return recommendations.get(disease, ["Explore self-improvement games on our platform."])
