from fastapi import FastAPI, File
from fastapi.middleware.cors import CORSMiddleware

import requests
import io, os
from pydub import AudioSegment
from tqdm import tqdm

from form_scraper import extract_form
from text_to_speech import TextToSpeech
from speech_to_text import SpeechToText


app = FastAPI()
origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
    "https://parrot-ai.vercel.app"
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
def transcribe(audio_file: bytes = File(...)):

    os.makedirs('tmp', exist_ok=True)
    
    # convert audio file (ogg) to mp3
    with open('tmp/audio.ogg', 'wb') as f:
        f.write(audio_file)
    song = AudioSegment.from_file('tmp/audio.ogg')
    song.export('tmp/audio.mp3', format="mp3")

    # transcribe audio content
    with io.open('tmp/audio.mp3', 'rb') as f:
        content = f.read()
    transcript = speech_to_text.transcribe(content)
    return transcript
   

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
