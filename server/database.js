
// const mongoose = require("mongoose");

// module.exports = async function databaseConnection() {
//   try {
//     const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/bookstore";
//     await mongoose.connect(uri);
//     console.log("✅ MongoDB connected");
//   } catch (err) {
//     console.error("❌ MongoDB connection error:", err);
//     process.exit(1);
//   }
// };
const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const defaultLocalURI = 'mongodb://127.0.0.1:27017/bookcrud';
const uri = process.env.MONGODB_URI || defaultLocalURI;

console.log('🔍 Mongo connection source:', process.env.MONGODB_URI ? 'remote Atlas' : 'local fallback');
if (process.env.MONGODB_URI) {
  console.log('🔑 MONGODB_URI present (prefix):', process.env.MONGODB_URI.slice(0, 40) + '...'); // don't log full secret in prod
} else {
  console.log('⚠️  No MONGODB_URI env var, using local URI:', defaultLocalURI);
}

async function databaseConnection() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const target = uri === defaultLocalURI ? 'local MongoDB' : 'remote MongoDB';
    console.log(`✅ MongoDB connected to ${target}`);
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
  }
}

module.exports = databaseConnection;

