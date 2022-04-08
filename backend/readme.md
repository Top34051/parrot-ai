# Parrot.Ai Backend Application

The backend side is implemented using python FastAPI and is being deployed on Google Cloud App Engine. We choose Cloud App Engine due to its convenient supporting microservices and Horizontal scaling. It is responsible for performing form extraction and communicating with Google Cloud APIs. We utilize three APIs as follows:

(1) Cloud Text-to-Speech is being used to synthesize natural speech of the information we extracted from the Google Forms

(2) Cloud Speech-to-Text is being used to transcribe a user's input audio into text to fill the form

(3) Cloud Storage is being used to store user’s audio response for the form owner to replay it if the text response is ambiguous

## Run Backend Application

You have to set up the google cloud service account and authorize all of the following APIs.

(1) Cloud Text-to-Speech API
(2) Cloud Speech-to-Text API
(3) Cloud Storage (please initialize bucket named `audio-responses` and authorize bucket owner role)

Then, download your service account and export the `GOOGLE_APPLICATION_CREDENTIAL`.

```
export GOOGLE_APPLICATION_CREDENTIALS=<PATH_TO_YOUR_SERVICE_ACCOUNT_KEY>
```

Finally, run the application.

```
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### API documentation

The interactive API documentation is provided at [http://localhost:8000/docs](http://localhost:8000/docs).
