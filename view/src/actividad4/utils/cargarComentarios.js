export const cargarComentarios = async (postId = null) => { 
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
  const comentarios = await response.json();
  return comentarios;
}

