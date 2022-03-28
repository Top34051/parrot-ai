from typing import Text
from google.cloud import texttospeech


class TextToSpeech():

    def __init__(self):
        self.client = texttospeech.TextToSpeechClient()
        self.voice = texttospeech.VoiceSelectionParams(
            language_code="en-US", 
            ssml_gender=texttospeech.SsmlVoiceGender.NEUTRAL
        )
        self.audio_config = texttospeech.AudioConfig(
            audio_encoding=texttospeech.AudioEncoding.MP3
        )

    def synthesize(self, text: str):
        synthesis_input = texttospeech.SynthesisInput(text=text)
        response = self.client.synthesize_speech(
            input=synthesis_input, 
            voice=self.voice, 
            audio_config=self.audio_config
        )
        with open('output.mp3', 'wb') as audio:
            audio.write(response.audio_content)
        return response.audio_content

if __name__ == '__main__':
    text_to_speech = TextToSpeech()
    print(text_to_speech.synthesize('Hello World'))
