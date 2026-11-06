import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "node:dns";

dotenv.config();

dns.setServers(["1.1.1.1", "8.8.8.8"]);

let cached = global._mongoose;
if (!cached) cached = global._mongoose = { conn: null, promise: null };

export async function conectarBaseDeDatos() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(process.env.MONGO_URI, {
            bufferCommands: false,
            serverSelectionTimeoutMS: 5000,
        });
    }

    try {
        cached.conn = await cached.promise;
        console.log("Base de datos conectada");
    } catch (error) {
        cached.promise = null;
        console.error("Error al conectar con la base de datos:", error);
        throw error;
    }

    return cached.conn;
}