import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string || "mongodb+srv://insourcextech:n8SpYofyDEtQT4BQ@cluster0.fblcm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" );
    
    console.log(`MongoDB Connected success: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error('Unknown error occurred');
    }
    process.exit(1);
  }
};

export default connectDB;