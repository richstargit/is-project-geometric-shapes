"use client";
import { CodeBlock } from "@/components/ui/code-block";
import { LinkPreview } from "@/components/ui/link-preview";
import AOS from "aos";
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import Image from 'next/image';
import datasetCNN from "@/assets/images/datasetCNN.jpeg"
import layerModelCNN from "@/assets/images/layerModelCNN.png"

const MappingTranslateAnimal = `translate = {"cane": "dog", "cavallo": "horse", "elefante": "elephant", "farfalla": "butterfly",
"gallina": "chicken", "gatto": "cat", "mucca": "cow", "pecora": "sheep", "scoiattolo": "squirrel",
"dog": "cane", "cavallo": "horse","elephant" : "elefante", "butterfly": "farfalla", "chicken": "gallina", "cat": "gatto",
"cow": "mucca", "ragno": "spider", "squirrel": "scoiattolo"}

for img_class in os.listdir("/kaggle/input/animals10/raw-img/"):
    print(translate[img_class])
`;

const outputTranslateAnimal = `horse
sheep
elephant
cat
squirrel
chicken
spider
cow
dog
butterfly`;

const step1 = `from tensorflow.keras.preprocessing.image import ImageDataGenerator

data_generator = ImageDataGenerator(
    rescale=1./255,
    validation_split=0.2
)
train_data = data_generator.flow_from_directory(
    '/kaggle/input/animals10/raw-img/',
    target_size=(128, 128),
    class_mode='categorical',
    batch_size=64,
    subset='training',
    shuffle=True
)

# โหลดข้อมูล validation
valid_data = data_generator.flow_from_directory(
    '/kaggle/input/animals10/raw-img/',
    target_size=(128, 128),
    class_mode='categorical',
    batch_size=64,
    subset='validation',
    shuffle=True
)
`;

const layerModel = `import tensorflow as tf
from tensorflow.keras import layers, models
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense

model = models.Sequential()

model.add(layers.Conv2D(32, (3, 3), activation='relu', input_shape=(128, 128, 3)))
model.add(layers.MaxPooling2D((2, 2)))

model.add(layers.Conv2D(64, (3, 3), activation='relu'))
model.add(layers.MaxPooling2D((2, 2)))

model.add(layers.Conv2D(128, (3, 3), activation='relu'))
model.add(layers.MaxPooling2D((2, 2)))

model.add(layers.Flatten())
model.add(layers.Dense(512, activation='relu'))

model.add(layers.Dense(10, activation='softmax'))  # 10 คลาส`;

const ModelOptimizer = `model.compile(loss='categorical_crossentropy',
              optimizer='adam',
              metrics=['accuracy'])

model.fit(
    train_data, 
    epochs=10, 
    validation_data=valid_data,
    steps_per_epoch=100,
    validation_steps=20
)
`

