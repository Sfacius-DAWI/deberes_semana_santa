export const obtenerImagenPerfil = async () => {
    try {
        const response = await fetch('https://randomuser.me/api/?gender=female&nat=es');
        
        if (!response.ok) {
            throw new Error(`Error al obtener imagen: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
            const usuario = data.results[0];
            return {
                url: usuario.picture.large,
                urlMedia: usuario.picture.medium,
                urlPequena: usuario.picture.thumbnail,
                alt: `Foto de perfil de ${usuario.name.first} ${usuario.name.last}`
            };
        }
        
        throw new Error('No se recibieron datos de usuario');
        
    } catch (error) {
        console.error('Error al obtener imagen de perfil:', error);
        
       
        return {
            url: 'https://via.placeholder.com/300x300/4F46E5/ffffff?text=👤',
            urlMedia: 'https://via.placeholder.com/150x150/4F46E5/ffffff?text=👤',
            urlPequena: 'https://via.placeholder.com/75x75/4F46E5/ffffff?text=👤',
            alt: 'Imagen de perfil por defecto'
        };
    }
}; 