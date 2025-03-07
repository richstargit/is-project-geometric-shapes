"use client"
import { CodeBlock } from "@/components/ui/code-block";
import Image from 'next/image';
import datasetML from "@/assets/images/datasetML.png";
import datasetMLBW from "@/assets/images/datasetMLBW.png";
import ColourfulText from "@/components/ui/colourful-text";
import { LinkPreview } from "@/components/ui/link-preview";
import ScoreKNN from "@/assets/images/ScoreKNN.png";
import ScoreLR from "@/assets/images/ScoreLR.png";
import AOS from "aos";
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const coverimg = `import os
import cv2
import numpy as np
import matplotlib.pyplot as plt

train_directory = path+'/dataset/train'
plt.figure(figsize=(15, 15))

for subfolder in os.listdir(train_directory):
  shapes_directory = os.path.join(train_directory, subfolder)

  for image_name in os.listdir(shapes_directory):
    image_path = os.path.join(shapes_directory, image_name)
    img = cv2.imread(image_path)
    gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    _, binary_img = cv2.threshold(gray_img, 200, 255, cv2.THRESH_BINARY)
    cv2.imwrite(image_path, binary_img)
`;

const encodeTrainData = `train_directory = path+'/dataset/train'
X=[]
Y=[]

for subfolder in os.listdir(train_directory):
  shapes_directory = os.path.join(train_directory, subfolder)
  for image_name in os.listdir(shapes_directory):
    image_path = os.path.join(shapes_directory, image_name)
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    pixel_values = img.flatten()
    X.append(pixel_values)
    Y.append(subfolder)

X=np.array(X)
X[X == 0] = 1
X[X > 200] = 0
X[X != 0] = 1
`;


const encodeTestData = `test_directory = path+'/dataset/test'
X_test=[]
Y_test=[]

for subfolder in os.listdir(test_directory):
  shapes_directory = os.path.join(test_directory, subfolder)

  for image_name in os.listdir(shapes_directory):
    image_path = os.path.join(shapes_directory, image_name)
    img = cv2.imread(image_path)

    gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    _, binary_img = cv2.threshold(gray_img, 200, 255, cv2.THRESH_BINARY)
    pixel_values = binary_img.flatten()
    X_test.append(pixel_values)
    Y_test.append(subfolder)

X_test=np.array(X_test)
X_test[X_test == 0] = 1
X_test[X_test > 200] = 0
X_test[X_test != 0] = 1
`;

const encodeLabel = `mapping = {'rectangle': 0, 'parallelogram': 1, 'trapezoid': 2, 'square': 3,'circle': 4, 'kite': 5, 'triangle': 6, 'rhombus': 7}
Y = [mapping.get(x, -1) for x in Y]
Y_test = [mapping.get(x, -1) for x in Y_test]
`;

const KnnModel = `from sklearn.neighbors import KNeighborsClassifier
knn_model = KNeighborsClassifier(n_neighbors=5);
knn_model.fit(X,Y)
y_pred_knn = knn_model.predict(X_test)
conf_matrix_knn = confusion_matrix(Y_test, y_pred_knn)
accuracy_knn = accuracy_score(Y_test, y_pred_knn)
precision_knn = precision_score(Y_test, y_pred_knn, average="macro")
recall_knn = recall_score(Y_test, y_pred_knn, average="macro")
f1_knn = f1_score(Y_test, y_pred_knn, average="macro")`;

const LRModel = `from sklearn.linear_model import LogisticRegression
model = LogisticRegression(max_iter=10000)
model.fit(X, Y)
y_pred_LR = model.predict(X_test)
conf_matrix_LR = confusion_matrix(Y_test, y_pred_LR)
accuracy_LR = accuracy_score(Y_test, y_pred_LR)
precision_LR = precision_score(Y_test, y_pred_LR, average="macro")
recall_LR = recall_score(Y_test, y_pred_LR, average="macro")
f1_LR = f1_score(Y_test, y_pred_LR, average="macro")`

