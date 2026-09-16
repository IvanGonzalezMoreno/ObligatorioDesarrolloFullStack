import mongoose from "mongoose";

const establecimientoSchema = new mongoose.Schema ({

    nombre:{
        type: String,
        required: true
    },

    departamento: {
        type: String,
        required: true
    },

    superficie: {
        type: Number,
        required: true
    },

    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    }
});

const Establecimiento = mongoose.model("Establecimiento", establecimientoSchema);

export default Establecimiento;