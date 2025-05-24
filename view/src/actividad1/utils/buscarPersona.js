const API_BASE_URL = '/api/swapi';

export const buscarPersona = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/people/${id}/`);
        
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const persona = await response.json();
        
        return {
            tipo: 'Personaje',
            nombre: persona.name,
            datos: {
                'Altura': persona.height !== 'unknown' ? `${persona.height} cm` : 'Desconocido',
                'Peso': persona.mass !== 'unknown' ? `${persona.mass} kg` : 'Desconocido',
                'Color de cabello': persona.hair_color !== 'unknown' ? persona.hair_color : 'Desconocido',
                'Color de ojos': persona.eye_color !== 'unknown' ? persona.eye_color : 'Desconocido',
                'Año de nacimiento': persona.birth_year !== 'unknown' ? persona.birth_year : 'Desconocido',
                'Género': persona.gender !== 'unknown' ? persona.gender : 'Desconocido'
            },
            enlace: persona.url
        };
    } catch (error) {
        console.error('Error al buscar persona:', error);
        return {
            tipo: 'Personaje',
            nombre: 'No encontrado',
            datos: {
                'Error': 'No se pudo cargar la información del personaje'
            },
            enlace: null
        };
    }
}; 