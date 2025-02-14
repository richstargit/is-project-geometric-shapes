import cv2
import matplotlib.pyplot as plt
from model import modelknn

knnmodel,encode = modelknn()

img_directory = 'server/dataset/mytest/mytest4.jpg'
img = cv2.imread(img_directory)
img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
_, binary_img = cv2.threshold(gray_img, 200, 255, cv2.THRESH_BINARY)
pixel_values = binary_img.flatten()
X = [pixel_values]
result = knnmodel.predict(X)
print(encode[result[0]])
plt.figure(figsize=(5, 5))
plt.imshow(img_rgb)
plt.show()
