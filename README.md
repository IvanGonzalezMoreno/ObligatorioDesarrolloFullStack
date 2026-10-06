# API de gestión ganadera

API REST para gestionar animales, razas y establecimientos ganaderos, con registro de movimientos, planes de usuario y datos de clima por establecimiento. Desarrollada como Obligatorio 1 de *Desarrollo Full Stack integrado con IA* (Universidad ORT Uruguay).

**Demo desplegada:** https://obligatorio-desarrollo-full-stack-jade.vercel.app (API sin interfaz, se prueba con Postman)

## Tecnologías

- **Node.js** y **Express**
- **MongoDB** con **Mongoose**
- **JWT** para autenticación y **BcryptJS** para el hash de contraseñas
- **Joi** para validación de datos de entrada
- **Cloudinary** para el almacenamiento de imágenes
- **WeatherAPI** para el clima de cada establecimiento
- **IA generativa** (Groq) integrada en el backend
- Despliegue en **Vercel**

## Funcionalidades

| Recurso | Descripción |
|---|---|
| **Auth** | Registro e inicio de sesión de usuarios con JWT. |
| **Animales** | Alta, consulta, modificación y baja de animales, con imagen. |
| **Razas** | Categorías de animales. Solo un administrador puede crearlas. |
| **Establecimientos** | Gestión de establecimientos. Incluye el clima actual según su ubicación. |
| **Movimientos** | Registro histórico de traslados de animales entre establecimientos. |
| **Planes** | Planes de usuario *plus* y *premium*, con límites distintos (por ejemplo, la cantidad de establecimientos). |

Todos los endpoints están bajo el prefijo `/v1`. Las rutas de autenticación son públicas; el resto requiere un token válido, y algunas operaciones están restringidas por rol.

## Estructura del proyecto

```
├── app.js
├── v1.routes.js        # montaje de rutas (auth público, luego rutas protegidas)
└── v1/
    ├── config/
    ├── controllers/
    ├── middlewares/
    ├── models/
    ├── routes/
    ├── services/
    ├── utils/
    └── validators/
```

## Cómo ejecutarlo

1. Clonar el repositorio e instalar las dependencias:

```bash
   git clone https://github.com/IvanGonzalezMoreno/ObligatorioDesarrolloFullStack.git
   cd ObligatorioDesarrolloFullStack
   npm install
```

2. Crear un archivo `.env` en la raíz a partir de `.env.example` y completar los valores:

```
   MONGO_URI=
   JWT_SECRET=
   PORT=
   SALT_ROUNDS=
   GROQ_API_KEY=
   CLOUDINARY_CLOUD_NAME=
   CLOUDINARY_API_KEY=
   CLOUDINARY_API_SECRET=
   WEATHERAPI_KEY=
```

3. Iniciar el servidor:

```bash
   npm run dev
```

## Autor

Iván González Moreno, estudiante de Analista en Tecnologías de la Información en la Universidad ORT Uruguay.