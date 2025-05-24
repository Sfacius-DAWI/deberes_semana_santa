export const manejarErrores = {
    mostrarError(mensaje) {
        const contenedor = document.getElementById('curriculum-container');
        if (!contenedor) return;
        
        contenedor.innerHTML = `
            <div class="error-cv-container">
                <div class="error-cv-icon">⚠️</div>
                <h3>Error al cargar el currículum</h3>
                <p>${mensaje}</p>
                <p class="error-cv-subtitle">Por favor, verifica tu conexión a internet e intenta nuevamente.</p>
                <button id="reintentar" class="btn-reintentar">Reintentar</button>
            </div>
        `;
        
        // Añadir funcionalidad al botón de reintento
        const botonReintentar = document.getElementById('reintentar');
        if (botonReintentar) {
            botonReintentar.addEventListener('click', () => {
                window.location.reload();
            });
        }
    },

    mostrarAdvertencia(mensaje) {
        // Crear elemento de advertencia
        const advertencia = document.createElement('div');
        advertencia.className = 'advertencia-cv';
        advertencia.innerHTML = `
            <span class="advertencia-cv-icon">⚠️</span>
            <span class="advertencia-cv-texto">${mensaje}</span>
            <button class="advertencia-cv-cerrar">&times;</button>
        `;
        
        // Insertar al principio del body
        document.body.insertBefore(advertencia, document.body.firstChild);
        
        // Manejar cierre
        const botonCerrar = advertencia.querySelector('.advertencia-cv-cerrar');
        botonCerrar.addEventListener('click', () => {
            advertencia.remove();
        });
        
        // Auto-cerrar después de 4 segundos
        setTimeout(() => {
            if (advertencia.parentNode) {
                advertencia.remove();
            }
        }, 4000);
    },

    validarDatos(datos) {
        const errores = [];
        
        if (!datos.datosPersonales || !datos.datosPersonales.nombre) {
            errores.push('Faltan datos personales básicos');
        }
        
        if (!datos.experiencia || datos.experiencia.length === 0) {
            errores.push('No se encontró información de experiencia laboral');
        }
        
        if (!datos.educacion || datos.educacion.length === 0) {
            errores.push('No se encontró información educativa');
        }
        
        return errores;
    }
};