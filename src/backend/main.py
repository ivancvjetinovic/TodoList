from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from strawberry.asgi import GraphQL

from task_generation import generate_task
from database_utils import get_task_descriptions, add_task, get_schema
from constants import FRONTEND_URL

app = FastAPI()

@app.post("/generate_task")
def do_generate_task():
    task_descriptions = get_task_descriptions()
    new_task_description = generate_task(task_descriptions)
    add_task(new_task_description)

origins = [FRONTEND_URL]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

user = APIRouter()
schema = get_schema()
graphql_app = GraphQL(schema)
user.add_route('/graphql', graphql_app)
app.include_router(user)
