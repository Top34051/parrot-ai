# Parrot.AI

Visit our website at https://parrot-ai.vercel.app/

Parrot.Ai is a web application that allows users to complete a form without having to read and write by themselves. It will navigate users through the form and fill out each question in a conversation-like manner. 

Our application extracts information–including titles, descriptions, and options–from a given Google form and renders them for the user to interact with. We choose Google Forms because it is simple and effective. The application consists of two main components: frontend and backend.

The frontend side–implemented using Next.js, React, Tailwind CSS, and webpack–is responsible for rendering interactable visual elements and performing client-side logic. We choose Next.js due to future support for SSR and better SEO. We are using React for simplicity in implementing interactions with users and easy migration to react-native for mobile apps support in future. The website supports audio recording and calls the backend API to perform more complicated tasks, if necessary.

The backend side is implemented using python FastAPI and is being deployed on Google Cloud App Engine. We choose Cloud App Engine due to its convenient supporting microservices and Horizontal scaling. It is responsible for performing form extraction and communicating with Google Cloud APIs. We utilize three APIs as follows:

(1) Cloud Text-to-Speech is being used to synthesize natural speech of the information we extracted from the Google Forms
(2) Cloud Speech-to-Text is being used to transcribe a user's input audio into text to fill the form
(3) Cloud Storage is being used to store user’s audio response for the form owner to replay it if the text response is ambiguous
