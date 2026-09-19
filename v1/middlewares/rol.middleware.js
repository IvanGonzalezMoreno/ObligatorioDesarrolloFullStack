export function verificarAdmin(req, res, next) {

    if (req.usuario.rol !== "admin") {
        return res.status(403).json({
            error: "No tiene permisos para realizar esta acción"
        });
    }

    next();
}