"use server"
import axios from 'axios';

export const predictCNNModel = async (Base64: string) => {
    try{

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_END_POINT}/predict/CNN`, {
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

export const predictKNNModel = async (Base64: string) => {
    try{

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_END_POINT}/predict/KNN`, {
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

export const predictLRModel = async (Base64: string) => {
    try{

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_END_POINT}/predict/LR`, {
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