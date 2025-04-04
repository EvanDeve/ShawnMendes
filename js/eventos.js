// Función para cargar los eventos
async function cargarEventos() {
    try {
        // Intentar cargar el listado de eventos
        const response = await fetch('/api/eventos.json');
        if (!response.ok) {
            throw new Error('No se pudieron cargar los eventos');
        }
        
        const eventos = await response.json();
        
        // Ordenar eventos por fecha (los más recientes primero)
        eventos.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Mostrar solo eventos futuros o recientes (últimos 30 días)
        const ahora = new Date();
        const eventosRecientes = eventos.filter(evento => {
            const fechaEvento = new Date(evento.date);
            const diferenciaDias = Math.floor((fechaEvento - ahora) / (1000 * 60 * 60 * 24));
            
            // Mostrar eventos futuros o hasta 30 días en el pasado
            return diferenciaDias > -30;
        });
        
        // Obtener el contenedor donde mostraremos los eventos
        const contenedorEventos = document.querySelector('.events-grid');
        if (!contenedorEventos) return;
        
        // Limpiar contenedor
        contenedorEventos.innerHTML = '';
        
        // Si no hay eventos, mostrar mensaje
        if (eventosRecientes.length === 0) {
            contenedorEventos.innerHTML = `
                <div class="no-events">
                    <p>No hay eventos programados por el momento. ¡Vuelve pronto para ver las novedades!</p>
                </div>
            `;
            return;
        }
        
        // Añadir cada evento al contenedor
        eventosRecientes.forEach(evento => {
            const fecha = new Date(evento.date);
            const dia = fecha.getDate();
            const mes = fecha.toLocaleString('es', { month: 'short' }).toUpperCase();
            
            contenedorEventos.innerHTML += `
                <div class="event-card">
                    <div class="event-date">
                        <span class="day">${dia}</span>
                        <span class="month">${mes}</span>
                    </div>
                    <div class="event-info">
                        <h3>${evento.title}</h3>
                        <p>${evento.location}</p>
                        <p class="event-description">${evento.description}</p>
                        ${evento.registrationLink ? `<a href="${evento.registrationLink}" class="event-link" target="_blank">Más información</a>` : ''}
                    </div>
                </div>
            `;
        });
        
    } catch (error) {
        console.error('Error al cargar eventos:', error);
        
        // En caso de error, mostrar los eventos estáticos (como respaldo)
        const contenedorEventos = document.querySelector('.events-grid');
        if (!contenedorEventos) return;
        
        // No borrar el contenido existente si hay un error
    }
}

// Cargar eventos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', cargarEventos); 