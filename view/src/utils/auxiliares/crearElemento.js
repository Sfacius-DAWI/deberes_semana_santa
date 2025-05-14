export const crearElemento = ({ tipo, clase = null, id = null, texto = null }) => {
    const elemento = document.createElement(tipo);
    if (clase) {
        elemento.classList.add(clase);
    }
    if (id) {
        elemento.id = id;
    }
    if (texto) {
        elemento.textContent = texto;
    }
    return elemento;
}

export default crearElemento()