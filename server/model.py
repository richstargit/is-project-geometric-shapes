import os as os
import matplotlib.pyplot as plt
import cv2 as cv2
import numpy as np
from sklearn.preprocessing import LabelEncoder
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import confusion_matrix, accuracy_score, precision_score, recall_score, f1_score
from tensorflow.keras.models import load_model # type: ignore

# โหลดโมเดลที่บันทึกไว้
CNNmodel = load_model("./models/geometric_shapes_cnn.h5")  # หรือ .keras ก็ได้

def modelCNN(image):

    # แสดงโครงสร้างของโมเดล
    #CNNmodel.summary()

    # โหลดภาพที่ต้องการทำนาย
    # image_path = "server/dataset/mytest/mytest4.jpg"  # เปลี่ยนเป็น path จริงของคุณ
    img = image
    img = cv2.resize(img, (224, 224))  # ปรับขนาดให้ตรงกับที่ใช้เทรน
    img = img / 255.0  # ปรับให้เป็นค่า [0,1]
    img = np.expand_dims(img, axis=0)  # เพิ่มมิติให้เป็น (1, 224, 224, 3)

    # ทำนายผลลัพธ์
    predictions = CNNmodel.predict(img)
    predicted_class = np.argmax(predictions, axis=1)[0]  # ได้ค่าที่โมเดลคิดว่าถูกต้องที่สุด
    classname = ['circle', 'kite', 'parallelogram', 'rectangle', 'rhombus', 'square', 'trapezoid', 'triangle']
    # print(classname[predicted_class])

    # แสดงภาพ
    # plt.imshow(cv2.imread(image_path)[:, :, ::-1])  # แปลงจาก BGR -> RGB
    # plt.axis("off")
    # plt.show()

    return classname[predicted_class]


def modelKNN():
    train_directory = 'server/dataset/train'

    X_train = []
    Y_train = []
    for subfolder in os.listdir(train_directory):
        shapes_directory = os.path.join(train_directory, subfolder)


        for image_name in os.listdir(shapes_directory):
            image_path = os.path.join(shapes_directory, image_name)
            img = cv2.imread(image_path)
            gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            _, binary_img = cv2.threshold(gray_img, 200, 255, cv2.THRESH_BINARY)
            pixel_values = binary_img.flatten()
            X_train.append(pixel_values)
            Y_train.append(subfolder)

    train_directory2 = 'server/dataset/val'

    for subfolder in os.listdir(train_directory2):
        shapes_directory = os.path.join(train_directory2, subfolder)


        for image_name in os.listdir(shapes_directory):
            image_path = os.path.join(shapes_directory, image_name)
            img = cv2.imread(image_path)

            gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            _, binary_img = cv2.threshold(gray_img, 200, 255, cv2.THRESH_BINARY)
            pixel_values = binary_img.flatten()
            X_train.append(pixel_values)
            Y_train.append(subfolder)

    X_train=np.array(X_train)

    # test_directory = 'server/dataset/test'

    # X_test = []
    # Y_test = []
    # for subfolder in os.listdir(test_directory):
    #     shapes_directory = os.path.join(test_directory, subfolder)


    #     for image_name in os.listdir(shapes_directory):
    #         image_path = os.path.join(shapes_directory, image_name)
    #         img = cv2.imread(image_path)

    #         gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    #         _, binary_img = cv2.threshold(gray_img, 200, 255, cv2.THRESH_BINARY)
    #         pixel_values = binary_img.flatten()
    #         X_test.append(pixel_values)
    #         Y_test.append(subfolder)

    # X_test=np.array(X_test)

    label_encoder = LabelEncoder()
    Y_train = label_encoder.fit_transform(Y_train)
    # Y_test=label_encoder.fit_transform(Y_test)

    encodedata={}

    for label, encoded_value in zip(label_encoder.classes_, range(len(label_encoder.classes_))):
        encodedata[encoded_value]=label

    knn_model = KNeighborsClassifier(n_neighbors=10)
    knn_model.fit(X_train,Y_train)
    #y_pred_knn = knn_model.predict(X_test)

    # conf_matrix_knn = confusion_matrix(Y_test, y_pred_knn)
    # accuracy_knn = accuracy_score(Y_test, y_pred_knn)
    # precision_knn = precision_score(Y_test, y_pred_knn, average="macro")
    # recall_knn = recall_score(Y_test, y_pred_knn, average="macro")
    # f1_knn = f1_score(Y_test, y_pred_knn, average="macro")

    # print("Confusion Matrix (KNeighborsClassifier):\n", conf_matrix_knn)
    # print("Accuracy (KNeighborsClassifier):", accuracy_knn)
    # print("Precision (KNeighborsClassifier):", precision_knn)
    # print("Recall (KNeighborsClassifier):", recall_knn)
    # print("F1-Score (KNeighborsClassifier):", f1_knn)
    return knn_model,encodedata


