(() => {
    const isHome = /(?:^|\/)index\.html$/.test(window.location.pathname) || window.location.pathname.endsWith('/');
    const homeUrl = isHome ? '' : 'index.html';

    window.loadHeader = async () => {
        const slot = document.querySelector('[data-header-slot]');
        if (!slot) return;

        try {
            const response = await fetch('header.html');
            if (!response.ok) throw new Error(`No se pudo cargar la cabecera (${response.status})`);
            slot.innerHTML = await response.text();

            const header = slot.querySelector('#header');
            slot.querySelector('[data-home-link]').href = `${homeUrl}#Inicio`;
            slot.querySelectorAll('[data-section]').forEach(link => {
                link.href = `${homeUrl}#${link.dataset.section}`;
            });
            if (!isHome) header.classList.add('scrolled');

            const hamburger = header.querySelector('#hamburger');
            const navMenu = header.querySelector('#nav-menu');
            hamburger.addEventListener('click', () => {
                const active = navMenu.classList.toggle('active');
                hamburger.classList.toggle('active', active);
                hamburger.setAttribute('aria-expanded', String(active));
                document.body.style.overflow = active ? 'hidden' : '';
            });
            navMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }));

            if (isHome) {
                const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 50);
                updateHeader();
                window.addEventListener('scroll', updateHeader, { passive: true });
            }
            document.dispatchEvent(new CustomEvent('header:ready', { detail: { header, isHome } }));
        } catch (error) {
            console.error('Error al cargar la cabecera:', error);
        }
    };

    window.loadHeader();
})();
