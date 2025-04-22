from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

from constants import LLM

PROMPT = """
    You are an intelligent assistant tasked with understanding a user's task management style.

    Here is their Todo List and respective statuses where 1 denotes complete and 0 means incomplete:
    <todo_list>
    {todo_list}
    </todo_list>

    Based on the provided tasks and their statuses, generate a new task that aligns with the user's typical style and priorities.
    Please ensure the new task is relevant and follows the user's existing patterns.
    Output ONLY the new task description.
"""

def generate_task(task_descriptions):
    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are an expert human behavioral researcher."),
        ("human", PROMPT)
    ])
    output_parser = StrOutputParser()

    chain = prompt | LLM | output_parser
    response = chain.invoke({
        "todo_list": task_descriptions
    })

    return response
