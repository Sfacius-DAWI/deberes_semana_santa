import { obtenerProductos } from './utils/obtenerProductos.js';
import { obtenerImagenesComida } from './utils/obtenerImagenesComida.js';
import { renderizarMenu } from './utils/renderizarMenu.js';
import { manejarErrores } from './utils/manejarErrores.js';

class RestauranteApp {
    constructor() {
        this.contenedorMenu = document.getElementById('menu-container');
        this.botonCargarMenu = document.getElementById('cargar-menu');
        this.filtros = document.querySelectorAll('.filtro-categoria');
        this.categoriaActiva = 'todos';
        this.productos = [];
        this.inicializar();
    }

    inicializar() {
        this.botonCargarMenu.addEventListener('click', () => this.cargarMenu());
        this.configurarFiltros();

        this.cargarMenu();
    }

    configurarFiltros() {
        this.filtros.forEach(filtro => {
            filtro.addEventListener('click', (e) => {

                this.filtros.forEach(f => f.classList.remove('activo'));

                e.target.classList.add('activo');
                
                this.categoriaActiva = e.target.dataset.categoria;
                this.filtrarProductos();
            });
        });
    }

    async cargarMenu() {
        this.mostrarCargando();
        
        try {

            const productosBase = obtenerProductos();
            

            const productosConImagenes = await this.asignarImagenes(productosBase);
            
            this.productos = productosConImagenes;
            renderizarMenu.mostrar(this.productos, this.contenedorMenu);
            

            this.botonCargarMenu.style.display = 'none';
            
        } catch (error) {
            manejarErrores.mostrarError('Error al cargar el menú del restaurante.');
            console.error('Error:', error);
        }
    }

    async asignarImagenes(productos) {
        const productosConImagenes = [];
        
        for (const producto of productos) {
            try {
                const imagen = await obtenerImagenesComida.obtenerPorCategoria(producto.categoria);
                productosConImagenes.push({
                    ...producto,
                    imagen: imagen
                });
            } catch (error) {
                console.warn(`Error al obtener imagen para ${producto.nombre}:`, error);
                productosConImagenes.push({
                    ...producto,
                    imagen: {
                        url: 'https://via.placeholder.com/300x200/f39c12/ffffff?text=🍽️',
                        alt: `Imagen de ${producto.nombre}`
                    }
                });
            }
        }
        
        return productosConImagenes;
    }

    filtrarProductos() {
        if (!this.productos.length) return;
        
        const productosFiltrados = this.categoriaActiva === 'todos' 
            ? this.productos 
            : this.productos.filter(producto => producto.categoria === this.categoriaActiva);
            
        renderizarMenu.mostrarFiltrados(productosFiltrados, this.contenedorMenu);
    }

    mostrarCargando() {
        this.contenedorMenu.innerHTML = `
            <div class="loading-menu">
                <div class="loading-chef">👨‍🍳</div>
                <p>Preparando el menú...</p>
                <p class="loading-subtitle">Nuestro chef está seleccionando los mejores platos</p>
                <div class="loading-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
    }
}


document.addEventListener('DOMContentLoaded', () => {
    new RestauranteApp();
});