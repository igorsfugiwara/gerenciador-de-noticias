import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/news-db');
        console.log('🟢 MongoDB conectado');
    } catch (error) {
        console.error('🔴 Erro ao conectar no MongoDB:', error);
    }
};
