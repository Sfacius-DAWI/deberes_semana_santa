export const manejarErrores = {
    mostrarError(mensaje) {

        const contenedor = document.getElementById('resultados');
        if (!contenedor) return;
        
        contenedor.innerHTML = `
            <div class="error-container">
                <div class="error-icon">⚠️</div>
                <h3>Error</h3>
                <p>${mensaje}</p>
                <p class="error-subtitle">Intenta con un número diferente o verifica tu conexión a internet.</p>
            </div>
        `;
        

        setTimeout(() => {
            if (contenedor.innerHTML.includes('error-container')) {
                contenedor.innerHTML = '';
            }
        }, 5000);
    },

    mostrarAdvertencia(mensaje) {
        const alerta = document.createElement('div');
        alerta.className = 'advertencia';
        alerta.innerHTML = `
            <span class="advertencia-icon">⚠️</span>
            <span>${mensaje}</span>
            <button class="cerrar-advertencia">&times;</button>
        `;
        
        document.body.appendChild(alerta);
        
        alerta.querySelector('.cerrar-advertencia').addEventListener('click', () => {
            alerta.remove();
        });
        
        setTimeout(() => {
            if (alerta.parentNode) {
                alerta.remove();
            }
        }, 3000);
    }
}; 