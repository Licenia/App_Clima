# 🌤️ Clima Ahora
Este proyecto es un clon de una aplicación del clima. Se obtienen datos reales a través de la API de OpenWeather. Cuenta con una interfaz simple en la que encontrarás un buscador; al ingresar una ciudad, aparecerá una tarjeta con la información climática correspondiente: temperatura, icono, descripción, humedad, velocidad del viento y dirección del viento.

## Objetivo

Comprender el funcionamiento que requiere clave de acceso, y practicar la manipulación del DOM utilizando JavaScript.

## Tecnologías Utilizadas

- HTML
- CSS
- JavaScript
- Git
- GitHub
- Vite
- OpenWeather (API para obtener información del clima)

## Estructura del Proyecto

```
app-clima/
├── src/
│   │__ listenners.js
│   |__ main.js
|   |__ style.css 
│   
├── public/
│   |__ app_clima.gif
│   
│__ .env
|__ .gitignore
|__ index.html
|__ LICENSE
|__ package-lock.json
|__ package.json
|__ README.md

```

## Componentes Principales

- **Buscador:** Permite buscar la ciudad de la cual se desea obtener el clima. Muestra las primeras 5 coincidencias en un select.
- **Tarjeta del Clima:** Muestra información climatica de la ciudad ingresada, incluyendo: nombre, icono, descripción, temperatura, velocidad del viento y dirección del viento.
- **Loader:** Se muestra un loader mientras se carga la tarjeta del clima.

## Nuevas mejoras
- **Skeleton Loader:** se agrego una animación skeleton para mejorar la experiencia del usuario mientras se carga la información.
- **Select con integracion de API geografica:** se expandio el rango de busqueda de lugares a nivel mundial mediante la integración de una API geográfica.
- **Persistencia de datos:** se implemento almacenamiento temporal de la informacion de consulta, que se limpian al realizar una nueva busqueda.
-- **Diseño responsivo:** Se adapto la interfaz para diferentes tamaños de pantalla, mejorando su usabilidad en dispositivos moviles.
-- **Mejora en la semántica:** se corrigio la estructura semántica del proyecto para una mejor accesibilida y orden del código.

# Proyecto publicado en Netlify
Puedes probar la aplicación web directamente en el siguiente enlace:

[🌐 Clima Ahora en Netlify](https://climaahora.netlify.app)


# Instalación y uso 
Sigue estos pasos para ejecutar el proyecto en tu entorno local:

**1. clona el repositorio:**

~~~
git clone https://github.com/Licenia/clima-ahora.git
~~~

**2. Instala las dependencias:**
```
npm install
```
**3. Configura las variables de entorno:**

Crea un archivo .env en la raiz del proyecto y agrega tu clave de la API de OpenWeather:
~~~
VITE_API_KEY=tu_clave_aquí
~~~

**4. Inicia el servidor de desarrollo:**
~~~
npm run dev
~~~

El proyecto se abrira en tu navegador, normalmente en:
~~~
 http://localhost:5173/
~~~

