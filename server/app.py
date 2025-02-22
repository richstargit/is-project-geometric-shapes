from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from model import modelCNN

app = FastAPI()

origins = [
    "http://unknowkubbrother.net",
    "http://api-ai.unknowkubbrother.net",
    "http://localhost",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

if __name__=="__main__":
    app.run()