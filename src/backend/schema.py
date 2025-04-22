from sqlalchemy import (
    create_engine,
    MetaData,
    Column,
    Integer,
    String,
    Boolean,
    Table
)

from constants import DATABASE_URL

engine = create_engine(DATABASE_URL)
meta = MetaData()

tasks = Table(
    'tasks', meta,
    Column('id', Integer, primary_key=True, autoincrement=True),
    Column('description', String),
    Column('done', Boolean)
)

meta.create_all(engine)
conn = engine.connect()
