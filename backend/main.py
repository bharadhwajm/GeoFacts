from fastapi import FastAPI,Depends
# from fastapi.middleware.cors import CORSMiddleware
import getConWiki
import getLLMRes
from database import Database
import os
from dotenv import load_dotenv

load_dotenv()

app=FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"]
# )

def getTable():
    db=Database()
    return db.getTable(os.getenv("TABLE"))
    
@app.get("/")
def message():
    return {"message":"hello"}

@app.get("/getContent")
def getContent(country:str,table=Depends(getTable)):
    res=table.get_item(Key={"country":country})
    if "Item" in res:
        return res["Item"]["info"]
    wikipediaContent=getConWiki.getContent(country=country)
    structuredRes=getLLMRes.getLLMRes(wikipediaContent,country)
    table.put_item(Item={"country":country,"info":structuredRes})
    return structuredRes
