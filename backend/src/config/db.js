import mongoose from 'mongoose';
import dns from 'dns';

// Fix Node.js DNS SRV resolution on Windows for MongoDB Atlas
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (err) {
  // Fallback if DNS server override is prohibited by system policy
}

export const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio_db';


  try {
    const conn = await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 10000 });
    console.log(`✅ [Database] MongoDB Atlas Connected Successfully: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`[Database Warning] MongoDB Atlas Connection Skipped (${error.message}). Starting MongoMemoryServer...`);
    try {
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      const uri = mongoServer.getUri();
      const conn = await mongoose.connect(uri);
      console.log(`[Database] In-Memory MongoDB Instance Started & Connected: ${conn.connection.host}`);
      return true;
    } catch (memError) {
      console.warn(`[Database Warning] In-Memory MongoDB Fallback: Using pure JavaScript memory repository.`);
      return false;
    }
  }
};
