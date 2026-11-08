import Usuario from "../models/usuario.model.js";
import jwt from "jsonwebtoken";

export async function cambiarPlan(id) {
    const usuario = await Usuario.findById(id);

    if (!usuario) {
        return null;
    }

    if (usuario.plan === "premium") {
        return false;
    }

    usuario.plan = "premium";

    await usuario.save();

    const token = jwt.sign(
        {
            id: usuario._id,
            username: usuario.username,
            rol: usuario.rol,
            plan: usuario.plan
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h"
        }
    );

    return {
        usuario,
        token
    };
}