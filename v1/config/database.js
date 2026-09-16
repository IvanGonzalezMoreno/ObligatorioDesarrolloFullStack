import mongoose from "mongoose";

export async function conectarBaseDeDatos() {
    try {
        await mongoose.connect("mongodb://localhost:27017/ganaderia");

        console.log("Base de datos conectada");
    } catch (error) {
        console.error("Error al conectar con la base de datos:", error);
    }
}