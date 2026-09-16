import mongoose from "mongoose";

const razaSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true,
        unique: true
    },

    descripcion: {
        type: String,
        required: true
    }
});

const Raza = mongoose.model("Raza", razaSchema);

export default Raza;