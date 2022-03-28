from google.cloud import speech


class SpeechToText():

    def __init__(self):
        self.client = speech.SpeechClient()
        self.config = speech.RecognitionConfig(
            encoding=speech.RecognitionConfig.AudioEncoding.FLAC,
            sample_rate_hertz=24000,
            language_code="en-US",
        )

    def transcribe(self, content):
        audio = speech.RecognitionAudio(content=content)
        print(audio)
        response = self.client.recognize(config=self.config, audio=audio)
        print(response.results)
        for result in response.results:
            # The first alternative is the most likely one for this portion.
            print(u"Transcript: {}".format(result.alternatives[0].transcript))
