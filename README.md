# 🎬 MovieApp Frontend – (Angular 20 Standalone)

Aplicación frontend desarrollada con **Angular 20** en modo **standalone**, como parte de una prueba técnica. Permite a los usuarios registrarse, iniciar sesión, buscar películas usando la OMDb API (vía backend propio en NestJS), guardar favoritas y calificarlas.

Utilicé Angular 20 sin NgModules para aprovechar la nueva arquitectura más modular, ligera y moderna.

Para mostrar notificaciones visuales amigables al usuario, utilicé SweetAlert2 con configuración toast: true, mejorando la experiencia de usuario en errores y confirmaciones.

La interfaz se adaptó a múltiples tamaños de pantalla. Se usaron utilidades de PrimeFlex y algunos componentes de Angular Material para una experiencia fluida y moderna.

Por último algunas librerías fueron instaladas con --force o --legacy-peer-deps debido a conflictos de versiones al usar Angular 20. Esto se documentó en el README como una consideración importante para levantar el entorno correctamente.

---

## 🚀 Tecnologías utilizadas

- ✅ **Angular 20 Standalone**
- ✅ **TypeScript 5+**
- ✅ **PrimeFlex** (para diseño responsivo)
- ✅ **SweetAlert2** (toasts y alertas)
- ✅ **Angular Material**
- ✅ **Forms Standalone (template-driven)**
- ✅ **Rutas protegidas con AuthGuard**
- ✅ **Consumo de API REST NestJS personalizada**
- ✅ **CSS moderno y diseño responsive**

---

## 🔧 Instalación y configuración

### 📦 Requisitos previos

- Node.js **v18+**
- Angular CLI global:

```bash
npm install -g @angular/cli
```

> 💡 Esta app fue desarrollada en Angular **v20**, algunas dependencias fueron instaladas usando `--force` o `--legacy-peer-deps` para resolver conflictos de versiones. Si ves advertencias, puedes continuar.

---

## ▶️ Instrucciones para levantar el proyecto

1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/movieapp-frontend.git
cd movieapp-frontend
```

2. Instala las dependencias (en caso de errores usa `--force`):

```bash
npm install --force
# o
npm install --legacy-peer-deps
```

3. Configura la URL del backend:

```ts
// src/core/services.ts

aprivate API_URL: 'http://localhost:3000', // Backend propio en NestJS

```

4. Ejecuta la app:

```bash
ng serve
```

Accede desde: [http://localhost:4200](http://localhost:4200)

---

## 🌐 Backend requerido

Este frontend depende de una API propia desarrollada con **NestJS** que incluye:

- Autenticación JWT
- Login por contraseña
- Registro con verificación de correo electrónico
- Reenvío de correo de verificación
- Endpoints RESTful:
  - POST `/auth/register`
  - GET `/auth/verify-email?token`
  - POST `/auth/resend-verification`
  - POST `/auth/login`
  - POST `/auth/logout`
  - GET `/movies/search?title`
  - GET `/movies/search?title`
  - POST `/favorites`
  - GET `/favorites`
  - DEL `/favorites/id`
  - POST `/favorites/rate`

> 🧠 El backend también utiliza MongoDB (Atlas) y OMDb API como fuente externa de películas.

---

## 🧠 Funcionalidades implementadas

### 👥 Autenticación

- Registro con verificación por email
- Reenvio del email
- Inicio de sesión con contraseña
- Middleware de autorización con JWT
- Notificaciones visuales con **SweetAlert2 (toast)**

### 🎬 Películas

- Búsqueda de películas por año
- Visual tipo Netflix con tarjetas
- Agregar/eliminar favoritos
- Calificar películas (puntuación + comentario)
- Mostrar calificación actual de cada favorito

### 🔐 Seguridad y UX

- Rutas protegidas con `AuthGuard`
- Manejo de errores visual (SweetAlert2)
- Validación de formularios
- Cierre de sesión y expiración segura del token

---


## 👨‍💻 Autor

**Sebastian Torres Herrera**  
[LinkedIn](https://www.linkedin.com/in/sebastian-torres-herrera-game-development/)

---

## 📃 Licencia

MIT