# Product Management Application

Esta es una aplicación de gestión de productos desarrollada con Angular 19 que permite a los usuarios agregar, visualizar y eliminar productos.

## Características

- **Autenticación**: Funcionalidad de inicio de sesión con protección de rutas mediante guards
- **Gestión de Productos**: Agregar, editar y eliminar productos con formularios reactivos
- **Directiva Personalizada**: Resaltar productos con precio > 100 con fondo amarillo
- **Patrón Factory**: Implementación el patrón Factory Method para la creación de productos
- **Interceptor HTTP**: Agrega token de autenticación a todas las peticiones HTTP

## Implementación Técnica

- Angular 19.2.0
- TypeScript
- Formularios Reactivos
- Directivas Personalizadas
- Guards de Rutas
- Interceptores HTTP
- Patrón de Diseño Factory
- JSON Server + JSON Server Auth para la API

## Estructura del Proyecto

```
store_oncredit/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── product-form/
│   │   │   │   ├── product-form.component.css
│   │   │   │   ├── product-form.component.html
│   │   │   │   ├── product-form.component.spec.ts
│   │   │   │   └── product-form.component.ts
│   │   │   └── product-list/
│   │   │       ├── product-list.component.css
│   │   │       ├── product-list.component.html
│   │   │       ├── product-list.component.spec.ts
│   │   │       └── product-list.component.ts
│   │   ├── directives/
│   │   │   └── high-price/
│   │   │       ├── high-price.directive.spec.ts
│   │   │       └── high-price.directive.ts
│   │   ├── factories/
│   │   │   └── product.factory.ts
│   │   ├── guards/
│   │   │   └── auth/
│   │   │       ├── auth.guard.spec.ts
│   │   │       └── auth.guard.ts
│   │   ├── interceptors/
│   │   │   └── auth/
│   │   │       ├── auth.interceptor.spec.ts
│   │   │       └── auth.interceptor.ts
│   │   ├── models/
│   │   │   └── product.model.ts
│   │   ├── pages/
│   │   │   ├── login/
│   │   │   │   ├── login.component.css
│   │   │   │   ├── login.component.html
│   │   │   │   ├── login.component.spec.ts
│   │   │   │   └── login.component.ts
│   │   │   └── products/
│   │   │       ├── products.component.css
│   │   │       ├── products.component.html
│   │   │       ├── products.component.spec.ts
│   │   │       └── products.component.ts
│   │   ├── services/
│   │   │   ├── auth/
│   │   │   │   ├── auth.service.spec.ts
│   │   │   │   └── auth.service.ts
│   │   │   ├── category/
│   │   │   │   ├── category.service.spec.ts
│   │   │   │   └── category.service.ts
│   │   │   └── product/
│   │   │       ├── product.service.spec.ts
│   │   │       └── product.service.ts
│   │   ├── app.component.css
│   │   ├── app.component.html
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── environments/
│   │   └── environment.ts
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── db.json
├── package.json
├── routes.json
├── server.js
└── tsconfig.json
```

## Cómo Ejecutar

1. Clona el repositorio
2. Instala las dependencias:
   ```
   npm install
   ```
3. Inicia el servidor de API:
   ```
   npm run server
   ```
4. En otra terminal, inicia el servidor de desarrollo:
   ```
   ng serve
   ```
5. Navega a `http://localhost:4200/`

## API

La aplicación utiliza JSON Server con JSON Server Auth para proporcionar una API REST con autenticación:

- **Autenticación**: `/login` (POST)
- **Productos**: `/products` (GET, POST, PUT, DELETE)
- **Categorías**: `/categories` (GET)

## Credenciales de Prueba

- **Email**: admin@example.com
- **Password**: admin123

