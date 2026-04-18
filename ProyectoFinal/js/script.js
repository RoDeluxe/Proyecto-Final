function showSection(nombre) {
    const actual = document.querySelector('.section.active');
    const siguiente = document.getElementById(nombre);

    if (actual === siguiente) return;

    actual.style.opacity = '0';

    setTimeout(() => {
        actual.classList.remove('active');
        actual.style.opacity = '';
        siguiente.classList.add('active');
        siguiente.style.opacity = '0';

        setTimeout(() => {
            siguiente.style.opacity = '1';
        }, 20);
    }, 350);

    document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
    const navBtn = document.getElementById('nav-' + nombre);
    if (navBtn) navBtn.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

const departamentos = {
    laboratorio: {
        nombre: '⬥ LABORATORIO',
        img: 'https://i.postimg.cc/nLZ5xGXb/medicina-de-laboratorio-700x469.jpg',
        desc: 'El Laboratorio Clínico está dedicado a procesar muestras humanas, ofreciendo resultados confiables para apoyar al diagnóstico médico, tratamiento y prevención de enfermedades. Certificado bajo la Norma ISO 9001-2015.'
    },
    diagnostico: {
        nombre: '⬥ DIAGNÓSTICOS',
        img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600',
        desc: 'Contamos con equipos de última generación para diagnósticos precisos. Nuestro equipo médico especializado garantiza resultados rápidos y confiables para orientar el tratamiento adecuado.'
    },
    emergencia: {
        nombre: '⬥ EMERGENCIA',
        img: 'https://i.postimg.cc/9MkJDdFg/cuando-solicitar-ambulancia-distrito.jpg',
        desc: 'Nuestro servicio de emergencias opera las 24 horas del día, los 7 días de la semana. Contamos con personal altamente capacitado y equipamiento avanzado para atender cualquier urgencia médica.'
    },
    farmacia: {
        nombre: '⬥ FARMACIA',
        img: 'https://i.postimg.cc/mDKJvfMQ/Gemini-Generated-Image-3s7g5y3s7g5y3s7g.png',
        desc: 'La farmacia de la clínica ofrece todos los medicamentos prescritos por nuestros médicos. Personal farmacéutico certificado brinda orientación sobre el uso correcto de cada medicamento.'
    },
    imagenes: {
        nombre: '⬥ IMÁGENES',
        img: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600',
        desc: 'El departamento de imágenes médicas cuenta con rayos X, ultrasonidos, tomografías y resonancias magnéticas. Tecnología de punta para diagnósticos visuales precisos y detallados.'
    },
    otros: {
        nombre: '⬥ OTROS SERVICIOS',
        img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600',
        desc: 'Ofrecemos una variedad de servicios complementarios para el cuidado integral de la salud, incluyendo terapia física, nutrición, psicología y medicina preventiva.'
    }
};

function mostrarDeptFull(elemento, dept) {
    document.querySelectorAll('.dept-card').forEach(el => el.classList.remove('active'));
    elemento.classList.add('active');

    const data = {
        laboratorio: {
            nombre: 'Laboratorio',
            img: 'https://corominas.com.do/wp-content/uploads/2025/02/web-Laboratorio-1024x682.jpg',
            desc: 'El Laboratorio Clínico está dedicado a procesar muestras humanas, ofreciendo resultados confiables para apoyar al diagnóstico médico, tratamiento y prevención de enfermedades.'
        },
        imagenes: {
            nombre: 'Imágenes',
            img: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800',
            desc: 'El departamento de imágenes médicas cuenta con rayos X, ultrasonidos, tomografías y resonancias magnéticas. Tecnología de punta para diagnósticos visuales precisos.'
        },
        farmacia: {
            nombre: 'Farmacia',
            img: 'https://i.postimg.cc/tqgbV94m/Gemini-Generated-Image-3s7g5y3s7g5y3s7g.png',
            desc: 'La farmacia de la clínica ofrece todos los medicamentos prescritos por nuestros médicos. Personal farmacéutico certificado brinda orientación sobre el uso correcto.'
        }
    };

    const img = document.getElementById('full-img');
    const nombre = document.getElementById('full-nombre');
    const desc = document.getElementById('full-desc');

    img.style.opacity = '0';
    nombre.style.opacity = '0';
    desc.style.opacity = '0';

    setTimeout(() => {
        img.src = data[dept].img;
        nombre.innerText = data[dept].nombre;
        desc.innerText = data[dept].desc;

        img.style.opacity = '1';
        nombre.style.opacity = '1';
        desc.style.opacity = '1';
    }, 200);
}

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY === 0) {
        header.classList.remove('scrolled');
    } else {
        header.classList.add('scrolled');
    }
});

function abrirModal() {
    document.getElementById('modal-login').classList.add('activo');
}

function cerrarModal(event) {
    if (event.target.id === 'modal-login') {
        document.getElementById('modal-login').classList.remove('activo');
    }
}

function filtrarDoctores() {
    const normalizar = str => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
    
    const nombre = normalizar(document.getElementById('dir-input').value);
    const especialidad = normalizar(document.getElementById('dir-select').value);
    const cards = document.querySelectorAll('.dir-card');
    let visibles = 0;

    cards.forEach(card => {
        const n = normalizar(card.dataset.nombre);
        const e = normalizar(card.dataset.especialidad);
        const coincide = n.includes(nombre) && (especialidad === '' || e === especialidad);
        card.style.display = coincide ? 'block' : 'none';
        if (coincide) visibles++;
    });

    document.getElementById('dir-sin-resultados').style.display = visibles === 0 ? 'block' : 'none';
}


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