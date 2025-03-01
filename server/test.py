from tensorflow.keras.models import load_model # type: ignore
from tensorflow.keras.preprocessing import image
import cv2 as cv2
import numpy as np
import matplotlib.pyplot as plt
import base64

# โหลดโมเดลที่บันทึกไว้
model = load_model("server/models/animal.h5")  # หรือ .keras ก็ได้

# แสดงโครงสร้างของโมเดล
model.summary()

# โหลดภาพที่ต้องการทำนาย

# Step 3: Convert the binary data to a numpy array
img_path = 'server/dataset/mytest/images (12).jpg'  # แทนที่ path ของภาพที่คุณต้องการทำนาย
img = image.load_img(img_path, target_size=(128, 128))

# แปลงภาพเป็น Tensor
img_array = image.img_to_array(img)
img_array = np.expand_dims(img_array, axis=0)
img_array = img_array / 255.0  # ทำการ normalize (ถ้าจำเป็น)

# ทำนายผล
prediction = model.predict(img_array)
predicted_class = np.argmax(prediction)
classname = ['cane', 'cavallo', 'elefante', 'farfalla', 'gallina', 'gatto', 'mucca', 'pecora', 'ragno', 'scoiattolo']
translate = {"cane": "dog", "cavallo": "horse", "elefante": "elephant", "farfalla": "butterfly", "gallina": "chicken", "gatto": "cat", "mucca": "cow", "pecora": "sheep", "scoiattolo": "squirrel", "dog": "cane", "cavallo": "horse", "elephant" : "elefante", "butterfly": "farfalla", "chicken": "gallina", "cat": "gatto", "cow": "mucca", "ragno": "spider", "squirrel": "scoiattolo"}
print(translate[classname[predicted_class]])
# แสดงภาพ
plt.imshow(img)
plt.show()
