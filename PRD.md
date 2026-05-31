# Product Magic Studio - Product Requirements Document (PRD)

## 1. Concept & Vision

**Product Magic Studio** es una herramienta SaaS que permite a usuarios sin conocimientos de diseño crear visualmente atractivos para sus productos automáticamente. Subes una foto de tu producto, seleccionas un estilo, y la aplicación genera múltiples diseños profesionalmente terminados listos para usar en redes sociales.

La experiencia debe sentirse como "magia": el usuario simplemente sube su producto y en segundos tiene diseños listos para publicar.

## 2. User Experience

### 2.1 User Flow

```
Landing Page → Registro/Login → Dashboard → Subir Producto → Seleccionar Estilo → Ver Diseños → Editar/Descargar
```

### 2.2 User Stories

#### Como visitante quiero...
- Ver qué es Product Magic Studio y sus beneficios en la landing page
- Ver los precios de los planes disponibles
- Ver ejemplos de diseños creados con la herramienta

#### Como usuario registrado quiero...
- Subir imágenes de mis productos
- Seleccionar estilos predeterminados para mis diseños
- Ver múltiples variaciones de diseño generadas automáticamente
- Editar los diseños (texto, colores, posición)
- Descargar mis diseños en alta calidad
- Guardar mis diseños para acceder después
- Gestionar mi cuenta y perfil

### 2.3 Pantallas Principales

#### Landing Page
- Hero section con CTA principal
- Sección de características/beneficios
- Galería de ejemplos de diseños
- Precios de planes
- Footer con información legal

#### Dashboard / Crear Diseño (Protegido)
- Paso 1: Upload de imagen del producto
- Paso 2: Selector de estilo/plantilla
- Paso 3: Galería de diseños generados
- Editor inline para personalizaciones menores

#### Catálogo
- Grid de diseños guardados por el usuario
- Filtros por tipo de diseño (Instagram, Story, Banner, etc.)
- Acciones: editar, descargar, eliminar

#### Mi Cuenta
- Editar perfil (nombre, avatar)
- Cambiar contraseña
- Ver historial de uso
- Gestión de suscripción

### 2.4 Estados de UI

- **Loading**: Spinner animado con mensaje contextual
- **Empty**: Ilustración + mensaje + CTA para acción
- **Error**: Mensaje claro con opción de reintentar
- **Success**: Confirmación visual con siguiente paso

## 3. Design Language

### 3.1 Estética
Minimalista, moderna,一点"creator economy" vibe. Inspiración: Canva, Figma, Notion.

### 3.2 Paleta de Colores
```
Primary:        #7C3AED (Violet-600)
Primary Dark:   #6D28D9 (Violet-700)
Secondary:      #EC4899 (Pink-500)
Accent:         #8B5CF6 (Violet-500)
Background:     #FFFFFF
Surface:        #F9FAFB (Gray-50)
Text Primary:   #111827 (Gray-900)
Text Secondary: #6B7280 (Gray-500)
Border:         #E5E7EB (Gray-200)
Success:        #10B981 (Green-500)
Error:          #EF4444 (Red-500)
```

### 3.3 Tipografía
- **Headings**: Inter (Google Fonts), Bold, tracking tight
- **Body**: Inter, Regular
- **Fallback**: system-ui, -apple-system, sans-serif

### 3.4 Sistema Espacial
Base unit: 4px. Espaciado en múltiplos: 4, 8, 12, 16, 24, 32, 48, 64, 96px

### 3.5 Sombras
```
sm:  0 1px 2px rgba(0,0,0,0.05)
md:  0 4px 6px -1px rgba(0,0,0,0.1)
lg:  0 10px 15px -3px rgba(0,0,0,0.1)
xl:  0 20px 25px -5px rgba(0,0,0,0.1)
```

### 3.6 Animaciones
- Transiciones: 150-300ms ease-out
- Micro-interacciones en botones y cards
- Skeleton loaders para contenido async

## 4. Tech Stack

### 4.1 Frontend
- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS 4
- **State**: React hooks + Context API
- **Auth**: Supabase Auth (email/password)
- **Icons**: Heroicons o Lucide React

### 4.2 Backend (Supabase)
- **Database**: PostgreSQL
- **Auth**: Supabase Auth
- **Storage**: Supabase Storage (product-images bucket)
- **API**: Supabase Data API (REST)

### 4.3 Database Schema

#### profiles
| Column     | Type      | Constraints          |
|------------|-----------|----------------------|
| id         | UUID      | PK, FK → auth.users  |
| email      | TEXT      | NOT NULL             |
| full_name  | TEXT      |                      |
| avatar_url | TEXT      |                      |
| created_at | TIMESTAMPTZ | DEFAULT NOW()      |
| updated_at | TIMESTAMPTZ | DEFAULT NOW()      |

#### product_images
| Column      | Type      | Constraints            |
|-------------|-----------|------------------------|
| id          | UUID      | PK, DEFAULT gen_uuid() |
| user_id     | UUID      | FK → profiles          |
| storage_path| TEXT      | NOT NULL               |
| file_name   | TEXT      | NOT NULL               |
| file_size   | INTEGER   |                       |
| mime_type   | TEXT      |                       |
| width       | INTEGER   |                       |
| height      | INTEGER   |                       |
| created_at  | TIMESTAMPTZ | DEFAULT NOW()        |

