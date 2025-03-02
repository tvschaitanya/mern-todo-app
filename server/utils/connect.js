import mongoose from 'mongoose';

const connection = { isConnected: null };

export const connectToDatabase = async () => {
    try {
        if (connection.isConnected) {
            return;
        }
        const db = await mongoose.connect(process.env.MONGO_URI);
        connection.isConnected = db.connections[0].readyState;
        console.log('Connected to database');
    } catch (error) {
        console.log("[ERROR] Couldn't connect to DB: ", error);
        throw createError(500, 'Database connection failed.');
    }
};