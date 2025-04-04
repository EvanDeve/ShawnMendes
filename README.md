# Shawn Mendes - Fanpage Costa Rica

Este proyecto es una fanpage dedicada a Shawn Mendes para sus seguidores en Costa Rica, desarrollada con HTML, CSS y JavaScript.

## Características

- Diseño moderno y responsivo basado en un boceto de Figma
- Sección de héroe con imagen principal
- Sección "Quiénes Somos" con información sobre el fanclub
- Galería de imágenes con animaciones
- Sección de próximos eventos con administración mediante Netlify CMS
- Navegación suave entre secciones
- Efecto de scroll en la barra de navegación

## Estructura de archivos

```
├── index.html                # Archivo HTML principal
├── styles.css                # Estilos CSS
├── script.js                 # Funcionalidades JavaScript
├── js/                       # Carpeta de scripts adicionales
│   └── eventos.js            # Script para cargar eventos
├── img/                      # Carpeta de imágenes
├── admin/                    # Carpeta de Netlify CMS
│   ├── index.html            # Página principal del CMS
│   └── config.yml            # Configuración del CMS
├── _eventos/                 # Carpeta de eventos (contenido administrado)
├── _data/                    # Carpeta de datos (configuración administrada)
├── api/                      # API estático generado
│   └── eventos.json          # Listado de eventos en formato JSON
├── build-api.js              # Script para construir el API
├── netlify.toml              # Configuración de Netlify
└── package.json              # Configuración del proyecto
```

## Requisitos para desarrollo

- Node.js 14 o superior
- NPM o Yarn
- Cuenta en Netlify para despliegue

## Cómo instalar y ejecutar

1. Clona este repositorio
2. Instala las dependencias: `npm install`
3. Ejecuta el servidor de desarrollo: `npm run dev`
4. Abre http://localhost:3000 en tu navegador

## Despliegue en Netlify

1. Crea una cuenta en [Netlify](https://www.netlify.com/)
2. Conecta tu repositorio de GitHub/GitLab/Bitbucket
3. Configura la compilación:
   - Build command: `npm run build`
   - Publish directory: `.`
4. Habilita Netlify Identity para el CMS:
   - Ve a "Site settings" > "Identity" y habilita el servicio
   - En "Registration", selecciona "Invite only"
   - En "Services" > "Git Gateway", habilita el servicio

## Gestión de contenido con Netlify CMS

Una vez desplegado el sitio:

1. Ve a `tu-sitio.netlify.app/admin`
2. Inicia sesión con tu cuenta de Netlify Identity
3. Desde el panel de administración puedes:
   - Crear, editar y eliminar eventos
   - Modificar la información general del sitio
   - Gestionar los enlaces a redes sociales

### Cómo añadir un nuevo evento

1. En el panel de administración, ve a "Eventos" y haz clic en "New Eventos"
2. Completa la información del evento:
   - Título: Nombre del evento
   - Fecha: Cuándo se realizará
   - Ubicación: Dónde se llevará a cabo
   - Descripción: Detalles del evento
   - Imagen (opcional): Una imagen representativa
   - Enlace de registro (opcional): URL para inscribirse
   - Destacado: Si debe aparecer destacado en la página
3. Guarda los cambios

Los eventos se ordenarán automáticamente por fecha, mostrando primero los próximos eventos.

## Créditos

Diseño inspirado en el boceto de Figma proporcionado, desarrollado con HTML, CSS y JavaScript vanilla. 