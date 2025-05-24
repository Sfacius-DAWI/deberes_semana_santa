import { CrearElemento } from './auxiliares/crearElemento.js';
import { APIcall } from '../service/api.js';
import { Descripcion } from './ListaDatos.js';

export const cargarNombres = async() => {
  try {
    const usuariosContainer = document.getElementById('usuarios');
    const publicacionesContainer = document.getElementById('publicaciones');
    
    if (!usuariosContainer) {
      throw new Error('No se encontró el elemento con id usuarios');
    }

    const users = await APIcall();
    
    users.forEach(user => {

      const userElement = CrearElemento({
        tipo: 'div',
        clase: 'usuario',
        id: `user-${user.id}`,
        NumberId: user.id,
        padre: usuariosContainer
      });


      userElement.style.cursor = 'pointer';

  
      userElement.innerHTML = `
        <h3>${user.name}</h3>
        <p>Email: ${user.email}</p>
        <p>Ciudad: ${user.address.city}</p>
        <p>Empresa: ${user.company.name}</p>
      `;


      userElement.addEventListener('click', async () => {

        document.querySelectorAll('.usuario').forEach(u => u.classList.remove('seleccionado'));
        

        userElement.classList.add('seleccionado');


        await mostrarPublicaciones(user, publicacionesContainer);
      });
    });

    return users.map(user => user.name);
  } catch (error) {
    console.error('Error en cargarNombres:', error);
    throw error;
  }
};


const mostrarPublicaciones = async (usuario, publicacionesContainer) => {

  publicacionesContainer.innerHTML = `<h2>Publicaciones de ${usuario.name}</h2>`;
  

  const publicacionesElement = await Descripcion(usuario.id);
  publicacionesContainer.appendChild(publicacionesElement);
};

export default cargarNombres;