import crearElemento from './auxiliares/crearElemento.js';
export const cargarcajas = async() => {
    const tablero = document.getElementById('tablero');
    if (!tablero) {
        console.error('No se encontró el contenedor con id "tablero"');
        return;
    }
  const divPeople = crearElemento({tipo: 'div', clase: 'caja', id: 'people', text: 'Personajes', });
  const divNaves = crearElemento({tipo: 'div', clase: 'caja', id: 'planeta', text: 'Personajes' });
  const divStar = crearElemento({tipo: 'div', clase: 'caja', id: 'nave', text: 'Personajes' });

  tablero.appendChild(divPeople);
  tablero.appendChild(divNaves);
  tablero.appendChild(divStar);
  console.log('Cajas cargadas exitosamente');
}

export default cargarcajas()