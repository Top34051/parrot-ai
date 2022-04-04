from fastapi import FastAPI, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

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


@app.post('/convert_audio')
def convert_audio(audio_file: bytes = File(...)):

    print(audio_file)

    os.makedirs('tmp', exist_ok=True)
    
    with open('tmp/audio.ogg', 'wb') as f:
        f.write(audio_file)

    song = AudioSegment.from_file('tmp/audio.ogg')
    song.export('tmp/audio.mp3', format="mp3")

    with io.open('tmp/audio.mp3', 'rb') as f:
        content = f.read()

    return content.decode('iso-8859-1')


@app.post('/get_transcript')
def transcribe(audio_file: bytes = File(...)):

    os.makedirs('tmp', exist_ok=True)
    
    with open('tmp/audio.ogg', 'wb') as f:
        f.write(audio_file)

    song = AudioSegment.from_file('tmp/audio.ogg')
    song.export('tmp/audio.mp3', format="mp3")

    with io.open('tmp/audio.mp3', 'rb') as f:
        content = f.read()

    transcript = speech_to_text.transcribe(content)
    return transcript
   

@app.post('/forms')
def forms(url: str):
    
    raw_form = extract_form(url)

    print('Generating audio for the form')

    form = {
        'title': raw_form['title'],
        'description': raw_form['description'],
        'form_items': []
    }

    for item in tqdm(raw_form['form_items']):

        text = item['data']['text']

        form_text = text['title'] + '\n' + text['description']
        for option in text['options']:
            form_text += '\n' + option

        form_audio = text['title'] + '\n' + text['description']
        for idx, option in enumerate(text['options']):
            form_audio += '\n' + 'Option {}: '.format(idx + 1) + option
        form_audio = form_audio.replace('*', '')
        form_audio = text_to_speech.synthesize(form_audio)

        form['form_items'].append({
            'type': item['type'],
            'data': {
                'text': form_text,
                'audio': form_audio
            },
            'required': item['required']
        })

    print(form)

    return form
