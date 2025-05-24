const t=async()=>{try{const c=await fetch("./dist/actividad2/data/curriculum.json");if(!c.ok)throw new Error(`Error al cargar el currículum: ${c.status}`);const e=await c.json();if(!e.datosPersonales||!e.experiencia||!e.educacion)throw new Error("El archivo de currículum no tiene la estructura correcta");return e}catch(c){return console.error("Error al cargar currículum:",c),{datosPersonales:{nombre:"Error al cargar",profesion:"No disponible",email:"N/A",telefono:"N/A",ubicacion:"N/A"},resumen:"No se pudieron cargar los datos del currículum.",experiencia:[],educacion:[],habilidades:{tecnicas:[],blandas:[]},proyectos:[],idiomas:[]}}},s=async()=>{try{const c=await fetch("https://randomuser.me/api/?gender=female&nat=es");if(!c.ok)throw new Error(`Error al obtener imagen: ${c.status}`);const e=await c.json();if(e.results&&e.results.length>0){const n=e.results[0];return{url:n.picture.large,urlMedia:n.picture.medium,urlPequena:n.picture.thumbnail,alt:`Foto de perfil de ${n.name.first} ${n.name.last}`}}throw new Error("No se recibieron datos de usuario")}catch(c){return console.error("Error al obtener imagen de perfil:",c),{url:"https://via.placeholder.com/300x300/4F46E5/ffffff?text=👤",urlMedia:"https://via.placeholder.com/150x150/4F46E5/ffffff?text=👤",urlPequena:"https://via.placeholder.com/75x75/4F46E5/ffffff?text=👤",alt:"Imagen de perfil por defecto"}}},o={mostrar(c,e){e.innerHTML="";const n=document.createElement("div");n.className="cv-container",n.appendChild(this.crearHeader(c));const a=document.createElement("div");a.className="cv-content";const i=document.createElement("div");i.className="cv-left-column",i.appendChild(this.crearSeccionContacto(c.datosPersonales)),i.appendChild(this.crearSeccionHabilidades(c.habilidades)),i.appendChild(this.crearSeccionIdiomas(c.idiomas));const r=document.createElement("div");r.className="cv-right-column",r.appendChild(this.crearSeccionResumen(c.resumen)),r.appendChild(this.crearSeccionExperiencia(c.experiencia)),r.appendChild(this.crearSeccionEducacion(c.educacion)),r.appendChild(this.crearSeccionProyectos(c.proyectos)),a.appendChild(i),a.appendChild(r),n.appendChild(a),e.appendChild(n)},crearHeader(c){const e=document.createElement("div");return e.className="cv-header",e.innerHTML=`
            <div class="cv-photo">
                <img src="${c.imagen.url}" alt="${c.imagen.alt}" />
            </div>
            <div class="cv-header-info">
                <h1>${c.datosPersonales.nombre}</h1>
                <h2>${c.datosPersonales.profesion}</h2>
            </div>
        `,e},crearSeccionContacto(c){const e=document.createElement("div");return e.className="cv-section",e.innerHTML=`
            <h3 class="cv-section-title">Contacto</h3>
            <div class="cv-contact">
                <div class="contact-item">
                    <span class="contact-icon">📧</span>
                    <span>${c.email}</span>
                </div>
                <div class="contact-item">
                    <span class="contact-icon">📱</span>
                    <span>${c.telefono}</span>
                </div>
                <div class="contact-item">
                    <span class="contact-icon">📍</span>
                    <span>${c.ubicacion}</span>
                </div>
                ${c.linkedin?`
                    <div class="contact-item">
                        <span class="contact-icon">💼</span>
                        <a href="${c.linkedin}" target="_blank">LinkedIn</a>
                    </div>
                `:""}
                ${c.github?`
                    <div class="contact-item">
                        <span class="contact-icon">🐙</span>
                        <a href="${c.github}" target="_blank">GitHub</a>
                    </div>
                `:""}
                ${c.sitioWeb?`
                    <div class="contact-item">
                        <span class="contact-icon">🌐</span>
                        <a href="${c.sitioWeb}" target="_blank">Sitio Web</a>
                    </div>
                `:""}
            </div>
        `,e},crearSeccionHabilidades(c){const e=document.createElement("div");e.className="cv-section";const n=c.tecnicas.map(i=>`<span class="skill-tag technical">${i}</span>`).join(""),a=c.blandas.map(i=>`<span class="skill-tag soft">${i}</span>`).join("");return e.innerHTML=`
            <h3 class="cv-section-title">Habilidades</h3>
            <div class="skills-section">
                <h4>Técnicas</h4>
                <div class="skills-container">
                    ${n}
                </div>
                <h4>Personales</h4>
                <div class="skills-container">
                    ${a}
                </div>
            </div>
        `,e},crearSeccionIdiomas(c){const e=document.createElement("div");e.className="cv-section";const n=c.map(a=>`<div class="language-item">
                <span class="language-name">${a.idioma}</span>
                <span class="language-level">${a.nivel}</span>
            </div>`).join("");return e.innerHTML=`
            <h3 class="cv-section-title">Idiomas</h3>
            <div class="languages-container">
                ${n}
            </div>
        `,e},crearSeccionResumen(c){const e=document.createElement("div");return e.className="cv-section",e.innerHTML=`
            <h3 class="cv-section-title">Resumen Profesional</h3>
            <p class="cv-summary">${c}</p>
        `,e},crearSeccionExperiencia(c){const e=document.createElement("div");e.className="cv-section";const n=c.map(a=>`
            <div class="experience-item">
                <div class="experience-header">
                    <h4>${a.puesto}</h4>
                    <span class="period">${a.periodo}</span>
                </div>
                <p class="company">${a.empresa}</p>
                <ul class="experience-description">
                    ${a.descripcion.map(i=>`<li>${i}</li>`).join("")}
                </ul>
            </div>
        `).join("");return e.innerHTML=`
            <h3 class="cv-section-title">Experiencia Laboral</h3>
            <div class="experience-container">
                ${n}
            </div>
        `,e},crearSeccionEducacion(c){const e=document.createElement("div");e.className="cv-section";const n=c.map(a=>`
            <div class="education-item">
                <div class="education-header">
                    <h4>${a.titulo}</h4>
                    <span class="period">${a.periodo}</span>
                </div>
                <p class="institution">${a.institucion}</p>
                <p class="education-description">${a.descripcion}</p>
            </div>
        `).join("");return e.innerHTML=`
            <h3 class="cv-section-title">Educación</h3>
            <div class="education-container">
                ${n}
            </div>
        `,e},crearSeccionProyectos(c){const e=document.createElement("div");e.className="cv-section";const n=c.map(a=>`
            <div class="project-item">
                <div class="project-header">
                    <h4>${a.nombre}</h4>
                    ${a.enlace?`<a href="${a.enlace}" target="_blank" class="project-link">🔗</a>`:""}
                </div>
                <p class="project-description">${a.descripcion}</p>
                <div class="project-technologies">
                    ${a.tecnologias.map(i=>`<span class="tech-tag">${i}</span>`).join("")}
                </div>
            </div>
        `).join("");return e.innerHTML=`
            <h3 class="cv-section-title">Proyectos Destacados</h3>
            <div class="projects-container">
                ${n}
            </div>
        `,e}},l={mostrarError(c){const e=document.getElementById("curriculum-container");if(!e)return;e.innerHTML=`
            <div class="error-cv-container">
                <div class="error-cv-icon">⚠️</div>
                <h3>Error al cargar el currículum</h3>
                <p>${c}</p>
                <p class="error-cv-subtitle">Por favor, verifica tu conexión a internet e intenta nuevamente.</p>
                <button id="reintentar" class="btn-reintentar">Reintentar</button>
            </div>
        `;const n=document.getElementById("reintentar");n&&n.addEventListener("click",()=>{window.location.reload()})},mostrarAdvertencia(c){const e=document.createElement("div");e.className="advertencia-cv",e.innerHTML=`
            <span class="advertencia-cv-icon">⚠️</span>
            <span class="advertencia-cv-texto">${c}</span>
            <button class="advertencia-cv-cerrar">&times;</button>
        `,document.body.insertBefore(e,document.body.firstChild),e.querySelector(".advertencia-cv-cerrar").addEventListener("click",()=>{e.remove()}),setTimeout(()=>{e.parentNode&&e.remove()},4e3)},validarDatos(c){const e=[];return(!c.datosPersonales||!c.datosPersonales.nombre)&&e.push("Faltan datos personales básicos"),(!c.experiencia||c.experiencia.length===0)&&e.push("No se encontró información de experiencia laboral"),(!c.educacion||c.educacion.length===0)&&e.push("No se encontró información educativa"),e}};class d{constructor(){this.contenedorPrincipal=document.getElementById("curriculum-container"),this.botonCargar=document.getElementById("cargar-curriculum"),this.inicializar()}inicializar(){this.botonCargar.addEventListener("click",()=>this.cargarDatos()),this.cargarDatos()}async cargarDatos(){this.mostrarCargando();try{const[e,n]=await Promise.all([t(),s()]),a={...e,imagen:n};o.mostrar(a,this.contenedorPrincipal),this.botonCargar.style.display="none"}catch(e){l.mostrarError("Error al cargar el currículum. Por favor, intenta de nuevo."),console.error("Error:",e)}}mostrarCargando(){this.contenedorPrincipal.innerHTML=`
            <div class="loading-cv">
                <div class="loading-spinner"></div>
                <p>Cargando currículum...</p>
                <p class="loading-subtitle">Obteniendo datos del perfil</p>
            </div>
        `}}document.addEventListener("DOMContentLoaded",()=>{new d});
