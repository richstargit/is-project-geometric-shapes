"use server"
import axios from 'axios';

export const predictNeuralNetWorkModel = async (Base64: string) => {
    try{

        const response = await axios.post('http://localhost:8000/predict/CNN', {
            image: Base64
        });

        if (!response) {
            throw new Error('Error');
        }

        return response.data;
    }catch(error){
        console.log(error);
    }
};

export const predictMLModel = async (Base64: string) => {
    try{

        const response = await axios.post('http://localhost:8000/predict/KNN', {
            image: Base64
        });

        if (!response) {
            throw new Error('Error');
        }

        return response.data;
    }catch(error){
        console.log(error);
    }
}