# Parrot.Ai Backend System

Parrot.Ai backend system mainly supports 

1. form extraction
2. speech conversion both synthesis and recognition.

## Form Extraction

User can use this system to perform form extraction given just an url to the google form link.

Currently, we only support five types of form item:

1. Title and description
2. Short answer
3. Multiple choice
4. Checkboxes
5. Dropdown

The result will be a list of form items listed above.

### Title and description

```json
{
    'type': 'title-and-description',
    'data': {
        'text': {
            'title': <title>,
            'description': <description>
        },
        'audio-uri': {
            'title': <title>,
            'description': <description>
        }
    }
}
```

### Short answer

```json
{
    'type': 'short-answer',
    'data': {
        'text': {
            'title': <title>,
            'description': <description>
        },
        'audio-uri': {
            'title': <title>,
            'description': <description>
        }
    }
}
```

### Multiple choice

```json
{
    'type': 'multiple-choice',
    'data': {
        'text': {
            'title': <title>,
            'description': <description>,
            'options': [
                <option_1>,
                <option_2>,
                ...
            ]
        },
        'audio-uri': {
            'title': <title>,
            'description': <description>,
            'options': [
                <option_1>,
                <option_2>,
                ...
            ]
        }
    }
}
```

### Checkboxes

```json
{
    'type': 'checkboxes',
    'data': {
        'text': {
            'title': <title>,
            'description': <description>,
            'options': [
                <option_1>,
                <option_2>,
                ...
            ]
        },
        'audio-uri': {
            'title': <title>,
            'description': <description>,
            'options': [
                <option_1>,
                <option_2>,
                ...
            ]
        }
    }
}
```

### Dropdown

```json
{
    'type': 'dropdown',
    'data': {
        'text': {
            'title': <title>,
            'description': <description>,
            'options': [
                <option_1>,
                <option_2>,
                ...
            ]
        },
        'audio-uri': {
            'title': <title>,
            'description': <description>,
            'options': [
                <option_1>,
                <option_2>,
                ...
            ]
        }
    }
}
```

## Speech Synthesize

The system synthesizes speech for each form item such as title, description, question, and choices. The system will call Google Cloud Text-to-Speech API to generate such audio and store them in Firebase.

## Speech Recognition

The system uses Google Cloud Speech-to-Text API to transcribe given audio blob from the user.
