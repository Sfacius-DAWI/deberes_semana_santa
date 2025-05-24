import { cargarDatos } from './cargarDatos.js';
import { CrearElemento } from './auxiliares/crearElemento.js';
import { comentarios } from './comentarios.js';

export const Descripcion = async (id) => {
    const TITULOS = await cargarDatos(id);
    console.log("Posts del usuario:", TITULOS);
    
    const Lista = CrearElemento({
        tipo: 'ol'
    });

    TITULOS.forEach(post => {

        const li = CrearElemento({
            tipo: 'li',
            padre: Lista
        });
        

        const pubDiv = CrearElemento({
            tipo: 'div',
            clase: 'publicacion',
            texto: post.title,
            padre: li
        });
        

        const comentariosDiv = CrearElemento({
            tipo: 'div',
            padre: li
        });
        

        pubDiv.addEventListener('click', async function() {
            if (comentariosDiv.innerHTML) {

                comentariosDiv.innerHTML = "";
            } else {

                const comentariosElement = await comentarios(post.id);
                comentariosDiv.appendChild(comentariosElement);
            }
        });
    });   
    
    return Lista;
}