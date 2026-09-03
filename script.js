document.addEventListener('DOMContentLoaded', () => {
    // --- Header Effects & Sticky Nav ---
    const header = document.getElementById('header');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (header) {
        let lastScrollY = 0;
        let ticking = false;

        const updateHeader = () => {
            if (lastScrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            ticking = false;
        };

        // Initialize state without forcing reflow immediately
        requestAnimationFrame(() => {
            lastScrollY = window.scrollY;
            updateHeader();
        });

        window.addEventListener('scroll', () => {
            lastScrollY = window.scrollY;
            if (!ticking) {
                window.requestAnimationFrame(updateHeader);
                ticking = true;
            }
        }, { passive: true });
    }

    // --- Mobile Menu Toggle ---
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            const isActive = navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isActive);
            
            // Lock scroll when menu is open
            if (isActive) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Close menu when clicking a link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('active');
            if (hamburger) {
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
            document.body.style.overflow = 'auto';
        });
    });

    // --- Scroll Reveal Animation ---
    const revealOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);

    document.querySelectorAll('[data-reveal]').forEach(el => {
        revealObserver.observe(el);
    });

    // --- Hero Parallax Effect ---
    const heroBg = document.querySelector('.hero-bg img');
    if (heroBg) {
        let lastScrollY = 0;
        let ticking = false;

        const updateParallax = () => {
            // Use transform for compositor-only animation
            heroBg.style.transform = `translateY(${lastScrollY * 0.4}px)`;
            ticking = false;
        };

        // Initialize without immediate reflow
        requestAnimationFrame(() => {
            lastScrollY = window.scrollY;
            updateParallax();
        });

        window.addEventListener('scroll', () => {
            lastScrollY = window.scrollY;
            if (!ticking) {
                window.requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }, { passive: true });
    }

    // --- Smooth Scrolling for Navigation ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Batch reads to avoid multiple reflows
                const rect = targetElement.getBoundingClientRect();
                const headerHeight = header ? header.offsetHeight : 0;
                const currentScroll = window.scrollY;
                
                const offsetPosition = rect.top + currentScroll - (headerHeight - 20);

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Legal Modal Logic ---
    const legalModal = document.getElementById('legal-modal');
    const legalLinks = document.querySelectorAll('.legal-link');
    const closeModalBtn = document.getElementById('close-modal');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    const modalTitle = document.getElementById('modal-title');

    if (legalModal && legalLinks.length > 0) {
        legalLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const type = link.getAttribute('data-modal');
                
                // Set title
                if (type === 'aviso') modalTitle.textContent = 'Aviso Legal';
                if (type === 'privacidad') modalTitle.textContent = 'Política de Privacidad';
                if (type === 'cookies') modalTitle.textContent = 'Política de Cookies';

                // Toggle content
                document.querySelectorAll('.legal-content').forEach(content => {
                    content.classList.remove('active');
                });
                const targetContent = document.getElementById(`content-${type}`);
                if (targetContent) targetContent.classList.add('active');

                // Show modal
                legalModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        const closeModal = () => {
            legalModal.classList.remove('active');
            // Only restore scroll if mobile menu is NOT active
            if (!navMenu.classList.contains('active')) {
                document.body.style.overflow = 'auto';
            }
        };

        if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
        if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
        
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && legalModal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    // --- Lazy Load Map ---
    const lazyMap = document.querySelector('.lazy-map');
    if (lazyMap) {
        const mapObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const iframe = entry.target;
                    iframe.src = iframe.getAttribute('data-src');
                    iframe.removeAttribute('data-src');
                    iframe.style.background = 'none'; // Remove spinner once loading starts
                    mapObserver.unobserve(iframe);
                    console.log('Google Maps loaded on demand');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px 300px 0px' }); // Start loading 300px before it enters

        mapObserver.observe(lazyMap);
    }

});