export default function Page() {

    useEffect(() => {
        AOS.init();
      }, []);

    return (
        <div className='w-[90%] m-auto mb-10'>
            <header className='text-center mt-10'>
                <h1 className="text-5xl font-bold text-center text-rose-400 relative z-2 font-sans drop-shadow-xl" data-aos="fade-down">
                    Neural NetWork
                </h1>
            </header>
            <div className='w-[70%] m-auto h-fit justify-between items-center lg:flex mt-20 gap-20'>
                <div className='flex flex-col gap-5'>
                    <h1 className="text-2xl font-bold relative z-2 font-sans">
                        Datasets
                    </h1>
                    <span className='indent-3'>
                        นำมาจาก
                        <span className='text-lg font-semibold mx-2'>
                            <LinkPreview url="https://www.kaggle.com/datasets/alessiocorrado99/animals10" className="font-bold text-sky-500">
                                kaggle Animals-10
                            </LinkPreview>
                        </span>

                        เป็น Dataset เกี่ยวกับภาพหน้าของสัตว์ 10 categories คือ
                        <span className='text-primary'> {`"Dog", "Cat", "Horse", "Spider", "butterfly", "Chicken", "Sheep", "Cow", "Squirrel", "elephant"`} </span>
                        จุดประสงค์ คือ<span className='text-primary'> ต้องการให้ผู้ใช้ส่งภาพสัตว์และให้โมเดลทำนายว่ามันคือภาพสัตว์ชนิดอะไร </span>

                    </span>

                </div>

                <div data-aos="fade-left" data-aos-duration="1500">
                    <div className='w-full m-auto h-fit flex flex-col gap-2 justify-center items-center bg-bgsecondary pt-2 pb-5 px-5 rounded-lg border-2 drop-shadow-lg lg:transform lg:-rotate-6 mt-10 lg:mt-0'>
                        <h1 className="text-xs">
                            Example Dataset
                        </h1>
                        <Image src={datasetCNN} alt="datasetML" width={1000} height={1000} />
                    </div>
                </div>
            </div>


            <div className='w-[90%] m-auto h-fit mt-20'>
                <h1 className="text-2xl font-bold relative z-2 font-sans">
                    Mapping Cover Language Italian to English
                </h1>
                <p className="mt-5">
                    เนื่องจากโฟลเดอร์ของไฟล์นี้เป็นภาษาอื่นซึ่งเป็นภาษา <span className="text-primary"> Italian </span> จึงต้องทำการแปลภาษาเป็นภาษา <span className="text-primary"> อังกฤษ </span> ก่อน โดยใช้ Dictionary ในการแปลภาษา
                </p>

                <div className='w-full lg:flex justify-evenly items-center mt-10'>

                    <div data-aos="fade-right" className="lg:w-[80%] h-fit">
                        <CodeBlock
                            language="python"
                            filename="MappingTranslate.py"
                            code={MappingTranslateAnimal}
                        />
                    </div>

                    <div data-aos="fade-left" className="h-fit xl:w-[15%] lg:mt-0 mt-10">
                        <CodeBlock
                            language="python"
                            filename="OutputMapping.py"
                            code={outputTranslateAnimal}
                        />
                    </div>
                </div>
            </div>

            <div className='w-[90%] m-auto h-fit mt-20'>
                <h1 className="text-2xl font-bold relative z-2 font-sans">
                    Normalize Data, Resize Images, and Split Data for Training and Testing
                </h1>
                <p className="mt-5">
                    ทำการ normalize data และปรับภาพให้มีขนาดเท่ากัน <span className="text-primary"> 128*128 </span> และแบ่งข้อมูลสำหรับ train และ test <span className="text-primary"> 80:20 </span>
                </p>

                <div className='w-full flex justify-evenly items-center mt-10'>

                    <div data-aos="fade-down" className="w-full">
                        <CodeBlock
                            language="python"
                            filename="Normalize Data, Resize Images, and Split Data for Training and Testing.py"
                            code={step1}
                        />
                    </div>

                </div>
            </div>

            <div className='w-[90%] m-auto h-fit mt-20'>
                <h1 className="text-2xl font-bold relative z-2 font-sans">
                    Layer Model
                </h1>
                <p className="mt-5">
                    ทำการใส่ layer ให้กับ model input <span className="text-primary"> 128*128*3 </span> output มี <span className="text-primary"> 10 </span> คลาส 
                </p>

                <div className='w-full 2xl:flex justify-between items-center mt-10'>

                    <div data-aos="fade-rigt" className="w-full">
                        <CodeBlock
                            language="python"
                            filename="Layer Model"
                            code={layerModel}
                        />
                    </div>

                    <div data-aos="fade-left" data-aos-duration="1500" className="2xl:mt-0 mt-10">
                    <div className='lg:w-[70%] 2xl:w-full m-auto h-fit flex justify-center items-center bg-bgsecondary p-5 rounded-lg border-2 drop-shadow-lg 2xl:transform 2xl:-rotate-6 mt-10 xl:mt-0'>
                        <Image src={layerModelCNN} alt="datasetML" className="w-full"/>
                    </div>
                </div>

                </div>
            </div>

            <div className='w-[90%] m-auto h-fit mt-20'>
                <h1 className="text-2xl font-bold relative z-2 font-sans">
                    Model Optimizer
                </h1>
                <p className="mt-5">
                เทรน model optimizer ด้วย <span className="text-primary"> adam </span> เทรนจำนวน <span className="text-primary"> 10 </span> epochs
                </p>

                <div className='w-full flex justify-evenly items-center mt-10'>

                    <div data-aos="fade-down" className="w-full">
                        <CodeBlock
                            language="python"
                            filename="Model Optimizer.py"
                            code={ModelOptimizer}
                        />
                    </div>

                </div>
            </div>


        </div>
    )
}
