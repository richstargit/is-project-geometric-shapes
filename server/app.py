from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from model import modelCNN, modelKNN
import base64
import numpy as np
import cv2
from classInterface import interfacePreditCNN,interfacePreditKNN
import re  # สำหรับลบ prefix ที่ไม่ต้องการ
import io as io

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


@app.post("/predict/CNN")
def predictCNN(body: interfacePreditCNN):

    base64_data = re.sub(r'^data:image/[^;]+;base64,', '', body.image)

    # Step 2: Decode the Base64 string into binary data
    img_data = base64.b64decode(base64_data)

    img = io.BytesIO(img_data)

    result = modelCNN(img)
    
    return {"result": result}

@app.post("/predict/KNN")
def predictKNN(body: interfacePreditKNN):

    base64_data = re.sub(r'^data:image/[^;]+;base64,', '', body.image)

    # Step 2: Decode the Base64 string into binary data
    img_data = base64.b64decode(base64_data)

    # Step 3: Convert the binary data to a numpy array
    np_array = np.frombuffer(img_data, np.uint8)

    # Step 4: Decode the numpy array into an image
    img = cv2.imdecode(np_array, cv2.IMREAD_COLOR)
    result = modelKNN(img)
    return {"result": result}