import io, os
from pydub import AudioSegment

def convert_audio_file(audio_file):

    os.makedirs('/tmp', exist_ok=True)
    
    with open('/tmp/audio.ogg', 'wb') as f:
        f.write(audio_file)

    song = AudioSegment.from_file('/tmp/audio.ogg')
    song.export('/tmp/audio.mp3', format="mp3")

    with io.open('/tmp/audio.mp3', 'rb') as f:
        content = f.read()

    return content