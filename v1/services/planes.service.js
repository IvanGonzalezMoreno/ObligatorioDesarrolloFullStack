import Usuario from "../models/usuario.model.js";

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

    return usuario;
}