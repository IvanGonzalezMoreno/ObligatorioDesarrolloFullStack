import { cambiarPlan as cambiarPlanService } from "../services/planes.service.js";

export async function cambiarPlan(req, res) {

    const usuario = await cambiarPlanService(req.usuario.id);

    if (usuario === null) {
        return res.status(404).json({
            error: "Usuario no encontrado"
        });
    }

    if (usuario === false) {
        return res.status(400).json({
            error: "El usuario ya tiene el plan premium"
        });
    }

    res.status(200).json({
        mensaje: "Plan cambiado a premium correctamente",
        plan: usuario.plan
    });
}