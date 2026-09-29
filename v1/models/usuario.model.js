import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema ({

    username: {
        type: String,
        required: true,
        unique: true
    },

    password:{
        type: String,
        required: true
    },

    plan:{
        type: String,
        enum: ["plus", "premium"],
        default: "plus"
    },

    rol:{
        type: String,
        enum: ["usuario", "admin"],
        default: "usuario"
    }
});

usuarioSchema.set("toJSON", {
    transform: (doc, ret) => {
        delete ret.password;
        return ret;
    }
});

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;