import { buscarPersona } from './utils/buscarPersona.js';
import { buscarPlaneta } from './utils/buscarPlaneta.js';
import { buscarNave } from './utils/buscarNave.js';
import { renderizarResultados } from './utils/renderizarResultados.js';
import { manejarErrores } from './utils/manejarErrores.js';

class StarWarsApp {
    constructor() {
        this.botonBuscar = document.getElementById('buscar');
        this.inputNumero = document.getElementById('numero');
        this.contenedorResultados = document.getElementById('resultados');
        this.inicializar();
    }

    inicializar() {
        this.botonBuscar.addEventListener('click', () => this.buscarInformacion());
        this.inputNumero.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.buscarInformacion();
            }
        });
    }

    async buscarInformacion() {
        const numero = this.inputNumero.value.trim();
        
        if (!numero || isNaN(numero) || numero < 1) {
            manejarErrores.mostrarError('Por favor, introduce un número válido mayor a 0');
            return;
        }

        this.mostrarCargando();

        try {
            const [persona, planeta, nave] = await Promise.all([
                buscarPersona(numero),
                buscarPlaneta(numero),
                buscarNave(numero)
            ]);

            renderizarResultados.mostrar(persona, planeta, nave, this.contenedorResultados);
        } catch (error) {
            manejarErrores.mostrarError('Error al cargar los datos. Intenta con otro número.');
            console.error('Error:', error);
        }
    }

    mostrarCargando() {
        this.contenedorResultados.innerHTML = `
            <div class="loading">
                <p>Cargando información de la galaxia...</p>
                <div class="spinner"></div>
            </div>
        `;
    }
}


document.addEventListener('DOMContentLoaded', () => {
    new StarWarsApp();
}); 