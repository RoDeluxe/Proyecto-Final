/* ============================================================
   script.js — Clínica Adventista
   Funciones:
     1. showSection()      — Navegación entre secciones (SPA)
     2. departamentos      — Datos de cada departamento
     3. seleccionarDept()  — Cambia el panel de departamento con fade
     4. Scroll listener    — Agrega fondo al header al hacer scroll
     5. abrirModal()       — Abre el modal de login
     6. cerrarModal()      — Cierra el modal al hacer clic afuera
   ============================================================ */


/* ============================================================
   1. NAVEGACIÓN ENTRE SECCIONES
   Funciona como una Single Page Application (SPA):
   en lugar de cargar páginas nuevas, muestra/oculta divs.

   @param {string} sectionId — ID de la sección a mostrar
                                (ej: 'Inicio', 'Doctores', etc.)
   ============================================================ */
function showSection(sectionId) {
    /* Oculta todas las secciones quitando la clase "active" */
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));

    /* Quita el resaltado activo de todos los enlaces del navbar */
    document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));

    /* Muestra únicamente la sección solicitada */
    document.getElementById(sectionId).classList.add('active');

    /* Resalta el enlace del navbar correspondiente (si existe) */
    const navEl = document.getElementById('nav-' + sectionId);
    if (navEl) navEl.classList.add('active');

    /* Sube suavemente al inicio de la página */
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


/* ============================================================
   2. DATOS DE DEPARTAMENTOS
   Objeto con la información de cada departamento.
   Cada clave coincide con el segundo argumento de seleccionarDept().


   Propiedades de cada departamento:
     - nombre: título que se muestra en el panel (incluye el símbolo ⬥)
     - img:    URL de la imagen ilustrativa
     - desc:   descripción del servicio
   ============================================================ */
const departamentos = {
    laboratorio: {
        nombre: '⬥ LABORATORIO',
        img:    'https://i.postimg.cc/nLZ5xGXb/medicina-de-laboratorio-700x469.jpg',
        desc:   'El Laboratorio Clínico está dedicado a procesar muestras humanas, ofreciendo resultados confiables para apoyar al diagnóstico médico, tratamiento y prevención de enfermedades. Certificado bajo la Norma ISO 9001-2015.'
    },
    diagnostico: {
        nombre: '⬥ DIAGNÓSTICOS',
        img:    'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600',
        desc:   'Contamos con equipos de última generación para diagnósticos precisos. Nuestro equipo médico especializado garantiza resultados rápidos y confiables para orientar el tratamiento adecuado.'
    },
    emergencia: {
        nombre: '⬥ EMERGENCIA',
        img:    'https://i.postimg.cc/9MkJDdFg/cuando-solicitar-ambulancia-distrito.jpg',
        desc:   'Nuestro servicio de emergencias opera las 24 horas del día, los 7 días de la semana. Contamos con personal altamente capacitado y equipamiento avanzado para atender cualquier urgencia médica.'
    },
    farmacia: {
        nombre: '⬥ FARMACIA',
        img:    'https://i.postimg.cc/mDKJvfMQ/Gemini-Generated-Image-3s7g5y3s7g5y3s7g.png',
        desc:   'La farmacia de la clínica ofrece todos los medicamentos prescritos por nuestros médicos. Personal farmacéutico certificado brinda orientación sobre el uso correcto de cada medicamento.'
    },
    imagenes: {
        nombre: '⬥ IMÁGENES',
        img:    'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600',
        desc:   'El departamento de imágenes médicas cuenta con rayos X, ultrasonidos, tomografías y resonancias magnéticas. Tecnología de punta para diagnósticos visuales precisos y detallados.'
    },
    otros: {
        nombre: '⬥ OTROS SERVICIOS',
        img:    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600',
        desc:   'Ofrecemos una variedad de servicios complementarios para el cuidado integral de la salud, incluyendo terapia física, nutrición, psicología y medicina preventiva.'
    }
};


/* ============================================================
   3. SELECCIONAR DEPARTAMENTO
   Al hacer clic en un ícono, actualiza el panel derecho con una
   animación de fade-out → cambio de contenido → fade-in.

   @param {HTMLElement} el  — El div.dept-item que fue clickeado
   @param {string}      id  — Clave del objeto departamentos
   ============================================================ */
