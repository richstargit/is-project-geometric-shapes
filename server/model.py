import os as os
import matplotlib.pyplot as plt
import cv2 as cv2
import numpy as np
from tensorflow.keras.models import load_model # type: ignore
import joblib as joblib
import io as io
import base64 as base64
from tensorflow.keras.preprocessing import image # type: ignore
import gdown

# โหลดโมเดลที่บันทึกไว้
#CNNmodel = load_model("./models/cnn_animal.h5")
# KNNmodel = joblib.load("./models/knn_model.pkl")
#LRmodel = joblib.load("./models/LR_model.pkl")

url_knn="https://drive.google.com/uc?export=download&id=1DsYkGlptGa-5_Fu5uNBi4q5j5_-j0ZRg"
url_lr="https://drive.google.com/uc?export=download&id=1dQLbhZad1lIdD9rwHGepzPBvlZaUqlmz"
url_cnn="https://drive.google.com/uc?export=download&id=1tdrMa7hDYvm8m8pjkccCf06kTnFGsg4w"
gdown.download(url_knn, 'knn_model.pkl', quiet=False)
gdown.download(url_lr, 'LR_model.pkl', quiet=False)
gdown.download(url_cnn, 'cnn_animal.h5', quiet=False)
KNNmodel = joblib.load('knn_model.pkl')
LRmodel = joblib.load('LR_model.pkl')
CNNmodel = load_model("cnn_animal.h5")

def modelLR(imageBuffer):
    try:
        img = cv2.cvtColor(imageBuffer, cv2.COLOR_BGR2GRAY)
        pixel_values = img.flatten() 
        
        pixel_values[pixel_values == 0] = 1
        pixel_values[pixel_values > 200] = 0
        pixel_values[pixel_values != 0] = 1
    

        # ทำนายผลลัพธ์œœœœœ
        predictions = LRmodel.predict([pixel_values])
        predicted_class = predictions[0]  # ได้ค่าที่โมเดลคิดว่าถูกต้องที่สุด
        classname = ['Rectangle', 'Parallelogram', 'Trapezoid', 'Square','Circle', 'Kite', 'Triangle', 'Rhombus']


        return classname[predicted_class]
    except Exception as e:
        return f"Error: {str(e)}"

def modelKNN(imageBuffer):
    try:
        img = cv2.resize(imageBuffer, (224, 224))
        img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        pixel_values = img.flatten() 
        
        pixel_values[pixel_values == 0] = 1
        pixel_values[pixel_values > 200] = 0
        pixel_values[pixel_values != 0] = 1


        # ทำนายผลลัพธ์
        predictions = KNNmodel.predict([pixel_values])
        predicted_class = predictions[0]  # ได้ค่าที่โมเดลคิดว่าถูกต้องที่สุด
        classname = ['Rectangle', 'Parallelogram', 'Trapezoid', 'Square','Circle', 'Kite', 'Triangle', 'Rhombus']


        return classname[predicted_class]
    except Exception as e:
        return f"Error: {str(e)}"

def modelCNN(imageBuffer):
    try:
        img = image.load_img(imageBuffer, target_size=(128, 128))
        img = image.img_to_array(img)
        img = np.expand_dims(img, axis=0)  # เพิ่มมิติให้เป็น (1, 128, 128, 3)
        img = img / 255.0  # ปรับค่าให้อยู่ในช่วง [0,1]

        # ทำนายผลลัพธ์
        predictions = CNNmodel.predict(img)
        predicted_class = np.argmax(predictions, axis=1)[0]

        # รายชื่อคลาส
        classname = ['cane', 'cavallo', 'elefante', 'farfalla', 'gallina', 
                     'gatto', 'mucca', 'pecora', 'ragno', 'scoiattolo']
        translate = {
            "cane": "dog", "cavallo": "horse", "elefante": "elephant", 
            "farfalla": "butterfly", "gallina": "chicken", "gatto": "cat", 
            "mucca": "cow", "pecora": "sheep", "ragno": "spider", "scoiattolo": "squirrel"
        }

        # แปลงชื่อคลาสเป็นภาษาอังกฤษ
        result = translate.get(classname[predicted_class], "unknown")

        return result

    except Exception as e:
        return f"Error: {str(e)}"