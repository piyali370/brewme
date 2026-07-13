
// import mongoose from "mongoose";

// const connectDb = async () => {
//         try {
//             const conn = await mongoose.connect(`mongodb://localhost:27017`, {
//                 useNewUrlParser: true,
//             });
//             console.log(`MongoDB Connected: ${conn.connection.host}`);
//             return conn;
            
//         } catch (error) {
//             console.error(error.message);
//             process.exit(1);
//         }
//     }

//   export default connectDb;

// FOR VERCEL
import mongoose from "mongoose";

const connectDb = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return;
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDb;


// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI;

// if (!MONGODB_URI) {
//   throw new Error("Please define MONGODB_URI in your environment variables");
// }

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// const connectDb = async () => {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     cached.promise = mongoose.connect(MONGODB_URI, {
//       dbName: "brewme",
//     });
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// };

// export default connectDb;
