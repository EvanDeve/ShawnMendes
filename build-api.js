const fs = require('fs-extra');
const path = require('path');
const matter = require('gray-matter');

// Directorio donde se almacenan los archivos markdown de eventos
const eventosDir = path.join(__dirname, '_eventos');
// Directorio donde se generará el archivo JSON del API
const apiDir = path.join(__dirname, 'api');

// Función principal
async function buildApi() {
  console.log('🔨 Construyendo API estático...');
  
  try {
    // Asegurarse de que existe el directorio de API
    await fs.ensureDir(apiDir);
    
    // Procesar eventos
    const eventos = await processEventos();
    
    // Escribir el archivo JSON con todos los eventos
    await fs.writeJSON(path.join(apiDir, 'eventos.json'), eventos, { spaces: 2 });
    
    console.log('✅ API generado correctamente!');
  } catch (error) {
    console.error('❌ Error al generar el API:', error);
    process.exit(1);
  }
}

// Procesar los archivos de eventos
async function processEventos() {
  try {
    // Verificar si existe el directorio de eventos
    if (!await fs.pathExists(eventosDir)) {
      console.log('ℹ️ No existe el directorio de eventos, se creará uno vacío');
      await fs.ensureDir(eventosDir);
      return [];
    }
    
    // Leer todos los archivos markdown en el directorio de eventos
    const files = await fs.readdir(eventosDir);
    const markdownFiles = files.filter(file => file.endsWith('.md') || file.endsWith('.markdown'));
    
    // Si no hay archivos, devolver un array vacío
    if (markdownFiles.length === 0) {
      console.log('ℹ️ No hay archivos de eventos para procesar');
      return [];
    }
    
    // Procesar cada archivo markdown
    const eventos = await Promise.all(markdownFiles.map(async (file) => {
      const filePath = path.join(eventosDir, file);
      const content = await fs.readFile(filePath, 'utf8');
      
      // Extraer el frontmatter y el contenido
      const { data, content: markdown } = matter(content);
      
      // Crear un objeto con los datos del evento
      return {
        ...data,
        slug: file.replace(/\.md$|\.markdown$/, ''),
        content: markdown,
      };
    }));
    
    console.log(`📝 Procesados ${eventos.length} eventos`);
    return eventos;
  } catch (error) {
    console.error('Error al procesar eventos:', error);
    return [];
  }
}

// Ejecutar la función principal
buildApi(); 