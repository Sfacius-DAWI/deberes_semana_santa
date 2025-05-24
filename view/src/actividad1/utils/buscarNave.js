const API_BASE_URL = '/api/swapi';

export const buscarNave = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/starships/${id}/`);
        
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const nave = await response.json();
        
        return {
            tipo: 'Nave Espacial',
            nombre: nave.name,
            datos: {
                'Modelo': nave.model !== 'unknown' ? nave.model : 'Desconocido',
                'Fabricante': nave.manufacturer !== 'unknown' ? nave.manufacturer : 'Desconocido',
                'Longitud': nave.length !== 'unknown' ? `${nave.length} m` : 'Desconocido',
                'Velocidad máxima': nave.max_atmosphering_speed !== 'unknown' ? `${nave.max_atmosphering_speed} km/h` : 'Desconocido',
                'Tripulación': nave.crew !== 'unknown' ? nave.crew : 'Desconocido',
                'Pasajeros': nave.passengers !== 'unknown' ? nave.passengers : 'Desconocido',
                'Clase de nave': nave.starship_class !== 'unknown' ? nave.starship_class : 'Desconocido',
                'Costo': nave.cost_in_credits !== 'unknown' ? `${nave.cost_in_credits} créditos` : 'Desconocido'
            },
            enlace: nave.url
        };
    } catch (error) {
        console.error('Error al buscar nave:', error);
        return {
            tipo: 'Nave Espacial',
            nombre: 'No encontrada',
            datos: {
                'Error': 'No se pudo cargar la información de la nave'
            },
            enlace: null
        };
    }
}; 