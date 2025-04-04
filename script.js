// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const header = document.querySelector('header');
    const menuLinks = document.querySelectorAll('.menu a');
    
    // Función para manejar el scroll y cambiar la apariencia del header
    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Agregar evento de scroll
    window.addEventListener('scroll', handleScroll);
    
    // Llamar a handleScroll inicialmente para configurar el estado correcto en la carga
    handleScroll();
    
    // Navegación suave al hacer clic en los enlaces del menú
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Animación para la galería de imágenes
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        // Aplicar un pequeño retraso a cada imagen para un efecto escalonado
        item.style.animationDelay = `${index * 0.2}s`;
        
        // Añadir clase para iniciar la animación después de un pequeño retraso
        setTimeout(() => {
            item.classList.add('animate');
        }, 500 + (index * 200));
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
    
    // Actualizar el año en el footer
    updateFooterYear();
}); 