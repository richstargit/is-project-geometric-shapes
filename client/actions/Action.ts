"use server"
import axios from 'axios';

export const sendImageToNeuralNetWorkModel = async (Base64: string) => {
    try{

        const response = await axios.post('http://localhost:8000/items', {
            itemname: Base64
        });

        if (!response) {
            throw new Error('Error');
        }

        return response.data;
    }catch(error){
        console.log(error);
    }
};