export const manejarErrores = {
    mostrarError(mensaje) {
        const contenedor = document.getElementById('menu-container');
        if (!contenedor) return;
        
        contenedor.innerHTML = `
            <div class="error-menu-container">
                <div class="error-menu-icon">🍽️💔</div>
                <h3>¡Ups! Problema en la cocina</h3>
                <p>${mensaje}</p>
                <p class="error-menu-subtitle">Nuestro chef está trabajando para solucionarlo. Por favor, intenta de nuevo.</p>
                <button id="reintentar-menu" class="btn-reintentar-menu">🔄 Reintentar</button>
            </div>
        `;
        

        const botonReintentar = document.getElementById('reintentar-menu');
        if (botonReintentar) {
            botonReintentar.addEventListener('click', () => {
                window.location.reload();
            });
        }
    },

    mostrarAdvertencia(mensaje) {
        const advertencia = document.createElement('div');
        advertencia.className = 'advertencia-menu';
        advertencia.innerHTML = `
            <span class="advertencia-menu-icon">⚠️</span>
            <span class="advertencia-menu-texto">${mensaje}</span>
            <button class="advertencia-menu-cerrar">&times;</button>
        `;
        

        document.body.insertBefore(advertencia, document.body.firstChild);
        

        const botonCerrar = advertencia.querySelector('.advertencia-menu-cerrar');
        botonCerrar.addEventListener('click', () => {
            advertencia.remove();
        });
        

        setTimeout(() => {
            if (advertencia.parentNode) {
                advertencia.remove();
            }
        }, 4000);
    },

    mostrarErrorImagen(elemento, categoria) {
        const imagenDefecto = this.obtenerImagenPorDefecto(categoria);
        elemento.src = imagenDefecto.url;
        elemento.alt = imagenDefecto.alt;
    },

    obtenerImagenPorDefecto(categoria) {
        const imagenesDefecto = {
            'pasta': {
                url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDQwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjUwIiBmaWxsPSIjZTc0YzNjIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTI1IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+8J+NnSBQQVNUQTwvdGV4dD4KPC9zdmc+',
                alt: 'Imagen por defecto de pasta'
            },
            'pizza': {
                url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDQwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjUwIiBmaWxsPSIjZjM5YzEyIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTI1IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+8J+NlSBQSVpaQTwvdGV4dD4KPC9zdmc+',
                alt: 'Imagen por defecto de pizza'
            },
            'postre': {
                url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDQwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjUwIiBmaWxsPSIjOWI1OWI2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTI1IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+8J+NsCBQT1NURUU8L3RleHQ+Cjwvc3ZnPg==',
                alt: 'Imagen por defecto de postre'
            },
            'general': {
                url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDQwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjUwIiBmaWxsPSIjMzQ0OTVlIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTI1IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+8J+NvO+4jyBDT01JREE8L3RleHQ+Cjwvc3ZnPg==',
                alt: 'Imagen por defecto de comida'
            }
        };

        return imagenesDefecto[categoria] || imagenesDefecto['general'];
    }
}; 