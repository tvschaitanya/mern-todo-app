// Add this to utils/connect.js or create a new file
import mongoose from 'mongoose';

const connection = { isConnected: null };

export const connectToDatabase = async () => {
  try {
    if (connection.isConnected) {
      console.log('✅ Already connected to MongoDB');
      return;
    }
    
    console.log('🔄 Connecting to MongoDB...');
    const db = await mongoose.connect(process.env.MONGO_URI || 'mongodb://mongodb:27017/todo-app');
    connection.isConnected = db.connections[0].readyState;
    
    // Check if this is a new database or existing one
    const collections = await mongoose.connection.db.listCollections().toArray();
    if (collections.length === 0) {
      console.log('🆕 New database created and connected at: mongodb://mongodb:27017/todo-app');
    } else {
      console.log('✅ Connected to existing database at: mongodb://mongodb:27017/todo-app');
    }
    
  } catch (error) {
    console.log("❌ [ERROR] Couldn't connect to DB: ", error);
    throw new Error('Database connection failed: ' + error.message);
  }
};