#### style_templates
| Column        | Type      | Constraints        |
|---------------|-----------|-------------------|
| id            | UUID      | PK                |
| name          | TEXT      | NOT NULL          |
| description   | TEXT      |                   |
| category      | TEXT      | NOT NULL          |
| gradient_start| TEXT      | NOT NULL (Tailwind class) |
| gradient_end  | TEXT      | NOT NULL (Tailwind class) |
| icon          | TEXT      |                   |
| is_active     | BOOLEAN   | DEFAULT true      |
| created_at    | TIMESTAMPTZ | DEFAULT NOW()   |

#### designs
| Column            | Type      | Constraints              |
|-------------------|-----------|--------------------------|
| id                | UUID      | PK                       |
| user_id           | UUID      | FK → profiles            |
| product_image_id  | UUID      | FK → product_images      |
| style_id          | UUID      | FK → style_templates     |
| title             | TEXT      |                          |
| design_type       | TEXT      | NOT NULL                 |
| gradient_start    | TEXT      | NOT NULL                 |
| gradient_end      | TEXT      | NOT NULL                 |
| customization_data| JSONB     |                          |
| status            | TEXT      | DEFAULT 'draft'          |
| created_at        | TIMESTAMPTZ | DEFAULT NOW()          |
| updated_at        | TIMESTAMPTZ | DEFAULT NOW()          |

### 4.4 Row Level Security

| Table             | SELECT          | INSERT          | UPDATE           | DELETE            |
|-------------------|-----------------|-----------------|------------------|-------------------|
| profiles          | owner           | owner           | owner            | -                 |
| product_images    | owner           | owner           | owner            | owner             |
| style_templates   | public          | authenticated   | admin only       | admin only       |
| designs           | owner           | owner           | owner            | owner             |

## 5. Funcionalidades Core

### 5.1 Autenticación
- [x] Registro con email + password
- [x] Login con email + password
- [x] Logout
- [x] Protección de rutas autenticadas
- [x] Auto-creación de profile en signup (trigger)

### 5.2 Gestión de Imágenes
- [x] Upload de imágenes (JPEG, PNG, WebP)
- [x] Límite de tamaño: 10MB
- [x] Almacenamiento en Supabase Storage
- [x] Registro de metadatos en BD

### 5.3 Generación de Diseños
- [ ] Aplicar estilo/gradiente a imagen del producto
- [ ] Generar múltiples variaciones
- [ ] Preview en tiempo real
- [ ] Tipos: Instagram Post, Story, Banner, Facebook, Twitter, Pinterest

### 5.4 Editor de Diseños
- [ ] Cambiar texto superpuesto
- [ ] Ajustar posición de imagen
- [ ] Modificar colores del gradiente
- [ ] Zoom de imagen
- [ ] Guardar cambios

### 5.5 Exportación
- [ ] Descargar en PNG (alta calidad)
- [ ] Descargar en JPEG (comprimido)
- [ ] Descargar en WebP

## 6. Funcionalidades Futuras (Roadmap)

### Fase 2
- [ ] Plantillas de texto predefinidas
- [ ] Subida multi-imagen (batch)
- [ ] Historial de versiones

### Fase 3
- [ ] Integración con Unsplash (imágenes stock)
- [ ] AI-powered style suggestions
- [ ] Brand kit (colores, fuentes de marca)

### Fase 4
- [ ] Integración con redes sociales (publish directo)
- [ ] Equipo/colaboración
- [ ] API pública

## 7. Pricing Model

### Free Tier
- 10 diseños/mes
- Tipos básicos (Instagram, Story)
- Marca de agua "Created with PMS"

### Pro Tier ($9.99/mes)
- 100 diseños/mes
- Todos los tipos de diseño
- Sin marca de agua
- Descargas en alta calidad
- Editor avanzado

### Enterprise ($29.99/mes)
- Diseños ilimitados
- Todo lo de Pro
- API access
- Soporte prioritario
- White-label option

## 8. Métricas de Éxito

- **Conversion**: Registro → Primer diseño < 5 min
- **Engagement**: > 3 diseños/mes por usuario activo
- **Retention**: > 30% usuarios regresan en 30 días
- **NPS**: > 40

## 9. Constraints & Assumptions

- Supabase Cloud (no self-hosted)
- single-tenant, multi-user
- No offline mode (requiere conexión)
- Imágenes max 10MB
- Formatos: JPEG, PNG, WebP
- Browser support: Chrome, Firefox, Safari, Edge (últimas 2 versiones)
- Mobile: Responsive, pero optimizado para desktop

## 10. Glossary

| Term | Definition |
|------|------------|
| PMS | Product Magic Studio |
| Design | Imagen final generada con estilo aplicado |
| Style Template | Predeterminación de gradiente + configuración |
| Product Image | Imagen original del producto subida por usuario |
| Customization Data | JSON con ajustes de posición, texto, etc. |
