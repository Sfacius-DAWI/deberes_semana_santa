export const cargarCurriculum = async () => {
    try {
        const response = await fetch('./dist/actividad2/data/curriculum.json');
        
        if (!response.ok) {
            throw new Error(`Error al cargar el currículum: ${response.status}`);
        }
        
        const datos = await response.json();
        
    
        if (!datos.datosPersonales || !datos.experiencia || !datos.educacion) {
            throw new Error('El archivo de currículum no tiene la estructura correcta');
        }
        
        return datos;
        
    } catch (error) {
        console.error('Error al cargar currículum:', error);
        

        return {
            datosPersonales: {
                nombre: "Error al cargar",
                profesion: "No disponible",
                email: "N/A",
                telefono: "N/A",
                ubicacion: "N/A"
            },
            resumen: "No se pudieron cargar los datos del currículum.",
            experiencia: [],
            educacion: [],
            habilidades: {
                tecnicas: [],
                blandas: []
            },
            proyectos: [],
            idiomas: []
        };
    }
}; 