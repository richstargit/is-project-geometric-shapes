

def model():
    return 1

import os
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
import cv2

train_dir = "server/dataset/train"
plt.figure(figsize=(15, 15))

image_count = 1

train_directory = 'server/dataset/train'
plt.figure(figsize=(15, 15))

image_count = 1

for subfolder in os.listdir(train_directory):
    shapes_directory = os.path.join(train_directory, subfolder)


    for image_name in os.listdir(shapes_directory):
        image_path = os.path.join(shapes_directory, image_name)
        img = cv2.imread(image_path)

        gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        _, binary_img = cv2.threshold(gray_img, 200, 255, cv2.THRESH_BINARY)
        cv2.imwrite(image_path, binary_img)

X = []
Y = []