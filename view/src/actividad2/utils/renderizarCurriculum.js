export const renderizarCurriculum = {
    mostrar(datos, contenedor) {
        contenedor.innerHTML = '';
        
        const cvContainer = document.createElement('div');
        cvContainer.className = 'cv-container';
        
        
        cvContainer.appendChild(this.crearHeader(datos));
        

        const contenidoPrincipal = document.createElement('div');
        contenidoPrincipal.className = 'cv-content';
        

        const columnaIzquierda = document.createElement('div');
        columnaIzquierda.className = 'cv-left-column';
        columnaIzquierda.appendChild(this.crearSeccionContacto(datos.datosPersonales));
        columnaIzquierda.appendChild(this.crearSeccionHabilidades(datos.habilidades));
        columnaIzquierda.appendChild(this.crearSeccionIdiomas(datos.idiomas));
        

        const columnaDerecha = document.createElement('div');
        columnaDerecha.className = 'cv-right-column';
        columnaDerecha.appendChild(this.crearSeccionResumen(datos.resumen));
        columnaDerecha.appendChild(this.crearSeccionExperiencia(datos.experiencia));
        columnaDerecha.appendChild(this.crearSeccionEducacion(datos.educacion));
        columnaDerecha.appendChild(this.crearSeccionProyectos(datos.proyectos));
        
        contenidoPrincipal.appendChild(columnaIzquierda);
        contenidoPrincipal.appendChild(columnaDerecha);
        
        cvContainer.appendChild(contenidoPrincipal);
        contenedor.appendChild(cvContainer);
    },

    crearHeader(datos) {
        const header = document.createElement('div');
        header.className = 'cv-header';
        
        header.innerHTML = `
            <div class="cv-photo">
                <img src="${datos.imagen.url}" alt="${datos.imagen.alt}" />
            </div>
            <div class="cv-header-info">
                <h1>${datos.datosPersonales.nombre}</h1>
                <h2>${datos.datosPersonales.profesion}</h2>
            </div>
        `;
        
        return header;
    },

    crearSeccionContacto(datosPersonales) {
        const seccion = document.createElement('div');
        seccion.className = 'cv-section';
        
        seccion.innerHTML = `
            <h3 class="cv-section-title">Contacto</h3>
            <div class="cv-contact">
                <div class="contact-item">
                    <span class="contact-icon">📧</span>
                    <span>${datosPersonales.email}</span>
                </div>
                <div class="contact-item">
                    <span class="contact-icon">📱</span>
                    <span>${datosPersonales.telefono}</span>
                </div>
                <div class="contact-item">
                    <span class="contact-icon">📍</span>
                    <span>${datosPersonales.ubicacion}</span>
                </div>
                ${datosPersonales.linkedin ? `
                    <div class="contact-item">
                        <span class="contact-icon">💼</span>
                        <a href="${datosPersonales.linkedin}" target="_blank">LinkedIn</a>
                    </div>
                ` : ''}
                ${datosPersonales.github ? `
                    <div class="contact-item">
                        <span class="contact-icon">🐙</span>
                        <a href="${datosPersonales.github}" target="_blank">GitHub</a>
                    </div>
                ` : ''}
                ${datosPersonales.sitioWeb ? `
                    <div class="contact-item">
                        <span class="contact-icon">🌐</span>
                        <a href="${datosPersonales.sitioWeb}" target="_blank">Sitio Web</a>
                    </div>
                ` : ''}
            </div>
        `;
        
        return seccion;
    },

    crearSeccionHabilidades(habilidades) {
        const seccion = document.createElement('div');
        seccion.className = 'cv-section';
        
        const habilidadesTecnicas = habilidades.tecnicas.map(skill => 
            `<span class="skill-tag technical">${skill}</span>`
        ).join('');
        
        const habilidadesBlandas = habilidades.blandas.map(skill => 
            `<span class="skill-tag soft">${skill}</span>`
        ).join('');
        
        seccion.innerHTML = `
            <h3 class="cv-section-title">Habilidades</h3>
            <div class="skills-section">
                <h4>Técnicas</h4>
                <div class="skills-container">
                    ${habilidadesTecnicas}
                </div>
                <h4>Personales</h4>
                <div class="skills-container">
                    ${habilidadesBlandas}
                </div>
            </div>
        `;
        
        return seccion;
    },

    crearSeccionIdiomas(idiomas) {
        const seccion = document.createElement('div');
        seccion.className = 'cv-section';
        
        const listaIdiomas = idiomas.map(idioma => 
            `<div class="language-item">
                <span class="language-name">${idioma.idioma}</span>
                <span class="language-level">${idioma.nivel}</span>
            </div>`
        ).join('');
        
        seccion.innerHTML = `
            <h3 class="cv-section-title">Idiomas</h3>
            <div class="languages-container">
                ${listaIdiomas}
            </div>
        `;
        
        return seccion;
    },

    crearSeccionResumen(resumen) {
        const seccion = document.createElement('div');
        seccion.className = 'cv-section';
        
        seccion.innerHTML = `
            <h3 class="cv-section-title">Resumen Profesional</h3>
            <p class="cv-summary">${resumen}</p>
        `;
        
        return seccion;
    },

    crearSeccionExperiencia(experiencia) {
        const seccion = document.createElement('div');
        seccion.className = 'cv-section';
        
        const experienciaItems = experiencia.map(exp => `
            <div class="experience-item">
                <div class="experience-header">
                    <h4>${exp.puesto}</h4>
                    <span class="period">${exp.periodo}</span>
                </div>
                <p class="company">${exp.empresa}</p>
                <ul class="experience-description">
                    ${exp.descripcion.map(desc => `<li>${desc}</li>`).join('')}
                </ul>
            </div>
        `).join('');
        
        seccion.innerHTML = `
            <h3 class="cv-section-title">Experiencia Laboral</h3>
            <div class="experience-container">
                ${experienciaItems}
            </div>
        `;
        
        return seccion;
    },

    crearSeccionEducacion(educacion) {
        const seccion = document.createElement('div');
        seccion.className = 'cv-section';
        
        const educacionItems = educacion.map(edu => `
            <div class="education-item">
                <div class="education-header">
                    <h4>${edu.titulo}</h4>
                    <span class="period">${edu.periodo}</span>
                </div>
                <p class="institution">${edu.institucion}</p>
                <p class="education-description">${edu.descripcion}</p>
            </div>
        `).join('');
        
        seccion.innerHTML = `
            <h3 class="cv-section-title">Educación</h3>
            <div class="education-container">
                ${educacionItems}
            </div>
        `;
        
        return seccion;
    },

    crearSeccionProyectos(proyectos) {
        const seccion = document.createElement('div');
        seccion.className = 'cv-section';
        
        const proyectoItems = proyectos.map(proyecto => `
            <div class="project-item">
                <div class="project-header">
                    <h4>${proyecto.nombre}</h4>
                    ${proyecto.enlace ? `<a href="${proyecto.enlace}" target="_blank" class="project-link">🔗</a>` : ''}
                </div>
                <p class="project-description">${proyecto.descripcion}</p>
                <div class="project-technologies">
                    ${proyecto.tecnologias.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
        `).join('');
        
        seccion.innerHTML = `
            <h3 class="cv-section-title">Proyectos Destacados</h3>
            <div class="projects-container">
                ${proyectoItems}
            </div>
        `;
        
        return seccion;
    }
}; 