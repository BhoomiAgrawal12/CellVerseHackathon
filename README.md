# Swasthika — AI-Powered Mental Health Rehabilitation Platform

## Overview

**Swasthika** is an AI-powered platform that offers intelligent and personalized mental health rehabilitation. It combines clinical psychology principles with modern AI to support users dealing with **PTSD, addiction, social anxiety, depression, binge eating, obesity**, and more.

It features **gamified recovery modules**, **personalized diet charts** , **symptom based disease prediction**, and an **AI chatbot** that simulates therapeutic sessions based on user input, encouraging consistent engagement and emotional wellness.

## Features

- **Preliminary mental health quiz** for condition detection
- **AI-powered chatbot** for therapy simulation
- **Gamified recovery journey** to track progress through badges, rewards, and milestones
- **Custom diet chart generation** based on mental health conditions and physical needs
- **Privacy-first architecture** with anonymized data flow

## Video Demo

[![Swasthika Demo Video](https://img.youtube.com/vi/pXk0scN35GI/0.jpg)](https://www.youtube.com/watch?v=pXk0scN35GI)

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS, TypeScript
- **Backend**: FastAPI
- **AI Model**: Gemini API (Google AI)
- **Database**: PostgreSQL
- **Authentication & Email**: Resend API
- **Gamification Engine**: Custom logic using state-based progression

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/BhoomiAgrawal12/CellVerseHackathon
cd CellVerseHackathon
```

### 2. Create a Vitual Environment

```bash
# Create virtual environment
python -m venv venv

# Activate the environment
# For Windows:
venv\Scripts\activate

# For macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Run the Backend

```bash
cd FastAPIBackend
uvicorn main:app --reload
```

### 3.In a new terminal Run the Frontend

```bash
cd ..
npm install
npm run dev

```

## Contributing

We welcome contributions in the following areas:

- Prompt engineering & AI fine-tuning
- UI/UX for the gamified modules
- NLP improvements for chatbot interaction
- Integration of voice support and accessibility features

### To contribute:

- Fork this repo
- Create a branch: `git checkout -b feature-name`
- Submit a pull request

## License

[MIT](LICENSE)

---

Built with ❤ to support mental wellness through technology.
