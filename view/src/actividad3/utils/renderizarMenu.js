export const renderizarMenu = {
    mostrar(productos, contenedor) {
        contenedor.innerHTML = '';
        
        const menuGrid = document.createElement('div');
        menuGrid.className = 'menu-grid';
        
        productos.forEach(producto => {
            const tarjetaProducto = this.crearTarjetaProducto(producto);
            menuGrid.appendChild(tarjetaProducto);
        });
        
        contenedor.appendChild(menuGrid);
    },

    mostrarFiltrados(productos, contenedor) {

        this.mostrar(productos, contenedor);
    },

    crearTarjetaProducto(producto) {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'producto-card';
        tarjeta.dataset.categoria = producto.categoria;
        
        tarjeta.innerHTML = `
            <div class="producto-imagen">
                <img src="${producto.imagen.url}" alt="${producto.imagen.alt}" loading="lazy">
                <div class="categoria-badge ${producto.categoria}">
                    ${this.obtenerIconoCategoria(producto.categoria)} ${this.obtenerNombreCategoria(producto.categoria)}
                </div>
            </div>
            
            <div class="producto-contenido">
                <h3 class="producto-nombre">${producto.nombre}</h3>
                <p class="producto-descripcion">${producto.descripcion}</p>
                
                <div class="producto-ingredientes">
                    <h4>Ingredientes:</h4>
                    <div class="ingredientes-lista">
                        ${producto.ingredientes.map(ingrediente => 
                            `<span class="ingrediente-tag">${ingrediente}</span>`
                        ).join('')}
                    </div>
                </div>
                
                <div class="producto-footer">
                    <span class="producto-precio">€${producto.precio.toFixed(2)}</span>
                    <button class="btn-agregar" data-id="${producto.id}">
                        🛒 Agregar
                    </button>
                </div>
            </div>
        `;
        
        
        const botonAgregar = tarjeta.querySelector('.btn-agregar');
        botonAgregar.addEventListener('click', () => {
            this.agregarAlCarrito(producto);
        });
        
        return tarjeta;
    },

    obtenerIconoCategoria(categoria) {
        const iconos = {
            'pasta': '🍝',
            'pizza': '🍕',
            'postre': '🍰'
        };
        return iconos[categoria] || '🍽️';
    },

    obtenerNombreCategoria(categoria) {
        const nombres = {
            'pasta': 'Pasta',
            'pizza': 'Pizza',
            'postre': 'Postre'
        };
        return nombres[categoria] || categoria;
    },

    agregarAlCarrito(producto) {

        this.mostrarNotificacion(`${producto.nombre} agregado al carrito`);
        

        console.log('Producto agregado al carrito:', producto);
    },

    mostrarNotificacion(mensaje) {
        const notificacion = document.createElement('div');
        notificacion.className = 'notificacion-carrito';
        notificacion.innerHTML = `
            <span class="notificacion-icon">✅</span>
            <span class="notificacion-texto">${mensaje}</span>
        `;
        
        document.body.appendChild(notificacion);
        
        // Mostrar con animación
        setTimeout(() => {
            notificacion.classList.add('mostrar');
        }, 100);
        
        // Ocultar después de 3 segundos
        setTimeout(() => {
            notificacion.classList.remove('mostrar');
            setTimeout(() => {
                if (notificacion.parentNode) {
                    notificacion.remove();
                }
            }, 300);
        }, 3000);
    }
}; 