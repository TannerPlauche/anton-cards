// import { connect } from 'mongoose';
// const DATABASE_URL = 'mongodb+srv://admin:admin@speech-cards.dqoblbd.mongodb.net/speech-boards?retryWrites=true&w=majority&appName=speech-cards';

// if (!DATABASE_URL) {
//     throw new Error("Please define the DATABASE_URL environment variable inside .env.local");
// }

// let cached = { conn: null, promise: null };


// async function connectDB() {
//     console.log('DATABASE_URL: ', DATABASE_URL);

//     if (cached.conn) {
//         return cached.conn;
//     }

//     if (!cached.promise) {
//         const opts = {
//             bufferCommands: false,
//         };

//         console.log('DATABASE_URL: ', DATABASE_URL);
//         // @ts-ignore
//         cached.promise = connect(DATABASE_URL, opts).then((mongoose) => {
//             console.log('connected to MongoDB via Mongoose');
//             return mongoose;
//         });
//     }
//     cached.conn = await cached.promise;
//     return cached.conn;
// }

// export default connectDB;

import mongoose from 'mongoose';
const DATABASE_URL = 'mongodb+srv://admin:admin@speech-cards.dqoblbd.mongodb.net/speech-boards?retryWrites=true&w=majority&appName=speech-cards';
/* 
  0 - disconnected
  1 - connected
  2 - connecting
  3 - disconnecting
  4 - uninitialized
*/
const mongoConnection = {
    isConnected: 0,
};

export const connectDB = async () => {
    console.log('MONGO_URL', DATABASE_URL);
    if (mongoConnection.isConnected === 1) {
        console.log('ya estabamos conectados');
        return;
    }

    if (mongoose.connections.length > 0) {
        mongoConnection.isConnected = mongoose.connections[0].readyState;
        if (mongoConnection.isConnected === 1) {
            console.log('usando conexion existente');
            return;
        }

        await mongoose.disconnect();
    }
    await mongoose.connect(DATABASE_URL);
    mongoConnection.isConnected = 1;
    console.log('conectado a mongodb', DATABASE_URL ?? '');
};

export const dbDisconnect = async () => {
    // if (process.env.NODE_ENV === 'development') return;
    if (mongoConnection.isConnected === 0) return;

    await mongoose.disconnect();
    mongoConnection.isConnected = 0;
    console.log('desconectado de mongodb');
};