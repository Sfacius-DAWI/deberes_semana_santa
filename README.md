# Proyecto Semanasanta - Actividades Web Interactivas

Este proyecto contiene 5 actividades web interactivas desarrolladas con HTML, CSS y JavaScript moderno (ES Modules), utilizando Vite para el empaquetado y Fastify para el servidor de desarrollo.

## 🚀 Cómo Arrancar el Servidor

Para explorar las actividades, sigue estos pasos:

1.  **Instalar Dependencias**:
    Si es la primera vez que clonas el repositorio o si has eliminado la carpeta `node_modules`, abre una terminal en la raíz del proyecto y ejecuta:
    ```bash
    npm install
    ```

2.  **Construir el Proyecto (Build)**:
    Vite necesita compilar los archivos fuente de `view/src/` al directorio `dist/`. Ejecuta:
    ```bash
    npm run build
    ```
    Este comando también ejecutará el script `postbuild` definido en `package.json` para copiar los archivos HTML necesarios y el `curriculum.json` al directorio `dist/`.

3.  **Iniciar el Servidor**:
    Una vez instaladas las dependencias y construido el proyecto, inicia el servidor Fastify con:
    ```bash
    npm run start
    ```
    El servidor se ejecutará en `http://localhost:3000`. Verás en la consola las URLs directas para cada actividad.

