from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from model import modelCNN
import base64
import numpy as np
import cv2
from pydantic import BaseModel

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

class Item(BaseModel):
    itemname: str

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/items")
def read_item(item: Item):
    base64_data = item.itemname.replace("data:image/jpeg;base64,", "")

    # Step 2: Decode the Base64 string into binary data
    img_data = base64.b64decode(base64_data)

    # Step 3: Convert the binary data to a numpy array
    np_array = np.frombuffer(img_data, np.uint8)

    # Step 4: Decode the numpy array into an image
    img = cv2.imdecode(np_array, cv2.IMREAD_COLOR)
    result = modelCNN(img)
    return {"result": result}


if __name__=="__main__":
    app.run()