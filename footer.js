(() => {
    const siteRoot = document.body.dataset.siteRoot || '';
    const isHome = !siteRoot && (/\/(?:index\.html)?$/.test(window.location.pathname));
    const homeUrl = isHome ? '' : `${siteRoot}index.html`;

    window.loadFooter = async () => {
        const slot = document.querySelector('[data-footer-slot]');
        if (!slot) return;

        try {
            const response = await fetch(`${siteRoot}footer.html`);
            if (!response.ok) throw new Error(`No se pudo cargar el pie de página (${response.status})`);
            slot.innerHTML = await response.text();

            slot.querySelector('[data-home-link]').href = `${homeUrl}#Inicio`;
            slot.querySelector('[data-footer-logo]').src = `${siteRoot}assets/branding/logo.webp`;
            slot.querySelectorAll('[data-section]').forEach(link => {
                link.href = `${homeUrl}#${link.dataset.section}`;
            });
            slot.querySelectorAll('.legal-link').forEach(link => {
                const type = link.dataset.modal;
                link.href = isHome ? `?legal=${type}#legal` : `${homeUrl}?legal=${type}#legal`;
            });
            const legalModal = document.getElementById('legal-modal');
            const legalType = new URLSearchParams(window.location.search).get('legal');
            const openLegalModal = type => {
                if (!legalModal || !['aviso', 'privacidad', 'cookies'].includes(type)) return;
                document.getElementById('modal-title').textContent = {
                    aviso: 'Aviso Legal',
                    privacidad: 'Política de Privacidad',
                    cookies: 'Política de Cookies'
                }[type];
                document.querySelectorAll('.legal-content').forEach(content => content.classList.remove('active'));
                document.getElementById(`content-${type}`)?.classList.add('active');
                legalModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            };
            if (isHome && legalType) openLegalModal(legalType);
            slot.querySelectorAll('.legal-link').forEach(link => link.addEventListener('click', event => {
                if (!isHome || !legalModal) return;
                event.preventDefault();
                openLegalModal(link.dataset.modal);
            }));
            document.dispatchEvent(new CustomEvent('footer:ready', { detail: { footer: slot.querySelector('footer') } }));
        } catch (error) {
            console.error('Error al cargar el pie de página:', error);
        }
    };

    window.loadFooter();
})();
