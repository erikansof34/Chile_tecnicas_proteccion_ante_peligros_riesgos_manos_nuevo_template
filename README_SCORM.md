# Sistema de Empaquetado SCORM

Este sistema permite generar paquetes SCORM compatibles con Moodle a partir de las lecciones del curso de Orientación y Prevención de Riesgos DS 44.

## 📁 Estructura del Proyecto

```
/
├── assets/                 # Recursos globales (audio, imágenes, etc.)
├── plugins/               # Librerías CSS/JS globales
├── module/                # Lecciones del curso
│   ├── leccion1/
│   ├── leccion2/
│   └── leccion3/
├── wrappers/              # Plantillas SCORM
│   ├── scorm/            # Para lecciones individuales
│   └── unificado/        # Para curso completo
├── dist/                  # Salida de empaquetado (generado)
├── build.js              # Script de construcción
└── *.zip                 # Paquetes SCORM generados
```

## 🚀 Instalación

### Requisitos Previos
- Node.js (versión 14 o superior)
- npm (incluido con Node.js)

### Instalar Dependencias

1. Abrir PowerShell o terminal en la carpeta del proyecto

2. Instalar dependencias de Node.js:
```bash
npm install
```

Esto instalará:
- `fs-extra` - Para operaciones de archivos mejoradas
- `archiver` - Para crear archivos ZIP
- `animate.css` - Librería de animaciones CSS

3. Verificar instalación:
```bash
node build.js help
```

Si ve el menú de ayuda, la instalación fue exitosa.

## 📦 Uso del Sistema

### Empaquetar una Lección Específica

```bash
# Empaquetar Lección 1
node build.js leccion1

# Empaquetar Lección 2  
node build.js leccion2

# Empaquetar Lección 3
node build.js leccion3
```

### Empaquetar Página de Inicio 

```bash
# Empaquetar página de inicio con guía del usuario
node build.js inicio
```

### Empaquetar Curso Completo

```bash
node build.js unificado
```

### Ver Ayuda

```bash
node build.js help
```

## 📋 Qué Genera el Sistema

### Para Lecciones Individuales:
- **Directorio `/dist`** con:
  - `index.html` (wrapper SCORM)
  - `config.js` (configuración específica de la lección)
  - `imsmanifest.xml` (manifest SCORM 1.2)
  - `assets/` (todos los recursos globales)
  - `plugins/` (librerías CSS/JS)
  - `module/leccionX/` (solo la lección seleccionada)

- **Archivo ZIP**: `leccionX_scorm.zip` listo para subir a Moodle

### Para Página de Inicio (NUEVO):
- **Directorio `/dist`** con:
  - `index.html` (página principal con redirección automática)
  - `module/inicio/inicio.html` (guía del usuario, objetivos, glosario)
  - `imsmanifest.xml` (manifest SCORM 1.2 para inicio)
  - `assets/` (todos los recursos globales)
  - `plugins/` (librerías CSS/JS)

- **Archivo ZIP**: `inicio_scorm.zip` listo para subir a Moodle
- **Funcionalidad**: Al cargar en Moodle, muestra la página de inicio que redirige automáticamente a `module/inicio/` con la guía del usuario

### Para Curso Completo:
- **Directorio `/dist`** con:
  - `index.html` (menú de navegación entre lecciones)
  - `imsmanifest.xml` (manifest para curso completo)
  - `assets/` (todos los recursos globales)
  - `plugins/` (librerías CSS/JS)
  - `module/` (todas las lecciones y módulos)

- **Archivo ZIP**: `curso_completo_scorm.zip`

## ⚙️ Funcionalidades SCORM

### Compatibilidad
- **SCORM 1.2** (compatible con Moodle y la mayoría de LMS)
- API SCORM básica implementada
- Tracking de progreso preparado para futuras mejoras

### Características Actuales
- ✅ Empaquetado automático de recursos
- ✅ Generación dinámica de `imsmanifest.xml`
- ✅ Wrapper HTML para integración SCORM
- ✅ Configuración específica por lección
- ✅ Compresión ZIP lista para LMS

