import mongoose from 'mongoose';
import {initializeData } from '../configs/init.data.js'; // Ajusta la ruta según tu estructura

export const connect = async () => {
    try {
        console.log("MongoDB:");
        
        mongoose.connection.on('error', () => {
            console.log('-> Could not connect to MongoDB');
        });

        mongoose.connection.on('connecting', () => {
            console.log('-> Connecting to MongoDB services.');
        });

        mongoose.connection.on('connected', () => {
            console.log('-> Successfully connected to MongoDB.');
        });

        mongoose.connection.once('open', async () => {
            console.log(`-> Successfully connected to database: ${process.env.DB_NAME}.`);
            await initializeData();
        });

        mongoose.connection.on('reconnected', () => {
            console.log('-> Successfully reconnected to MongoDB.');
        });

        mongoose.connection.on('disconnected', () => {
            console.log('-> Disconnected from MongoDB services.');
        });

        await mongoose.connect(
            `${process.env.DB_SERVICE}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
            {
                maxPoolSize: 50,
                serverSelectionTimeoutMS: 5000 
            }
        );

    } catch (err) {
        console.error('MongoDB \n-> General error while trying to connect to the database', err);
    }
};
