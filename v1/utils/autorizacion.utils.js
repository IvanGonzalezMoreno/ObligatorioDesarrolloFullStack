export function esDueñoOAdmin(establecimiento, usuarioToken) {

    const idPropietario = establecimiento.usuario._id
        ? establecimiento.usuario._id.toString()
        : establecimiento.usuario.toString();

    const esDueño = idPropietario === usuarioToken.id;

    return esDueño || usuarioToken.rol === "admin";
}