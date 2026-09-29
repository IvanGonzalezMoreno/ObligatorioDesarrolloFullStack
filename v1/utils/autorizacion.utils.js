export function esDueñoOAdmin(establecimiento, usuarioToken) {
    const esDueño = establecimiento.usuario.toString() === usuarioToken.id;
    return esDueño || usuarioToken.rol === "admin";
}