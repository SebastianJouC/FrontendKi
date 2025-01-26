# Frontend

Este proyecto fue generado usando Angular version 19.0.6.

## Dependencia Necesaria

- Angular Material
```bash
ng add @angular/material
```
## Development server

Para iniciar el proyecto de manera local, coloca:

```bash
ng serve
```

## Explicacion del proyecto
El frontend de este proyecto tiene el proposito de crear un banner para una pagina, el cual tenga un modal de cookies, una pagina para listar politicas de cookies, y un gestor de ambas que utilize las operaciones CRUD del backend, tambien considerar que es responsivo para adaptarse a pantallas de distintos tamaños y que los datos quedaran guardados en el local storage para que cuando el usuario acepte las cookies, no deba volver a realizar esta accion.
## Consideraciones
Este proyecto corre actualmente en local, por ende la clase environment se debe configurar en base al url del backend.
## Componentes
El proyecto se compone de los siguientes componentes:
- Confirmation-Dialog: Su unico objetivo es ser una ventana emergenta para confirmar la eliminacion de alguna politica.
- Confirmation-Dialog-Cookies: Su objetivo es el mismo que el componente anterior pero para las cookies.
- Cookies-Banner: Componente q

