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
      // Crear el elemento usuario
      const userElement = CrearElemento({
        tipo: 'div',
        clase: 'usuario',
        id: `user-${user.id}`,
        NumberId: user.id,
        padre: usuariosContainer
      });

      // Agregar estilos desde JavaScript
      userElement.style.cursor = 'pointer';

      // Agregar información del usuario (nombre, email, ciudad, empresa)
      userElement.innerHTML = `
        <h3>${user.name}</h3>
        <p>Email: ${user.email}</p>
        <p>Ciudad: ${user.address.city}</p>
        <p>Empresa: ${user.company.name}</p>
      `;

      // Agregar evento de clic para cargar publicaciones
      userElement.addEventListener('click', async () => {
        // Remover selección previa de todos los usuarios
        document.querySelectorAll('.usuario').forEach(u => u.classList.remove('seleccionado'));
        
        // Seleccionar usuario actual
        userElement.classList.add('seleccionado');

        // Mostrar las publicaciones en el contenedor separado
        await mostrarPublicaciones(user, publicacionesContainer);
      });
    });

    return users.map(user => user.name);
  } catch (error) {
    console.error('Error en cargarNombres:', error);
    throw error;
  }
};

// Función para mostrar publicaciones en el contenedor separado
const mostrarPublicaciones = async (usuario, publicacionesContainer) => {
  // Limpiar contenedor y agregar título
  publicacionesContainer.innerHTML = `<h2>Publicaciones de ${usuario.name}</h2>`;
  
  // Cargar y mostrar las publicaciones
  const publicacionesElement = await Descripcion(usuario.id);
  publicacionesContainer.appendChild(publicacionesElement);
};

export default cargarNombres;