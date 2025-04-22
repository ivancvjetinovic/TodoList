# Backend Dockerfile

FROM python:3.11
WORKDIR /src/backend
COPY ./requirements.txt .
RUN pip install -r requirements.txt
COPY ./src/backend .
CMD ["uvicorn", "main:app", "--reload"]