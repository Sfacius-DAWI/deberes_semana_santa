export const cargarDatos = async (datos = null) => { 
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${datos}/posts`);
  const posts = await response.json();
  return posts;
}

