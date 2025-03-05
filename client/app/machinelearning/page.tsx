import React from 'react'
import { CodeBlock } from "@/components/ui/code-block";
import Image from 'next/image';
import datasetML from "@/assets/images/datasetML.png";
import datasetMLBW from "@/assets/images/datasetMLBW.png";
import ColourfulText from "@/components/ui/colourful-text";
import Link from 'next/link';

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


export default function page() {
  return (
    <div className='w-[90%] m-auto mb-10'>
      <header className='text-center mt-10'>
        <h1 className="text-5xl font-bold text-center text-rose-400 relative z-2 font-sans drop-shadow-xl">
          Machine Learning
        </h1>
      </header>
      <div className='w-[70%] m-auto h-fit justify-between items-center flex mt-20 gap-20'>
        <div className='flex flex-col gap-5'>
          <h1 className="text-2xl font-bold relative z-2 font-sans">
            Datasets
          </h1>
          <p className='indent-3'>
            นำมาจาก
            <span className='text-lg font-semibold'><Link href='https://www.kaggle.com/datasets/reevald/geometric-shapes-mathematics' className='text-sky-500'> kaggle geometric shapes mathematics </Link></span>
            เป็น dataset เกี่ยวกับรูปทรงเรขาคณิตจำนวน 8 ชุด ได้แก่
            <span className='text-primary'> {`"Circle", "Kite", "Parallelogram", "Square", "Rectangle", "Rhombus", "Trapezoid", "Triangle"`} </span>
            แบ่งเป็น 1,500 training samples, 500 validation samples 500 test samples
            จุดประสงค์คือ <span className='text-primary'>ต้องการให้ผู้ใช้สามารถวาดภาพและให้โมเดลทายว่ามันคือรูปทรงอะไร</span>

          </p>

        </div>

        <div className='w-full h-full flex justify-center items-center'>
          <h1 className="text-8xl font-bold text-center text-white relative z-2 font-sans transform -rotate-6 drop-shadow-xl">
            <ColourfulText text="Kaggle" />
          </h1>
        </div>
      </div>

      <div className='w-[40%] m-auto h-fit flex justify-center items-center mt-[3rem] bg-bgsecondary p-5 rounded-lg border-2 drop-shadow-lg transform -rotate-6'>
        <Image src={datasetML} alt="datasetML" />
      </div>

      <div className='w-[90%] m-auto h-fit mt-20'>
        <h1 className="text-2xl font-bold relative z-2 font-sans">
          การเตรียมข้อมูล
        </h1>
        <p>
          ทำการเตรียมข้อมูลโดยการปรับภาพให้เป็น<span className='text-lg text-primary font-semibold'> สีขาวกับดำ </span>เพื่อให้ง่ายต่อการแยก
          ทำทั้งชุดสำหรับเทรนและทดสอบ
        </p>

        <div className='w-full flex justify-between items-center mt-10'>
          <CodeBlock
            language="python"
            filename="การเตรียมข้อมูล.py"
            code={coverimg}
          />
          <div className='w-[40%] m-auto h-fit flex justify-center items-center mt-[3rem] bg-bgsecondary p-5 rounded-lg border-2 drop-shadow-lg transform -rotate-6'>
            <Image src={datasetMLBW} alt="datasetMLBW" />
          </div>
        </div>


      </div>

      <div className='w-full m-auto h-fit mt-20'>
        <div className='w-[90%] m-auto h-fit'>
          <h1 className="text-2xl font-bold relative z-2 font-sans">
            Encoder
          </h1>
          <p>
            encode ชุดข้อมูลให้เป็น <span className='text-lg text-primary font-semibold'> 0 กับ 1 และปรับเป็น array 1 มิติ </span>
            ทำทั้งชุดสำหรับเทรนและทดสอบ
          </p>
        </div>

        <div className='w-full flex justify-between items-center mt-10'>
          <CodeBlock
            language="python"
            filename="Encoder_TrainData.py"
            code={encodeTrainData}
          />
          <div className='drop-shadow-lg'>
            <CodeBlock
              language="python"
              filename="Encoder_TestData.py"
              code={encodeTestData}
            />
          </div>
        </div>


      </div>

    </div>
  )
}
