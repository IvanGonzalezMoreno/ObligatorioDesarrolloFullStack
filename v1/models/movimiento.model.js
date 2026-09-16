import mongoose from "mongoose";

const movimientoSchema = new mongoose.Schema ({

    animal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Animal",
        required: true
    },

    establecimientoOrigen:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Establecimiento",
        required: true
    },

    establecimientoDestino:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Establecimiento",
        required: true
    },

    fecha:{
        type: Date,
        required: true
    }
});

const Movimiento = mongoose.model("Movimiento", movimientoSchema);

export default Movimiento;