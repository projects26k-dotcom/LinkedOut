import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn('\n⚠️ [MongoDB Warning]: MONGODB_URI is not defined in your environment variables.');
    console.warn('⚠️ Please add your MongoDB Atlas connection string to .env.local to save user data.\n');
    return;
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`✅ [MongoDB Connected]: ${conn.connection.host} (Database: ${conn.connection.name})`);
  } catch (error) {
    console.error(`❌ [MongoDB Connection Error]: ${error.message}`);
  }
};
