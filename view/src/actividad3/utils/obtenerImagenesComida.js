const API_FOODISH = 'https://foodish-api.com';

export const obtenerImagenesComida = {
    async obtenerPorCategoria(categoria) {
        const endpoints = {
            'pasta': '/api/images/pasta',
            'pizza': '/api/images/pizza', 
            'postre': '/api/images/dessert'
        };
        
        const endpoint = endpoints[categoria];
        
        if (!endpoint) {
            console.warn(`Categoría ${categoria} no soportada, usando imagen por defecto`);
            return this.obtenerImagenPorDefecto(categoria);
        }
        
        try {
            const response = await fetch(`${API_FOODISH}${endpoint}`);
            
            if (!response.ok) {
                throw new Error(`Error en la API: ${response.status}`);
            }
            
            const data = await response.json();
            
            return {
                url: data.image,
                alt: `Imagen de ${categoria}`,
                categoria: categoria
            };
            
        } catch (error) {
            console.error(`Error al obtener imagen de ${categoria}:`, error);
            
            return this.obtenerImagenPorDefecto(categoria);
        }
    },

    async obtenerImagenAleatoria() {
        try {
            const response = await fetch(`${API_FOODISH}/api/`);
            
            if (!response.ok) {
                throw new Error(`Error en la API: ${response.status}`);
            }
            
            const data = await response.json();
            
            return {
                url: data.image,
                alt: 'Imagen de comida aleatoria',
                categoria: 'general'
            };
            
        } catch (error) {
            console.error('Error al obtener imagen aleatoria:', error);
            return this.obtenerImagenPorDefecto('general');
        }
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

        return {
            ...imagenesDefecto[categoria] || imagenesDefecto['general'],
            categoria: categoria
        };
    },

    async precargarImagenes(categorias) {
        const promesas = categorias.map(categoria => 
            this.obtenerPorCategoria(categoria)
        );
        
        try {
            const imagenes = await Promise.allSettled(promesas);
            return imagenes.map((resultado, index) => ({
                categoria: categorias[index],
                imagen: resultado.status === 'fulfilled' 
                    ? resultado.value 
                    : this.obtenerImagenPorDefecto(categorias[index])
            }));
        } catch (error) {
            console.error('Error al precargar imágenes:', error);
            return categorias.map(categoria => ({
                categoria,
                imagen: this.obtenerImagenPorDefecto(categoria)
            }));
        }
    }
}; 