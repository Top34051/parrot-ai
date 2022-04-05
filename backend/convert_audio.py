import io, os, uuid
from pydub import AudioSegment
from google.cloud import storage


def store_audio():

    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name='audio-responses')

    destination_blob_name = str(uuid.uuid4()) + '.mp3'
    while storage.Blob(bucket=bucket, name=destination_blob_name).exists(storage_client):
        destination_blob_name = str(uuid.uuid4()) + '.mp3'
    blob = bucket.blob(destination_blob_name)

    blob.upload_from_filename('/tmp/audio.mp3')

    return destination_blob_name


def convert_audio_file(audio_file):

    os.makedirs('/tmp', exist_ok=True)
    
    with open('/tmp/audio.ogg', 'wb') as f:
        f.write(audio_file)

    song = AudioSegment.from_file('/tmp/audio.ogg')
    song.export('/tmp/audio.mp3', format="mp3")

    with io.open('/tmp/audio.mp3', 'rb') as f:
        content = f.read()

    return content


def save_audio_file(audio_file):

    os.makedirs('/tmp', exist_ok=True)
    
    with open('/tmp/audio.ogg', 'wb') as f:
        f.write(audio_file)

    song = AudioSegment.from_file('/tmp/audio.ogg')
    song.export('/tmp/audio.mp3', format="mp3")

    url = store_audio()
    return 'https://storage.googleapis.com/audio-responses/' + url