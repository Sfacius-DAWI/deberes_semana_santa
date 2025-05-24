import { cargarCurriculum } from './utils/cargarCurriculum.js';
import { obtenerImagenPerfil } from './utils/obtenerImagenPerfil.js';
import { renderizarCurriculum } from './utils/renderizarCurriculum.js';
import { manejarErrores } from './utils/manejarErrores.js';

class CurriculumApp {
    constructor() {
        this.contenedorPrincipal = document.getElementById('curriculum-container');
        this.botonCargar = document.getElementById('cargar-curriculum');
        this.inicializar();
    }

    inicializar() {
        this.botonCargar.addEventListener('click', () => this.cargarDatos());
        this.cargarDatos();
    }

    async cargarDatos() {
        this.mostrarCargando();

        try {
            const [datosCV, imagenPerfil] = await Promise.all([
                cargarCurriculum(),
                obtenerImagenPerfil()
            ]);


            const datosCompletos = {
                ...datosCV,
                imagen: imagenPerfil
            };

            renderizarCurriculum.mostrar(datosCompletos, this.contenedorPrincipal);
            

            this.botonCargar.style.display = 'none';

        } catch (error) {
            manejarErrores.mostrarError('Error al cargar el currículum. Por favor, intenta de nuevo.');
            console.error('Error:', error);
        }
    }

    mostrarCargando() {
        this.contenedorPrincipal.innerHTML = `
            <div class="loading-cv">
                <div class="loading-spinner"></div>
                <p>Cargando currículum...</p>
                <p class="loading-subtitle">Obteniendo datos del perfil</p>
            </div>
        `;
    }
}


document.addEventListener('DOMContentLoaded', () => {
    new CurriculumApp();
}); 