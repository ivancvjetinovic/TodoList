import strawberry
from typing import List
from sqlalchemy import text
from schema import tasks, conn

@strawberry.type
class Task:
    id: int
    description: str
    done: bool

@strawberry.type
class Query:
    @strawberry.field
    def task(self, id: int) -> Task:
        return conn.execute(tasks.select().where(tasks.c.id == id)).fetchone()
    
    @strawberry.field
    def tasks(self) -> List[Task]:
        return conn.execute(tasks.select()).fetchall()
    
@strawberry.type
class Mutation:
    @strawberry.mutation
    def create_task(self, description: str) -> bool:
        res = conn.execute(tasks.insert().values(description=description, done=False))
        conn.commit()
        return int(res.inserted_primary_key[0])

    @strawberry.mutation
    def update_description(self, id: int, description: str) -> str:
        res = conn.execute(tasks.update().where(tasks.c.id == id).values(description=description))
        conn.commit()
        return str(res.rowcount) + ' row(s) affected'
    
    @strawberry.mutation
    def update_status(self, id: int) -> str:
        done = conn.execute(tasks.select().where(tasks.c.id == id)).fetchone()[2]
        res = conn.execute(tasks.update().where(tasks.c.id == id).values(done=not done))
        conn.commit()
        return str(res.rowcount) + ' row(s) affected'

    @strawberry.mutation
    def delete_task(self, id: int) -> bool:
        res = conn.execute(tasks.delete().where(tasks.c.id == id))
        conn.commit()
        return res.rowcount > 0

def get_schema():
    schema = strawberry.Schema(Query, Mutation)
    return schema

def get_task_descriptions():
    res = conn.execute(
        text("SELECT T.description, T.done FROM tasks as T")).fetchall()
    return res

def add_task(description):
    res = conn.execute(tasks.insert().values(description=description, done=False))
    conn.commit()
    return int(res.inserted_primary_key[0])
