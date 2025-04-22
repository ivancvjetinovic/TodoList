import os
from langchain_openai import AzureChatOpenAI

from dotenv import load_dotenv, find_dotenv
_ = load_dotenv(find_dotenv())

AZURE_OPENAI_API_KEY = os.getenv("AZURE_OPENAI_API_KEY")
AZURE_OPENAI_ENDPOINT = os.getenv("AZURE_OPENAI_ENDPOINT")
OPENAI_API_VERSION = os.getenv("AZURE_OPENAI_API_VERSION")
AZURE_DEPLOYMENT_NAME = os.getenv("AZURE_DEPLOYMENT_NAME")
AZURE_OPENAI_MODEL_NAME = os.getenv("AZURE_OPENAI_MODEL_NAME")

LLM = AzureChatOpenAI(
    azure_deployment=AZURE_DEPLOYMENT_NAME,
    api_version=OPENAI_API_VERSION,
    model=AZURE_OPENAI_MODEL_NAME,
    api_key=AZURE_OPENAI_API_KEY,
    temperature=0.1
)

FRONTEND_URL = "http://localhost:5173"
DATABASE_URL = "sqlite:///./todo_tasks.sqlite"