import boto3
import os
from dotenv import load_dotenv

load_dotenv()

class Database:
    database=None
    def __init__(self):
        self.database=boto3.resource("dynamodb",region_name=os.getenv("REGION"))

    def getTable(self,tableName):
        table=self.database.Table(tableName)
        table.load()
        return table