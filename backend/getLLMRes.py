import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

client=genai.Client(api_key=os.getenv("GEMINI"))

def getLLMRes(context,country):
    query=f"""Based on the following wikipedia text about the country: {country},
    summarize key points and interesting facts in three sections:
    1. General information
    2. Historical background
    3. Cultural highlights
    4. Geographical features

    **important**
    - return strictly valid json only
    - do NOT add any explanations, commecnts or text outside the json
    - do NOT include any markdown formatting
    - the json MUST contain only the key points as keys
    - do not use double quotes
    
    **JSON format**
    {{
        "Historical Background":{{
            "Topic 1":"description",
            "Topic 2":"description"
        }},
        "Cultural highlights":{{...}},
        "Geographical features":{{...}}
    }}
    wikipedia content:
    {context}
    """
    
    res=client.models.generate_content(
        model="gemini-2.5-flash",
        contents=query
    )
    return res.text