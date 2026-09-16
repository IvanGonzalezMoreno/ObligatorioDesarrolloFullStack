import mongoose from "mongoose";

const animalSchema = new mongoose.Schema ({

    caravana: {
        type: String,
        required: true,
        unique: true
    },

    raza: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Raza",
        required: true
    },

    peso: {
        type: Number,
        required: true
    },
    
    establecimiento: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Establecimiento",
        required: true
    },
});

const Animal = mongoose.model("Animal", animalSchema);

export default Animal;