4.  **Acceder a las Actividades**:
    Abre tu navegador y visita las siguientes URLs:
    *   **Actividad 1 (Star Wars API)**: [http://localhost:3000/starwars](http://localhost:3000/starwars)
    *   **Actividad 2 (Currículum JSON)**: [http://localhost:3000/curriculum](http://localhost:3000/curriculum)
    *   **Actividad 3 (Restaurante Italiano)**: [http://localhost:3000/restaurante](http://localhost:3000/restaurante)
    *   **Actividad 4 (Usuarios JSONPlaceholder)**: [http://localhost:3000/usuarios](http://localhost:3000/usuarios)
    *   **Actividad 5 (Pizzería con Promesas)**: [http://localhost:3000/pizzeria](http://localhost:3000/pizzeria) (Revisar la consola del navegador F12 para ver la simulación).

    Si encuentras un error `EADDRINUSE`, significa que el puerto 3000 ya está en uso. Asegúrate de que no haya otra instancia del servidor corriendo. Puedes detener procesos `node.exe` desde el administrador de tareas o usando `taskkill /PID <PID> /F` en la terminal.

## 📒 Bitácora de Cambios y Errores

A continuación, se detallan los principales problemas encontrados durante el desarrollo y las soluciones aplicadas:

1.  **Error 404 en `actividad1/index.js` y otros archivos JS de actividades**:
    *   **Problema**: Inicialmente, los archivos JavaScript (`index.js`) de cada actividad, ubicados en `view/src/actividadX/`, no eran accesibles a través del servidor. Esto se debía a que Vite no estaba configurado para compilar cada actividad como un punto de entrada independiente.
    *   **Solución**: Se modificó `vite.config.js` para incluir múltiples puntos de entrada en `build.rollupOptions.input`. Cada `index.html` de las actividades (y los HTML principales como `usuarios.html`, `pizzeria.html`, etc.) se listaron como entradas. Esto asegura que Vite compile el JavaScript asociado a cada HTML y lo coloque en el directorio `dist/`. Se ejecutó `npm run build` para generar estos archivos.

2.  **Error 404 para `curriculum.json` (Actividad 2)**:
    *   **Problema**: El archivo `view/src/actividad2/data/curriculum.json` no se copiaba automáticamente al directorio `dist/` durante el proceso de build de Vite, resultando en un error 404 al intentar accederlo desde la aplicación.
    *   **Solución**:
        *   Se añadió una ruta específica en `server.js` para servir este archivo: `app.get('/dist/actividad2/data/curriculum.json', ...)` que intentaba servirlo directamente.
        *   Para asegurar que el archivo estuviera en `dist`, se modificó el script `postbuild` en `package.json` para copiar explícitamente `curriculum.json` a `dist/actividad2/data/`.
        *   La ruta de fetch en el JavaScript de la Actividad 2 se ajustó a `/dist/actividad2/data/curriculum.json`.

3.  **Problemas con la API de Star Wars (SWAPI) (Actividad 1)**:
    *   **Problema**: Se intentaron varias URLs para la SWAPI (`swapi.dev`, `swapi.py4e.com`, `swapi.info`) que presentaron diversos problemas:
        *   `swapi.dev`: `ERR_CERT_DATE_INVALID` (certificado SSL caducado).
        *   `swapi.py4e.com`: Errores 404 para endpoints específicos (ej. `/starships/`).
        *   `swapi.info`: Problemas de CORS y redirecciones 308 que complicaban las solicitudes directas desde el cliente.
    *   **Solución**: Se implementó un proxy simple en `server.js` (Fastify). Una ruta `/api/swapi/*` en el servidor local redirige las peticiones a `https://swapi.info/api/*`, manejando las respuestas y añadiendo las cabeceras CORS necesarias (`Access-Control-Allow-Origin: '*'`). El código cliente de la Actividad 1 se actualizó para usar este proxy (`/api/swapi/...`).

4.  **Errores con la API de Foodish (Actividad 3 - Restaurante)**:
    *   **Problema**: Inicialmente se usaron endpoints incorrectos (`https://foodish-api.com/api/pasta` en lugar de `https://foodish-api.com/api/images/pasta`). Luego, se exploraron alternativas debido a la inestabilidad percibida o cambios en la API (como `foodish-api.herokuapp.com` que estaba caída, o `picsum.photos` como fallback temporal).
    *   **Solución**: Se consultó la documentación oficial de Foodish (`https://github.com/surhud004/Foodish#readme`) y se corrigieron los endpoints en `view/src/actividad3/utils/obtenerImagenesComida.js` para usar las rutas correctas: `https://foodish-api.com/api/images/{categoria}` (ej. `/api/images/pasta`). Esto resolvió los errores 404 y permitió obtener las imágenes correctamente.

5.  **Error "No se encontró el elemento con id usuarios" (Actividad 4 - Usuarios)**:
    *   **Problema**: El archivo JavaScript de la Actividad 4 (`view/src/actividad4/index.js`) intentaba manipular elementos del DOM (ej. `document.getElementById('usuarios')`) que no existían en el `usuarios.html` porque este estaba vacío o con una estructura incorrecta.
    *   **Solución**:
        *   Se añadió la estructura HTML básica necesaria a `usuarios.html`, incluyendo los `div` con los IDs `usuarios` y `publicaciones`.
        *   Posteriormente, se corrigió la ruta del script en `usuarios.html` de `src="./actividad4/index.js"` a `src="/actividad4/index.js"` para asegurar que se resolviera correctamente desde la raíz del servidor.
        *   Se verificó que Fastify sirviera la última versión de `usuarios.html` tras los cambios, lo que a veces requirió reiniciar el servidor o copiar manualmente el archivo a `dist/` para evitar problemas de caché de archivos estáticos.

6.  **Estilos CSS no se cargaban en Actividad 4**:
    *   **Problema**: Aunque se importaba un archivo `styles.css` en `view/src/actividad4/index.js`, los estilos no se aplicaban en la página `usuarios.html` tras el build de producción. Vite compilaba el CSS a un archivo separado en `dist/assets/` (ej. `actividad4-XXXX.css`) pero el HTML no lo enlazaba automáticamente.
    *   **Solución**:
        *   Se intentó enlazar manualmente el archivo CSS compilado en `usuarios.html`. Sin embargo, el nombre del archivo CSS compilado incluye un hash, lo que hace que esta solución sea frágil.
        *   La solución final fue modificar `view/src/actividad4/index.js` para cargar dinámicamente el archivo CSS. Se añadió una función `cargarCSS()` que crea un elemento `<link rel="stylesheet">` y lo añade al `<head>` del documento, apuntando a la ruta del CSS compilado (ej. `/assets/actividad4-Buexe2J8.css`). Esto desacopló la carga del CSS del HTML y permitió que el JavaScript manejara la inclusión del CSS correcto. Se eliminó la importación directa `import "./styles.css";`.

7.  **Formato incorrecto en `server.js`**:
    *   **Problema**: Varias rutas y lógica de servidor en `server.js` estaban concatenadas en una sola línea, lo que dificultaba la lectura y potencialmente podría causar errores de sintaxis o comportamiento inesperado.
    *   **Solución**: Se reformateó el código en `server.js` para asegurar que cada declaración y bloque de código estuviera en líneas separadas y correctamente indentado, mejorando la legibilidad y mantenibilidad.

8.  **Simplificación de `pizzeria.html` (Actividad 5)**:
    *   **Problema**: El archivo `pizzeria.html` contenía una estructura HTML y estilos complejos que no eran necesarios para el objetivo de la actividad, la cual se centra en la lógica de Promises y `console.log`.
    *   **Solución**: Se simplificó drásticamente el `pizzeria.html`, eliminando toda la interfaz visual y dejando solo un título básico, un párrafo instruyendo al usuario a abrir la consola, y el tag `<script>` para cargar el `index.js` de la actividad. El usuario luego simplificó aún más el HTML eliminando el título y el párrafo, dejando solo el script.

9.  **Configuración General de Vite y Servidor**:
    *   **Ajustes**: Se realizaron ajustes en `vite.config.js` para manejar múltiples puntos de entrada HTML. El `server.js` se configuró para servir archivos estáticos desde el directorio `dist/` y para definir rutas específicas para cada actividad.
    *   **Scripts de `package.json`**: Se optimizó el script `build` para asegurar que todos los artefactos necesarios se generen correctamente y `postbuild` para copiar archivos HTML y JSON a `dist/`.

Estos ajustes y correcciones han permitido que las 5 actividades sean funcionales y cumplan con los requisitos establecidos.
