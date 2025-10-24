import requests
import os
from dotenv import load_dotenv

load_dotenv()

url="https://en.wikipedia.org/w/api.php"
header={"User-Agent":os.getenv("USER_AGENT")}

def getContent(country):
    params={
        "action":"query",
        "format":"json",
        "prop":"extracts",
        "titles":country,
        "explaintext":True
    }
    res=requests.get(url=url,headers=header,params=params)
    data=res.json()
    pages=data["query"]["pages"]
    page=list(pages.values())[0]
    return page["extract"]