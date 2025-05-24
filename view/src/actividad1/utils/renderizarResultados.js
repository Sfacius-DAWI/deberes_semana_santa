export const renderizarResultados = {
    mostrar(persona, planeta, nave, contenedor) {
        contenedor.innerHTML = '';
        
        const columnas = document.createElement('div');
        columnas.className = 'columnas-resultados';
        
        columnas.appendChild(this.crearColumna(persona));
        columnas.appendChild(this.crearColumna(planeta));
        columnas.appendChild(this.crearColumna(nave));
        
        contenedor.appendChild(columnas);
    },

    crearColumna(datos) {
        const columna = document.createElement('div');
        columna.className = 'columna';
        
        const titulo = document.createElement('h3');
        titulo.textContent = datos.tipo;
        titulo.className = 'tipo-titulo';
        
        const nombre = document.createElement('h4');
        nombre.textContent = datos.nombre;
        nombre.className = 'nombre-elemento';
        
        const lista = document.createElement('ul');
        lista.className = 'lista-datos';
        
        Object.entries(datos.datos).forEach(([clave, valor]) => {
            const item = document.createElement('li');
            item.innerHTML = `<strong>${clave}:</strong> ${valor}`;
            lista.appendChild(item);
        });
        
        columna.appendChild(titulo);
        columna.appendChild(nombre);
        columna.appendChild(lista);
        
        // Añadir enlace si está disponible
        if (datos.enlace) {
            const enlace = document.createElement('a');
            enlace.href = datos.enlace;
            enlace.textContent = 'Ver detalles en API';
            enlace.target = '_blank';
            enlace.className = 'enlace-api';
            columna.appendChild(enlace);
        }
        
        return columna;
    }
}; 