from fastapi import FastAPI, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
)

class Participant(BaseModel):
    id: Optional[int] = -1
    name: str

class ParticipantList(BaseModel):
    participants: List[Participant]

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

# Run the application with:
# uvicorn server:app --reload

