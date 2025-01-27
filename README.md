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
- Confirmation-dialog: Su unico objetivo es ser una ventana emergente para confirmar la eliminacion de alguna politica.
- Confirmation-dialog-dookies: Su objetivo es el mismo que el componente anterior pero para las cookies.
- Cookies-banner: Componente que tiene toda la logica del banner, tiene la logica para aceptar todas las cookies, rechazar las no obligatorias, abrir el modal de configuracion de cookies y redireccionar a las politicas de cookies. Tambien tiene la logica para guardar la configuracion en el localStorage.
- Cookies-edit-list: Componente con la logica de listar todas las cookies en una tabla y tener botones de accion para crear, editar y eliminar. Considerar que crear y editar redirecciona a un forms.
- Cookies-form: Componente que tiene un formulario para agregar y editar cookies.
- Cookies-list: Componente que tiene toda la logica del modal de las cookies, en donde tiene unos toogle para desactivar o activar la cookie, y un boton para guardar la configuracion, la cual sera guardara en el local storage.
- Politics-form: Componente que tiene un formulario para agregar y editas las politicas de las cookies.
- politics-list: Componente con la logica de listar todas las politicas de cookies en una tabla y tener botones de accion para crear, editar y eliminar. Considerar que crear y editar redirecciona a un forms.
## Interfaces
- Cookies: Definen la estructura del objeto cookies que llegara desde el backend.
- Politics: Definen la estructura del objeto politics que llegara desde el backend.
## Services
- Cookies.Service: Gestiona las operaciones CRUD de cookies que vienen del backend.
- Politic.Service: Gestiona las operaciones CRUD de politics que vienen del backend.
## Routes
- Las rutas tienen el proposito de facilitar el como se redirecciona a cada parte de la pagina.

