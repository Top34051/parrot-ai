from google.cloud import speech


class SpeechToText():

    def __init__(self):
        self.client = speech.SpeechClient()
        self.config = speech.RecognitionConfig(
            encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
            sample_rate_hertz=16000,
            language_code="en-US",
        )

    def transcribe(self, content):
        audio = speech.RecognitionAudio(content=content)
        response = self.client.recognize(config=self.config, audio=audio)
        transcript = []
        for result in response.results:
            transcript += result.alternatives[0].transcript.split()
        transcript = ' '.join(transcript)
        return transcript