### Preparado para Futuro
- 🔄 Tracking de progreso avanzado
- 🔄 Puntuaciones y completado
- 🔄 Comunicación bidireccional con LMS

## 🛠️ Archivos Clave

### `/wrappers/scorm/index.html`
Wrapper principal para lecciones individuales. Contiene:
- API SCORM básica
- Carga dinámica de la lección configurada
- Interface limpia para el LMS

### `/wrappers/scorm/config.js`
Configuración que se actualiza automáticamente durante el build:
- Ruta de la lección
- Título y descripción
- Versión SCORM

### `/wrappers/unificado/index.html`
Página de inicio para el curso completo:
- Menú visual de lecciones
- Navegación entre módulos
- Diseño responsive

### `/build.js`
Script principal de construcción:
- Copia selectiva de archivos
- Generación de manifests
- Creación de ZIPs
- Validación de lecciones

## 📝 Personalización

### Agregar Nueva Lección
1. Editar `LESSONS_INFO` en `build.js`:
```javascript
const LESSONS_INFO = {
    'leccion4': {
        title: 'Lección 4: Nuevo Tema',
        description: 'Descripción de la nueva lección'
    }
};
```

2. Crear directorio `/module/leccion4/` con `index.html`

### Personalizar Página de Inicio
Para modificar la página de inicio:
1. **Editar `/index.html`**: Página principal con video y botón "Iniciar"
2. **Editar `/module/inicio/inicio.html`**: Guía del usuario, objetivos, glosario
3. **Modificar estilos**: `/plugins/css/inicio.css` y `/plugins/css/sofactia.css`
4. **Regenerar**: `node build.js inicio`

### Modificar Información del Curso
Editar las constantes en `build.js`:
- Títulos de lecciones
- Descripciones  
- Rutas de archivos

## 🔧 Troubleshooting

### Error: "Lección no existe"
- **Para lecciones**: Verificar que existe `/module/leccionX/index.html`
- **Para inicio**: Verificar que existe `/module/inicio/inicio.html`
- Comprobar que el nombre coincide exactamente

### Error: "No se puede crear ZIP"
- Verificar permisos de escritura
- Cerrar archivos ZIP abiertos
- Liberar espacio en disco

### Problemas en Moodle
- Verificar que el ZIP no esté corrupto
- Asegurar que `imsmanifest.xml` está en la raíz
- Comprobar rutas relativas en el manifest

## 📊 Logs de Build

El sistema muestra información detallada durante la construcción:
```
🚀 Iniciando build para: leccion1
==================================================

📁 Copiando archivos globales...
✓ Copiado: assets → dist/assets
✓ Copiado: plugins → dist/plugins

📚 Copiando lección...
✓ Copiado: module/leccion1 → dist/module/leccion1

⚙️ Configurando wrapper SCORM...
✓ Archivo config.js generado

📋 Generando imsmanifest.xml...
✓ imsmanifest.xml generado

📦 Creando paquete ZIP...
✓ ZIP creado: leccion1_scorm.zip (2.5 MB)

✅ Build completado exitosamente!
```

### Ejemplo de Build para Página de Inicio:
```
🚀 Iniciando build para: PÁGINA DE INICIO
==================================================

📁 Copiando archivos globales...
✓ Copiado: assets → dist/assets
✓ Copiado: plugins → dist/plugins

📄 Copiando index.html principal...
✓ Copiado: index.html → dist/index.html

📚 Copiando módulo de inicio...
✓ Copiado: module/inicio → dist/module/inicio

📋 Generando imsmanifest.xml...
✓ imsmanifest.xml generado

📦 Creando paquete ZIP...
✓ ZIP creado: inicio_scorm.zip (43.4 MB)

✅ Build completado exitosamente!
📝 Contenido del paquete:
  - index.html (página principal con redirección)
  - module/inicio/inicio.html (guía del usuario)
  - assets/ (recursos globales)
  - plugins/ (librerías CSS/JS)
  - imsmanifest.xml (configuración SCORM)
```

## 📞 Soporte

Para problemas o mejoras, revisar:
1. Logs de construcción
2. Estructura de archivos generados
3. Contenido del `imsmanifest.xml`
4. Configuración SCORM en el LMS

