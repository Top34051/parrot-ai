from fastapi import FastAPI

from form_scraper import extract_items
from text_to_speech import TextToSpeech
from speech_to_text import SpeechToText

import io

app = FastAPI()
text_to_speech = TextToSpeech()
speech_to_text = SpeechToText()


@app.get("/")
def root():
    return "Hello world"


@app.post('/transcribe')
# def transcribe(audio_content: str):
#     return speech_to_text.transcribe(audio_content)
def transcribe():
    with open('/Users/top34051/Desktop/2022/projects/parrot-ai/output.mp3', 'rb') as f:
        content = f.read()
    print(speech_to_text.transcribe(content))



@app.post('/forms')
def forms(url: str):
    
    items = extract_items(url)

    text = items['data']['text']

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
    items['data']['audio_content'] = audio_content

    return items