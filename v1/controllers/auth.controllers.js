import { registrarUsuario as registrarUsuarioService } from "../services/auth.service.js";

import { iniciarSesion as iniciarSesionService } from "../services/auth.service.js";

export async function registrarUsuario(req, res) {

    console.log(req.body);

    const usuario = await registrarUsuarioService(req.body);

    res.status(201).json(usuario);
}

export async function iniciarSesion(req, res) {

    const usuario = await iniciarSesionService(req.body);

    if (!usuario) {
        return res.status(401).json({
            error: "Usuario o contraseña incorrectos"
        });
    }

    res.status(200).json(usuario);
}