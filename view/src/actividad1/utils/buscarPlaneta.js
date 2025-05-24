const API_BASE_URL = '/api/swapi';

export const buscarPlaneta = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/planets/${id}/`);
        
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const planeta = await response.json();
        
        return {
            tipo: 'Planeta',
            nombre: planeta.name,
            datos: {
                'Período de rotación': planeta.rotation_period !== 'unknown' ? `${planeta.rotation_period} horas` : 'Desconocido',
                'Período orbital': planeta.orbital_period !== 'unknown' ? `${planeta.orbital_period} días` : 'Desconocido',
                'Diámetro': planeta.diameter !== 'unknown' ? `${planeta.diameter} km` : 'Desconocido',
                'Clima': planeta.climate !== 'unknown' ? planeta.climate : 'Desconocido',
                'Gravedad': planeta.gravity !== 'unknown' ? planeta.gravity : 'Desconocido',
                'Terreno': planeta.terrain !== 'unknown' ? planeta.terrain : 'Desconocido',
                'Población': planeta.population !== 'unknown' ? planeta.population : 'Desconocido'
            },
            enlace: planeta.url
        };
    } catch (error) {
        console.error('Error al buscar planeta:', error);
        return {
            tipo: 'Planeta',
            nombre: 'No encontrado',
            datos: {
                'Error': 'No se pudo cargar la información del planeta'
            },
            enlace: null
        };
    }
}; 