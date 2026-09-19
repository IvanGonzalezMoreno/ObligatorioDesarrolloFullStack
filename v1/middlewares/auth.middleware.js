import jwt from "jsonwebtoken";

export function autenticarUsuario(req, res, next) {

    const autorizacion = req.headers.authorization;

    if (!autorizacion) {
        return res.status(401).json({
            error: "Token no proporcionado"
        });
    }

    const token = autorizacion.split(" ")[1];

    try {

        const usuario = jwt.verify(token, "clave-secreta");

        req.usuario = usuario;

        next();

    } catch (error) {

        return res.status(401).json({
            error: "Token inválido o expirado"
        });

    }
}