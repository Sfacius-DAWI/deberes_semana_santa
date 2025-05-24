// Cargar CSS dinámicamente
function cargarCSS() {
  const cssFile = '/assets/actividad4-Buexe2J8.css';
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = cssFile;
  document.head.appendChild(link);
}

import { cargarNombres } from "./utils/cargarNombres.js";
import { cargarDatos } from "./utils/cargarDatos.js";

document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Cargar CSS primero
    cargarCSS();
    
    await cargarNombres();

  } catch (error) {
    console.error('Error al cargar los datos:', error);
  }
});