function seleccionarDept(el, id) {
    /* Quita el estado activo de todos los ítems */
    document.querySelectorAll('.dept-item').forEach(i => i.classList.remove('active'));

    /* Activa solo el ícono clicado */
    el.classList.add('active');

    const info = document.querySelector('.dept-info');
    const d = departamentos[id];

    /* Paso 1: inicia el fade-out añadiendo la clase "cambiando" */
    info.classList.add('cambiando');

    /*
       Paso 2: espera 1 frame de renderizado y luego 100ms
       (debe coincidir con el tiempo de transición en CSS).
       Después de ese tiempo, actualiza el contenido y
       quita "cambiando" para el fade-in.
    */
    requestAnimationFrame(() => {
        setTimeout(() => {
            document.getElementById('dept-img').src          = d.img;
            document.getElementById('dept-nombre').textContent = d.nombre;
            document.getElementById('dept-desc').textContent   = d.desc;

            /* Paso 3: fade-in — remueve la clase para restaurar opacity: 1 */
            info.classList.remove('cambiando');
        }, 100);
    });
}


/* ============================================================
   4. SCROLL LISTENER — Efecto de header al desplazarse
   Agrega/quita la clase "scrolled" al header según la posición
   de scroll. La clase "scrolled" activa el fondo blanco y la
   sombra (definidos en CSS).
   ============================================================ */
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');

    if (window.scrollY === 0) {
        /* El usuario está al tope: header transparente */
        header.classList.remove('scrolled');
    } else {
        /* El usuario hizo scroll: header con fondo blanco */
        header.classList.add('scrolled');
    }
});


/* ============================================================
   5. ABRIR MODAL DE LOGIN
   Activa el overlay del modal añadiendo la clase "activo",
   que cambia su display a flex (ver CSS).
   ============================================================ */
function abrirModal() {
    document.getElementById('modal-login').classList.add('activo');
}


/* ============================================================
   6. CERRAR MODAL DE LOGIN
   Cierra el modal solo si el clic fue directamente sobre el
   overlay (fondo oscuro), no sobre la tarjeta blanca interior.

   @param {MouseEvent} event — Evento del clic en el overlay
   ============================================================ */
function cerrarModal(event) {
    /* Solo cierra si el elemento clickeado ES el overlay (no sus hijos) */
    if (event.target.id === 'modal-login') {
        document.getElementById('modal-login').classList.remove('activo');
    }
}

 /* Script para contactos */

document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;

    document.getElementById("respuesta").innerText =
        "Mensaje enviado correctamente. Gracias, " + nombre + ".";

    this.reset();
});


/* Script para departamentos */

function mostrarDeptFull(elemento, dept) {

    // Quitar active
    document.querySelectorAll(".dept-card").forEach(el => el.classList.remove("active"));
    elemento.classList.add("active");

    const data = {
        laboratorio: {
            nombre: "Laboratorio",
            img: "https://corominas.com.do/wp-content/uploads/2025/02/web-Laboratorio-1024x682.jpg",
            desc: "El Laboratorio Clínico está dedicado a procesar muestras humanas, ofreciendo resultados confiables para apoyar al diagnóstico médico, tratamiento y prevención de enfermedades. Certificado bajo la Norma ISO 9001-2015."
        },
        imagenes: {
            nombre: "Imagenes",
            img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800",
            desc: "El departamento de imágenes médicas cuenta con rayos X, ultrasonidos, tomografías y resonancias magnéticas. Tecnología de punta para diagnósticos visuales precisos y detallados."
        },
        farmacia: {
            nombre: "Farmacia",
            img: "https://i.postimg.cc/tqgbV94m/Gemini-Generated-Image-3s7g5y3s7g5y3s7g.png",
            desc: "La farmacia de la clínica ofrece todos los medicamentos prescritos por nuestros médicos. Personal farmacéutico certificado brinda orientación sobre el uso correcto de cada medicamento."
        },
    };

    document.getElementById("full-img").src = data[dept].img;
    document.getElementById("full-nombre").innerText = data[dept].nombre;
    document.getElementById("full-desc").innerText = data[dept].desc;
}