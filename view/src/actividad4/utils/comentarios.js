import { CrearElemento } from './auxiliares/crearElemento.js';
import { cargarComentarios } from './cargarComentarios.js';

export const comentarios = async (postId) => {
    const comentarios = await cargarComentarios(postId);
    console.log("comentarios de la publicación:", comentarios);
    

    const container = CrearElemento({
        tipo: 'div'
    });

    comentarios.forEach(item => {
        const comentarioDiv = CrearElemento({
            tipo: 'div',
            clase: 'comentario',
            padre: container
        });
        
        comentarioDiv.style.textAlign = 'left';
        
        
        comentarioDiv.append(item.name);
    });

    return container;
}