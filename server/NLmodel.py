# from tensorflow.keras.models import load_model # type: ignore
# import cv2 as cv2
# import numpy as np
# import matplotlib.pyplot as plt
# import base64

# # โหลดโมเดลที่บันทึกไว้
# model = load_model("server/models/geometric_shapes_cnn.h5")  # หรือ .keras ก็ได้

# # แสดงโครงสร้างของโมเดล
# model.summary()

# # โหลดภาพที่ต้องการทำนาย
# #image_path = "server/dataset/mytest/mytest4.jpg"  # เปลี่ยนเป็น path จริงของคุณ
# img_data = base64.b64decode("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")

# # Step 3: Convert the binary data to a numpy array
# np_array = np.frombuffer(img_data, np.uint8)

# # Step 4: Decode the numpy array into an image
# img = cv2.imdecode(np_array, cv2.IMREAD_COLOR)
# temp = img
# img = cv2.resize(img, (224, 224))  # ปรับขนาดให้ตรงกับที่ใช้เทรน
# img = img / 255.0  # ปรับให้เป็นค่า [0,1]
# img = np.expand_dims(img, axis=0)  # เพิ่มมิติให้เป็น (1, 224, 224, 3)

# # ทำนายผลลัพธ์
# predictions = model.predict(img)
# predicted_class = np.argmax(predictions, axis=1)[0]  # ได้ค่าที่โมเดลคิดว่าถูกต้องที่สุด
# classname = ['circle', 'kite', 'parallelogram', 'rectangle', 'rhombus', 'square', 'trapezoid', 'triangle']
# print(classname[predicted_class])

# # แสดงภาพ
# cv2.imshow("Decoded Image", temp)
# cv2.waitKey(0)
cv2.destroyAllWindows()
