// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const header = document.querySelector('header');
    const menuLinks = document.querySelectorAll('.menu a');
    const desktopMenuLinks = document.querySelectorAll('.desktop-menu a');
    const sections = document.querySelectorAll('section');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const menuToggle = document.querySelector('.menu-toggle');
    const menuContainer = document.querySelector('.menu-container');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    // Función para manejar el toggle del menú móvil
    function toggleMobileMenu() {
        menuToggle.classList.toggle('active');
        menuContainer.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }
    
    // Agregar evento al botón del menú
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Cerrar menú al hacer clic en overlay
    if (menuOverlay) {
        menuOverlay.addEventListener('click', toggleMobileMenu);
    }
    
    // Cerrar menú al hacer clic en un enlace
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (menuContainer.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
    
    // Función para manejar el scroll y cambiar la apariencia del header
    function handleScroll() {
        const scrollPosition = window.scrollY;
        
        // Cambiar estilo del header al hacer scroll
        if (scrollPosition > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Activar menú según la posición del scroll
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Activar en menú mobile
                menuLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
                
                // Activar en menú desktop
                desktopMenuLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
        
        // Animación de aparición de elementos al hacer scroll
        animateOnScroll();
    }
    
    // Función para animar elementos cuando son visibles
    function animateOnScroll() {
        const triggerBottom = window.innerHeight * 0.8;
        
        galleryItems.forEach((item, index) => {
            const itemTop = item.getBoundingClientRect().top;
            
            if (itemTop < triggerBottom) {
                // Retraso escalonado para cada elemento
                setTimeout(() => {
                    item.classList.add('animate');
                }, index * 150);
            }
        });
    }
    
    // Agregar evento de scroll
    window.addEventListener('scroll', handleScroll);
    
    // Llamar a handleScroll inicialmente para configurar el estado correcto
    handleScroll();
    
    // Función para navegación suave
    function smoothScroll(targetId) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Animación suave con easing
            const startPosition = window.pageYOffset;
            const targetPosition = targetElement.offsetTop - 70;
            const distance = targetPosition - startPosition;
            const duration = 1000;
            let start = null;
            
            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const run = ease(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }
            
            // Función de easing (suavizado)
            function ease(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }
            
            requestAnimationFrame(animation);
        }
    }
    
    // Navegación suave al hacer clic en los enlaces del menú
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                smoothScroll(targetId);
            }
        });
    });
    
    // Navegación suave para menú desktop
    desktopMenuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                smoothScroll(targetId);
            }
        });
    });
    
    // Función para mostrar la fecha actualizada en el footer
    function updateFooterYear() {
        const yearSpan = document.createElement('span');
        yearSpan.textContent = new Date().getFullYear();
        
        const copyrightText = document.querySelector('.footer-bottom p');
        if (copyrightText) {
            copyrightText.innerHTML = copyrightText.innerHTML.replace('2023', yearSpan.textContent);
        }
    }
    
    // Función para ajustar el diseño en dispositivos móviles
    function handleResize() {
        const windowWidth = window.innerWidth;
        
        // Ajustar la altura de la galería en dispositivos móviles
        if (windowWidth <= 576) {
            galleryItems.forEach(item => {
                item.style.height = '250px';
            });
        } else if (windowWidth <= 768) {
            galleryItems.forEach(item => {
                item.style.height = '300px';
            });
        } else {
            galleryItems.forEach(item => {
                item.style.height = '350px';
            });
        }
    }
    
    // Agregar evento de resize
    window.addEventListener('resize', handleResize);
    
    // Llamar a handleResize inicialmente
    handleResize();
    
    // Mostrar una notificación de bienvenida
    function showWelcomeMessage() {
        const messageContainer = document.createElement('div');
        messageContainer.className = 'welcome-message';
        messageContainer.innerHTML = `
            <div class="welcome-content">
                <h3>¡Bienvenido al Fan Club de Shawn Mendes!</h3>
                <p>Mantente al día con las últimas noticias y eventos.</p>
                <button class="welcome-close">Entendido</button>
            </div>
        `;
        
        document.body.appendChild(messageContainer);
        
        // Agregar animación de entrada
        setTimeout(() => {
            messageContainer.classList.add('visible');
        }, 1500);
        
        // Cerrar el mensaje
        const closeButton = messageContainer.querySelector('.welcome-close');
        closeButton.addEventListener('click', () => {
            messageContainer.classList.remove('visible');
            setTimeout(() => {
                messageContainer.remove();
            }, 500);
        });
        
        // Cerrar automáticamente después de 8 segundos
        setTimeout(() => {
            if (document.body.contains(messageContainer)) {
                messageContainer.classList.remove('visible');
                setTimeout(() => {
                    messageContainer.remove();
                }, 500);
            }
        }, 8000);
    }
    
    // Efectos de hover en imágenes de la galería
    galleryItems.forEach(item => {
        const img = item.querySelector('img');
        
        item.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.05)';
        });
        
        item.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
        });
    });
    
    // Actualizar el año en el footer
    updateFooterYear();
    
    // Mostrar mensaje de bienvenida con retraso
    setTimeout(showWelcomeMessage, 1000);
}); 