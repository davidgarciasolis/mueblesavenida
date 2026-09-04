const categories = {
    salones: {
        title: 'Salones', description: 'Composiciones para disfrutar, recibir y vivir cada día.',
        images: [
            ['salon-mueble-tv-madera-roble.jpg', 'Salón moderno con mueble bajo de televisión en madera y panel retroiluminado.'],
            ['salon-sofa-modular-madera.jpg', 'Salón con sofá modular blanco, mesas de centro y panel decorativo de madera.'],
            ['salon-tv-panel-madera-integrado.jpg', 'Salón elegante con panel de televisión integrado en madera y mueble bajo blanco.']
        ]
    },
    dormitorios: {
        title: 'Dormitorios', description: 'Descanso, orden y soluciones que hacen fácil el día a día.',
        images: [['dormitorio-cabecero-listones-madera.jpg', 'Dormitorio moderno con cama tapizada y cabecero de listones de madera iluminado.'], ['dormitorio-modular-cama-almacenaje.png', 'Dormitorio modular con cama, armarios altos y estantería integrada.']]
    },
    juvenil: {
        title: 'Juvenil', description: 'Espacios completos que acompañan cada nueva etapa.',
        images: [['dormitorio-juvenil-cama-escritorio.png', 'Dormitorio juvenil luminoso con cama individual, escritorio y estantes altos.'], ['dormitorio-juvenil-escritorio-armario.png', 'Dormitorio juvenil con cama, escritorio, armario y estantería integrada.']]
    },
    armarios: {
        title: 'Armarios y vestidores', description: 'Almacenaje a medida para aprovechar cada centímetro.',
        images: [['armario-modular-puertas-cristal.png', 'Armario modular blanco con espejo y puertas de cristal para vestidor.'], ['vestidor-espejo-redondo-iluminado.jpg', 'Vestidor con armarios de cristal oscuro y espejo circular iluminado.']]
    },
    'muebles-tv': {
        title: 'Muebles de TV', description: 'Doce propuestas para integrar tecnología, almacenaje e iluminación en el salón.',
        images: ['mueble-tv-blanco-01.png', 'mueble-tv-espejo-iluminado-02.png', 'mueble-tv-moderno-03.png', 'mueble-tv-moderno-04.png', 'mueble-tv-moderno-05.png', 'mueble-tv-moderno-06.png', 'mueble-tv-moderno-07.png', 'mueble-tv-moderno-08.png', 'mueble-tv-moderno-09.png', 'mueble-tv-moderno-10.png', 'mueble-tv-moderno-11.png', 'mueble-tv-moderno-12.png'].map(file => [file, 'Propuesta de mueble de televisión moderno.'])
    },
    'mesas-de-centro': {
        title: 'Mesas de centro', description: 'Ocho diseños para completar el salón con funcionalidad y personalidad.',
        images: ['mesa-centro-03.png', 'mesa-centro-04.png', 'mesa-centro-05.png', 'mesa-centro-06.png', 'mesa-centro-07.png', 'mesa-centro-08.png', 'mesa-elevable-patas-cruzadas-02.png', 'mesa-elevable-sofa-01.png'].map(file => [file, 'Mesa de centro de diseño contemporáneo.'])
    },
    'separadores-de-ambientes': {
        title: 'Separadores de ambientes', description: 'Once formas de delimitar y dar ritmo a un espacio manteniendo la luz.',
        images: ['separador-listones-salon-02.png', 'separador-listones-nichos-01.png', 'separador-listones-madera-03.png', 'separador-listones-04.png', 'separador-listones-05.png', 'separador-listones-06.png', 'separador-listones-07.png', 'separador-listones-08.png', 'separador-listones-09.png', 'separador-listones-10.png', 'separador-listones-11.png'].map(file => [file, 'Separador de ambientes realizado con listones de madera.'])
    },
    comedor: {
        title: 'Comedores', description: 'Mesas y sillas para convertir las reuniones cotidianas en momentos especiales.',
        images: ['comedor-mesa-madera-estanteria-04.png', 'comedor-redondo-lampara-01.png', 'comedor-redondo-sillas-oscuras-02.png', 'comedor-y-salon-separados-03.png'].map(file => [file, 'Comedor contemporáneo con materiales cálidos.'])
    },
    'aparadores-y-vitrinas': {
        title: 'Aparadores y vitrinas', description: 'Piezas de almacenaje que ordenan y también decoran.',
        images: ['aparador-roble-arco-04.png', 'aparador-roble-crema-01.png', 'aparador-roble-ventanal-02.png', 'vitrina-cristal-oscura-03.png'].map(file => [file, 'Aparador o vitrina de estilo contemporáneo.'])
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const slug = new URLSearchParams(window.location.search).get('categoria');
    const category = categories[slug] || categories.salones;
    const title = document.getElementById('category-title');
    const description = document.getElementById('category-description');
    const count = document.getElementById('gallery-count');
    const gallery = document.getElementById('category-gallery');

    document.title = `${category.title} | Muebles Avenida`;
    title.textContent = category.title;
    description.textContent = category.description;
    count.textContent = `${category.images.length} ${category.images.length === 1 ? 'ambiente' : 'ambientes'} para inspirarte`;
    gallery.innerHTML = category.images.map(([file, alt], index) => `
        <figure class="gallery-item ${index % 5 === 0 ? 'gallery-item--large' : ''}">
            <img src="assets/categorias/${slug in categories ? slug : 'salones'}/${file}" alt="${alt}" ${index > 1 ? 'loading="lazy"' : ''}>
        </figure>`).join('');

    const header = document.getElementById('header');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    hamburger?.addEventListener('click', () => {
        const active = navMenu.classList.toggle('active');
        hamburger.classList.toggle('active', active);
        hamburger.setAttribute('aria-expanded', active);
        document.body.style.overflow = active ? 'hidden' : '';
    });
    navMenu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
        navMenu.classList.remove('active'); hamburger?.classList.remove('active'); document.body.style.overflow = '';
    }));
    header?.classList.add('scrolled');
});
