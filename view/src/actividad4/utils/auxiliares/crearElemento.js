export const CrearElemento = ({ tipo, clase = null, id = null, texto = null, padre = null, NumberId = null, AddElemento = null }) => {
    const elemento = document.createElement(tipo);
    if (clase) {
        elemento.classList.add(clase);
    }
    if (id) {
        elemento.id = id;
    }
    if (NumberId) {
        elemento.dataset.numberId = NumberId;
    }
    if (texto) {
        elemento.textContent = texto;
    }
    if (padre) {
    padre.append(elemento);
    }

    if (AddElemento) {
    elemento.append(AddElemento)
    }

    return elemento;
}