export default function Page() {

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className='w-[90%] m-auto mb-10'>
      <header className='text-center mt-10'>
        <h1 className="text-5xl font-bold text-center text-rose-400 relative z-2 font-sans drop-shadow-xl" data-aos="fade-down">
          Machine Learning
        </h1>
      </header>
      <div className='w-[70%] m-auto h-fit justify-between items-center flex mt-20 gap-20'>
        <div className='flex flex-col gap-5'>
          <h1 className="text-2xl font-bold relative z-2 font-sans">
            Datasets
          </h1>
          <span className='indent-3'>
            นำมาจาก
            <span className='text-lg font-semibold mx-2'>
              <LinkPreview url="https://www.kaggle.com/datasets/reevald/geometric-shapes-mathematics" className="font-bold text-sky-500">
                kaggle geometric shapes mathematics
              </LinkPreview>
            </span>

            เป็น dataset เกี่ยวกับรูปทรงเรขาคณิตจำนวน 8 ชุด ได้แก่
            <span className='text-primary'> {`"Circle", "Kite", "Parallelogram", "Square", "Rectangle", "Rhombus", "Trapezoid", "Triangle"`} </span>
            แบ่งเป็น 1,500 training samples, 500 validation samples 500 test samples
            จุดประสงค์คือ <span className='text-primary'>ต้องการให้ผู้ใช้สามารถวาดภาพและให้โมเดลทายว่ามันคือรูปทรงอะไร</span>

          </span>

        </div>

        <div className='w-full h-full justify-center items-center 2xl:flex hidden'>
          <h1 className="text-7xl font-bold text-center text-white relative z-2 font-sans transform -rotate-6 drop-shadow-xl">
            <ColourfulText text="Kaggle" />
          </h1>
        </div>
      </div>

      <div data-aos="fade-right" data-aos-duration="1500">
        <div className='w-[70%] xl:w-[40%] m-auto h-fit flex justify-center items-center mt-[3rem] bg-bgsecondary p-5 rounded-lg border-2 drop-shadow-lg transform -rotate-6'>
          <Image src={datasetML} alt="datasetML" />
        </div>
      </div>

      <div className='w-[90%] m-auto h-fit mt-20'>
        <h1 className="text-2xl font-bold relative z-2 font-sans">
          การเตรียมข้อมูล
        </h1>
        <p>
          ทำการเตรียมข้อมูลโดยการปรับภาพให้เป็น<span className='text-lg text-primary font-semibold'> สีขาวกับดำ </span>เพื่อให้ง่ายต่อการแยก
          ทำทั้งชุดสำหรับเทรนและทดสอบ
        </p>

        <div className='w-full xl:flex justify-between items-center mt-10'>
          <div data-aos="fade-right" className="w-full h-fit">
            <CodeBlock
              language="python"
              filename="การเตรียมข้อมูล.py"
              code={coverimg}
            />
          </div>

          <span data-aos="fade-left" data-aos-duration="1500">
            <div className='w-[70%] xl:w-[90%] m-auto h-fit flex justify-center items-center mt-[3rem] bg-bgsecondary p-5 rounded-lg border-2 drop-shadow-lg xl:transform xl:-rotate-6'
            >
              <Image src={datasetMLBW} alt="datasetMLBW" />
            </div>
          </span>
        </div>


      </div>

      <div className='w-full m-auto h-fit mt-20'>
        <div className='w-[90%] m-auto h-fit'>
            <h1 className="text-2xl font-bold relative z-2 font-sans">
            Encode and Split Data for Training and Testing
            </h1>
          <p>
            encode ชุดข้อมูลให้เป็น <span className='text-lg text-primary font-semibold'> 0 กับ 1 และปรับเป็น array 1 มิติ </span>
            และทำการ <span className='text-lg text-primary font-semibold'> encode label </span>ทำทั้งชุดสำหรับเทรนและทดสอบ

          </p>
        </div>

        <div className='w-full xl:flex justify-between items-start mt-10 xl:relative'>
          <div className='flex flex-col gap-7'>
            <div data-aos="fade-right">
              <CodeBlock
                language="python"
                filename="Encoder_TrainData.py"
                code={encodeTrainData}
              />
            </div>
            <div data-aos="fade-up-right">
              <span className='drop-shadow-lg'>
                <CodeBlock
                  language="python"
                  filename="encodeLabel.py"
                  code={encodeLabel}
                />
              </span>
            </div>
          </div>
          <div data-aos="fade-left" data-aos-duration="1500">
            <div className='drop-shadow-lg xl:absolute xl:-top-10 xl:-right-6 xl:transform xl:-rotate-2 mt-10 xl:mt-0'>
              <CodeBlock
                language="python"
                filename="Encoder_TestData.py"
                code={encodeTestData}
              />
            </div>
          </div>
        </div>


      </div>


      <div className='w-full mt-20 h-fit'>
        <h1 className="text-3xl font-bold text-center relative z-2 font-sans drop-shadow-xl">
          KNN (K Nearest Neighbors)
        </h1>
        <p className='text-center mt-5'>
          โมเดลแรกที่เลือกใช้คือ <span className='text-lg text-primary font-semibold'>KNN n_neighbors = 5 </span>
          การทำงาน โมเดลจะทำการเลือกจุดที่อยู่ใกล้ที่สุดจำนวน 5 จุด และเลือกผลลัพธ์ที่เหมือนกันมากที่สุดมาสรุปผล
        </p>


        <div className='w-full xl:flex justify-between items-center mt-10'>
          <div className='lg:w-[50%] xl:w-[40%] m-auto h-fit flex justify-center items-center mt-[3rem] bg-bgsecondary p-5 rounded-lg border-2 drop-shadow-lg xl:transform xl:-rotate-6 z-50'>
            <Image src={ScoreKNN} alt="ScoreKNN" className="w-full"/>
          </div>

          <div data-aos="fade-left" className="w-full mt-10 xl:mt-0">
            <CodeBlock
              language="python"
              filename="KNN_MODEL.py"
              code={KnnModel}
            />
          </div>
        </div>

      </div>

      <div className='w-full mt-20 h-fit'>
        <h1 className="text-3xl font-bold text-center relative z-2 font-sans drop-shadow-xl">
          LR (LogisticRegression)
        </h1>
        <p className='text-center mt-5'>
          โมเดลที่สอง คือ <span className='text-lg text-primary font-semibold'> LogisticRegression max_iter = 10000 </span>
          เลือกใช้โมเดลนี้เพราะมีขนาดเล็กและทำงานได้ไวมีผลลัพธืที่ค่อนข้างสูง
          การทำงานจำแนกประเภท (Classification) โดยใช้ฟังก์ชัน Sigmoid ในการแปลงค่าของข้อมูลอินพุตให้เป็นค่าความน่าจะเป็น และตัดสินใจผลลัพธ์
        </p>


        <div className='w-full xl:flex justify-between items-center mt-10'>
          <div data-aos="fade-right" className="w-full">
            <CodeBlock
              language="python"
              filename="LR_MODEL.py"
              code={LRModel}
            />
          </div>
          <div className='lg:w-[50%] xl:w-[40%] m-auto h-fit flex justify-center items-center mt-[3rem] bg-bgsecondary p-5 rounded-lg border-2 drop-shadow-lg xl:transform xl:-rotate-6 z-50'>
            <Image src={ScoreLR} alt="ScoreLR" className="w-full"/>
          </div>
        </div>

      </div>

    </div>
  )
}
