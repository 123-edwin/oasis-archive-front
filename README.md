# 🎸 Oasis Archive — Front-End

Una aplicación web dedicada a documentar y celebrar la discografía de Oasis. Busca canciones, crea y comparte reseñas, gestiona tus favoritos y explora la historia de la banda.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000?logo=vercel&logoColor=white)

## ✨ Características

- **Búsqueda de canciones** — Encuentra tracks de Oasis con búsqueda en tiempo real (debounce de 600 ms).
- **Feed de reseñas** — Lee y publica reseñas con sistema de calificación por estrellas (1-5).
- **Favoritos** — Guarda tus canciones favoritas en una colección personal.
- **Sobre Oasis** — Timeline, alineaciones, discografía esencial y equipo de la banda.
- **Autenticación** — Registro e inicio de sesión con tokens persistentes.
- **Links a Spotify** — Acceso directo a las canciones desde cada reseña.

## 🛠️ Tech Stack

| Categoría | Tecnología |
|---|---|
| Framework | React 19 + Vite 8 |
| Estilos | Tailwind CSS v4 |
| Routing | React Router DOM v7 |
| HTTP | Axios (interceptor de auth) |
| Íconos | Lucide React |
| Notificaciones | React Toastify |
| Optimización | React Compiler |

## 📁 Estructura del proyecto

```
src/
├── api/           # Instancia de Axios con interceptor de autenticación
├── components/    # Componentes reutilizables (Navbar, TrackCard, EntryCard, etc.)
├── context/       # AuthContext — estado global de autenticación
├── data/          # Datos estáticos de la banda (timeline, lineup, discografía)
├── hooks/         # Custom hooks (useDebounce)
├── pages/         # Vistas principales (Search, Feed, Favorites, About, Login, Register)
└── assets/        # Videos de fondo, favicon
```

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/oasis-archive-front.git
cd oasis-archive-front

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Iniciar en modo desarrollo
npm run dev
```

## ⚙️ Variables de entorno

```env
VITE_API_URL=http://localhost:3000/api
```

## 📜 Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo con HMR |
| `npm run build` | Build de producción |
| `npm run preview` | Preview del build local |
| `npm run lint` | Análisis estático con ESLint |

## 🔗 API

El front se conecta a una API REST con los siguientes endpoints principales:

- `POST /auth/login` — Autenticación
- `GET /auth/me` — Usuario actual
- `GET /entries` — Reseñas de la comunidad
- `GET /entries/search?q=...` — Búsqueda de canciones
- `POST /entries` — Crear reseña
- `GET /favorites` — Favoritos del usuario
- `POST /favorites` — Agregar a favoritos

## 📄 Licencia

MIT
