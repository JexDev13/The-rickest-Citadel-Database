# The Rickest Citadel Database - Prueba Técnica: Generador de Documentación Interactiva Kushki

Una aplicación web interactiva que consume la [Rick and Morty API](https://rickandmortyapi.com/) para explorar el universo de Rick y Morty, con generación de resúmenes de personajes potenciados por IA.

## 🚀 Features

- **Búsqueda**: Busca personajes por ID o nombre
- **Ordenamiento**: Organiza los resultados alfabéticamente (A-Z) o numéricamente (0-9)
- **Historial de Recién Vistos**: Mantén un registro de los últimos personajes consultados
- **Generador de Resumen con IA**: Genera descripciones narrativas de personajes usando Google Gemini AI
- **Interfaz Temática**: Diseño inspirado en la estética visual de Rick y Morty

## 🛠️ Tecnologías y Decisiones Arquitectónicas

### ¿Qué framework o librería usaste y por qué?

#### Framework: Next.js 16
Elegí **Next.js** porque es un framework moderno de React que ofrece optimizaciones de rendimiento de forma nativa. Además, al revisar la documentación de Kushki, noté que está realizada en React, por lo que Next.js, al tener su base en React, me pareció la elección más apropiada. Next.js también permite crear interfaces atractivas y funcionales.

#### Librerías principales:

- **React 19**: La librería base para construir componentes de UI reutilizables y mantener un estado de aplicación controlable.

- **@google/generative-ai**: Integración con Google Gemini para generar resúmenes creativos de los personajes, agregando valor a la experiencia de usuario más allá de simplemente consultar datos de la API, se realizó utilizando el modelo de **`google-gemini-flash-3.5`**: en su versión gratuita.

- **TypeScript**: Para garantizar la seguridad de tipos en toda la aplicación, reducir errores en tiempo de desarrollo y mejorar la mantenibilidad del código.

### 🎯 Optimización de Rendimiento: Lazy Loading, Partial Hydration y Async/Await

Al tratarse principalmente de contenido estático (datos de personajes que no cambian frecuentemente), implementé estrategias para mejorar el rendimiento y reducir el tiempo de acceso a la información:

#### React Server Components (RSC)
- **`app/page.tsx`** y **`app/character/[id]/page.tsx`**: Estos son React Server Components que utilizan `async`/`await` para obtener datos directamente en el servidor antes de enviar HTML al cliente. Esto reduce el JavaScript necesario y le da al cliente una experiencia de usuario mas fluida.

#### Partial Hydration
La aplicación separa los componentes estáticos de los interactivos:

- **Server Components** (renderizado solo en servidor): `page.tsx`, `character/[id]/page.tsx`
- **Client Components** (hidratados en el cliente): `HomeClient.tsx`, `SearchBar.tsx`, `ToggleGroup.tsx`, `HistoryPanel.tsx`

Solo los componentes que requieren interactividad (búsqueda, ordenamiento, historial) se hidratan en el cliente, mientras que el contenido estático permanece como HTML puro. Esto reduce el bundle de JavaScript enviado al navegador.

#### División automática de código
Next.js divide automáticamente el código por rutas, cargando solo el JavaScript necesario para cada página. Al navegar entre personajes, el código se carga de forma diferida, optimizando el rendimiento.

### 🏗️ SSG (Static Site Generation)

Al tratarse de una aplicación de documentación/consulta de personajes, enfoqué la estrategia hacia **SSG (Static Site Generation)** para aprovechar las herramientas propias de Next.js que optimizan la carga estática de elementos y la hidratación de componentes.

- Las páginas se prerenderizan en tiempo de build cuando es posible
- Los datos de la API de Rick y Morty son relativamente estáticos (los datos de los personajes no cambian a excepción del resumen generado con IA en la que el usuario tiene el poder se genera su resumen tantas veces como decida y este dato debe verse dinámicamente en pantalla sin recargar toda la pantalla solo el componente necesario.)

#### Escalabilidad para tráfico masivo:
Esta arquitectura permite que la aplicación escale horizontalmente sin problemas:
- **Menor carga en servidor**: No hay procesamiento en cada request
- **Rendimiento predecible**: Sin importar el tráfico, las páginas estáticas se sirven a la misma velocidad

En el contexto de la API de Rick y Morty, donde los datos no cambian constantemente, SSG es la estrategia perfecta para manejar tráfico masivo de fans consultando sus personajes favoritos simultáneamente.

### 🎨 Experiencia de Usuario y Diseño

En las decisiones arquitectónicas también quise incluir la experiencia de usuario. Al tratarse de una aplicación para consultar la API de Rick y Morty, quise darle la vibra característica de la serie. Por eso, diseñé una paleta de colores que evoca el estilo visual de Rick y Morty (verdes, azules neón, y tonos oscuros espaciales) y configuré la IA para generar resúmenes con un tono narrativo que encaja con el universo de la serie, en la que la IA adopta la personalidad de Rick para generar los resúmenes de los personajes y la relación con los mismos dese su perspectiva.

### 📁 Arquitectura del Proyecto

```
prueba_kushki/
├── app/                          # App Router de Next.js
│   ├── api/                      # API Routes
│   │   └── characters/           # Endpoints de personajes
│   │       ├── route.ts          # GET todos los personajes
│   │       └── [id]/route.ts     # GET personaje por ID
│   ├── character/                # Rutas dinámicas de personajes
│   │   └── [id]/page.tsx         # Página individual de personaje
│   ├── components/               # Componentes reutilizables
│   │   ├── CharacterCard.tsx     # Tarjeta de personaje
│   │   ├── SearchBar.tsx         # Barra de búsqueda
│   │   ├── ToggleGroup.tsx       # Botones de ordenamiento
│   │   └── ErrorDisplay.tsx      # Manejo de errores
│   ├── pages/                    # Componentes de página compuestos
│   │   ├── MainContent.tsx       # Contenido principal (grilla)
│   │   ├── HistoryPanel.tsx      # Panel de historial
│   │   └── SingleCharacter.tsx   # Vista detallada de personaje
│   ├── types/                    # Definiciones de TypeScript
│   │   └── character.ts          # Interfaces de datos de los personajes
│   ├── page.tsx                  # Página principal (SSG)
│   └── layout.tsx                # Layout raíz
├── lib/                          # Lógica de negocio y servicios
│   ├── characterService.ts       # Servicio para API de Rick and Morty
│   ├── geminiService.ts          # Servicio para Google Gemini AI
│   └── prompts.ts                # Prompts para generación de IA
└── public/                       # Archivos estáticos
```

Esta estructura separa las responsabilidades:
- **`app/`**: Rutas y componentes de UI
- **`lib/`**: Lógica de negocio y servicios externos
- **`types/`**: Contratos de datos con TypeScript

## 📋 Guía de Implementación

### Cómo ejecutar el proyecto localmente

1. **Clona el repositorio** (o descarga el proyecto)

2. **Instala las dependencias**:
   ```bash
   npm install
   ```
    ```bash
   npm install @google/generative-ai
   ```

3. **Obtén tu API Key de Gemini**:
   
   Para habilitar las funciones de IA en la aplicación, necesitas una API key de Google Gemini:
   
   1. Ve a [Google AI Studio](https://makersuite.google.com/app/apikey)
   2. Inicia sesión con tu cuenta de Google
   3. Haz clic en el botón **"Create API Key"** o **"Get API Key"**
   4. Selecciona un proyecto de Google Cloud existente o crea uno nuevo
   5. Copia la API key generada (guárdala en un lugar seguro, la necesitarás en el siguiente paso)
   
   **⚠️ Importante**: Nunca compartas tu API key públicamente ni la subas a repositorios.

4. **Configura el archivo `.env.local`**:
   
   - Crea un archivo `.env.local` en la raíz del proyecto
   - Agrega las siguientes variables de entorno con sus valores:
   
   ```env
   API_BASE_URL=https://rickandmortyapi.com/api/
   HISTORY_STORAGE_KEY=rickmorty_history
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
   
   - Reemplaza `your_gemini_api_key_here` con la API key que obtuviste en el paso anterior
   
   **Descripción de las variables**:
   - `API_BASE_URL`: Define la dirección base para las peticiones de datos de la serie (personajes, locaciones, etc.).
   - `HISTORY_STORAGE_KEY`: Es la llave utilizada para guardar y gestionar el historial de navegación.
   - `GEMINI_API_KEY`: Es la credencial necesaria para habilitar las funciones de inteligencia artificial dentro de la base de datos de la Ciudadela.

   **⚠️ Importante**: Las variables `API_BASE_URL` y `HISTORY_STORAGE_KEY` no deben alterarse, ya que se usan internamente para el correcto funcionamiento de la aplicación.

   **⚠️ Importante**: Nunca subas tu archivo `.env.local` a un repositorio público.

5. **Ejecuta el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

## 🌐 Acceder desde CodeSandbox

Puedes importar y ejecutar este proyecto directamente en CodeSandbox:

1. Ve a [CodeSandbox](https://codesandbox.io/)
2. Haz clic en "Import from GitHub" o "Create Sandbox"
3. Si el proyecto está en GitHub, pega la URL del repositorio
4. CodeSandbox detectará automáticamente que es un proyecto Next.js
5. Configura las variables de entorno:
   - Ve a "Server Control Panel" en la barra lateral
   - Añade `NEXT_PUBLIC_GEMINI_API_KEY` con tu API key
6. El proyecto se ejecutará automáticamente

**Nota**: Asegúrate de configurar la variable de entorno `NEXT_PUBLIC_GEMINI_API_KEY` en la configuración del sandbox para que la funcionalidad de IA funcione correctamente.

## 🚀 Build para Producción

```bash
npm run build
npm start
```

## 📝 Licencia

Este proyecto fue creado como prueba técnica para Kushki, desarrollado por Jeremy Arias.
