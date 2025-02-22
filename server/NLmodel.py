from tensorflow.keras.models import load_model # type: ignore
import cv2 as cv2
import numpy as np
import matplotlib.pyplot as plt

# โหลดโมเดลที่บันทึกไว้
model = load_model("server/models/geometric_shapes_cnn.h5")  # หรือ .keras ก็ได้

# แสดงโครงสร้างของโมเดล
model.summary()

# โหลดภาพที่ต้องการทำนาย
image_path = "server/dataset/mytest/mytest4.jpg"  # เปลี่ยนเป็น path จริงของคุณ
img = cv2.imread(image_path)  
img = cv2.resize(img, (224, 224))  # ปรับขนาดให้ตรงกับที่ใช้เทรน
img = img / 255.0  # ปรับให้เป็นค่า [0,1]
img = np.expand_dims(img, axis=0)  # เพิ่มมิติให้เป็น (1, 224, 224, 3)

# ทำนายผลลัพธ์
predictions = model.predict(img)
predicted_class = np.argmax(predictions, axis=1)[0]  # ได้ค่าที่โมเดลคิดว่าถูกต้องที่สุด
classname = ['circle', 'kite', 'parallelogram', 'rectangle', 'rhombus', 'square', 'trapezoid', 'triangle']
print(classname[predicted_class])

# แสดงภาพ
plt.imshow(cv2.imread(image_path)[:, :, ::-1])  # แปลงจาก BGR -> RGB
plt.axis("off")
plt.show()
