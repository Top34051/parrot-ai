from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware


import requests

from form_scraper import extract_form
from text_to_speech import TextToSpeech
from speech_to_text import SpeechToText

from tqdm import tqdm


app = FastAPI()
origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
    "https://parrot-ai.vercel.app/"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


text_to_speech = TextToSpeech()
speech_to_text = SpeechToText()


@app.get('/is_valid_url')
def is_valid_url(url: str):
    response = requests.get(url)
    return response.status_code == 200


@app.post('/transcribe')
def transcribe(audio_content: str = Body(..., embed=True)):
    print(audio_content)
    return speech_to_text.transcribe(audio_content)


@app.post('/forms')
def forms(url: str):
    
    form = extract_form(url)

    print('Generating audio for the form')

    for item in tqdm(form['form_items']):
        text = item['data']['text']

        if 'options' in text:
            audio_content = {
                'title': text_to_speech.synthesize(text['title']),
                'description': text_to_speech.synthesize(text['description']),
                'options': [text_to_speech.synthesize(option) for option in text['options']]
            }
        else:
            audio_content = {
                'title': text_to_speech.synthesize(text['title']),
                'description': text_to_speech.synthesize(text['description'])
            }
        
        item['data']['audio_content'] = audio_content

    return form