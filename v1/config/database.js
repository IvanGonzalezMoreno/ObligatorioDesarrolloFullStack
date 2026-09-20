import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "node:dns";

dotenv.config();

dns.setServers(["1.1.1.1", "8.8.8.8"]);

export async function conectarBaseDeDatos() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("Base de datos conectada");
    } catch (error) {
        console.error("Error al conectar con la base de datos:", error);
    }
}