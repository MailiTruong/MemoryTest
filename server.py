from fastapi import FastAPI, HTTPException
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict
import json
from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
)

# Mount a static file directory for favicon
app.mount("/static", StaticFiles(directory="."), name="static")

class Participant(BaseModel):
    id: Optional[int] = -1
    name: str

class ParticipantList(BaseModel):
    participants: List[Participant]

class ParticipantAnswers(BaseModel):
    answers: List[str]

def get_participant_list_from_file() -> ParticipantList:
    try:
        with open('data.json', 'r') as file:
            contents = json.load(file)
            participants = contents['participants']
            participant_list = ParticipantList(participants=[Participant(**p) for p in participants])
    except (FileNotFoundError, json.JSONDecodeError):
        participant_list = ParticipantList(participants=[])
    return participant_list

def write_participant_list(participant_list: ParticipantList):
    with open('data.json', 'w') as file:
        json.dump(participant_list.dict(), file, indent=2)

def write_participant_answers(participant_id: int, answers: List[str]):
    try:
        with open('answers.json', 'r') as file:
            all_answers = json.load(file)
    except (FileNotFoundError, json.JSONDecodeError):
        all_answers = {}

    all_answers[participant_id] = answers

    with open('answers.json', 'w') as file:
        json.dump(all_answers, file, indent=2)

def get_answers_for_question(question_number: int) -> Dict[int, str]:
    try:
        with open('answers.json', 'r') as file:
            all_answers = json.load(file)
            # Extract answers for the specified question
            return {k: v[question_number - 1] for k, v in all_answers.items() if len(v) >= question_number}
    except (FileNotFoundError, json.JSONDecodeError):
        return {}

def get_answers_by_participant(participant_id: int) -> List[str]:
    try:
        with open('answers.json', 'r') as file:
            all_answers = json.load(file)
            return all_answers.get(str(participant_id), [])
    except (FileNotFoundError, json.JSONDecodeError):
        return []

@app.get("/", response_class=HTMLResponse)
def get_index():
    with open('index.html', 'r') as file:
        return file.read()

@app.post("/participant", status_code=201)
async def add_participant(participant: Participant) -> Participant:
    participant_list = get_participant_list_from_file()

    if participant_list.participants:
        participant.id = participant_list.participants[-1].id + 1
    else:
        participant.id = 1

    participant_list.participants.append(participant)
    write_participant_list(participant_list)
    return participant

@app.get("/participant/list", response_model=ParticipantList)
def get_participants() -> ParticipantList:
    participant_list = get_participant_list_from_file()
    return participant_list

@app.post("/participant/{participant_id}/answers")
async def submit_answers(participant_id: int, participant_answers: ParticipantAnswers):
    write_participant_answers(participant_id, participant_answers.answers)
    return {"message": "Answers saved successfully."}

@app.get("/answers/question/{question_number}")
def get_answers_by_question(question_number: int):
    answers = get_answers_for_question(question_number)
    return answers

@app.get("/answers/{participant_id}")
def get_answers_for_participant(participant_id: int):
    answers = get_answers_by_participant(participant_id)
    return {str(participant_id): answers}

@app.get("/favicon.ico")
async def favicon():
    return FileResponse("favicon.ico")

# Run the application with:
# uvicorn server:app --reload

