RUTAS PARA PRODUCTOS: 
<!-- ------------------------------------ -->

GET('/') ===> http://localhost:8080/api/productos

GET('/:id') ===> http://localhost:8080/api/productos/1

POST('/') ===> http://localhost:8080/api/productos?admin=true 
{
  "nombre": "Nueva producto",
  "descripcion": "Esto es una descripcion nueva",
  "codigo": 500,
  "foto": "foto",
  "precio": 100,
  "stock": 2
}

PUT('/:id') ===> http://localhost:8080/api/productos/1?admin=true
{
  "nombre": "Nueva producto EDITADO",
  "descripcion": "Esto es una descripcion nueva EDITADO",
  "codigo": 500 , 
  "foto": "foto",
  "precio": 100,
  "stock": 2
}

DELETE('/:id') ===>http://localhost:8080/api/productos/2?admin=true

<!-- ---------------------------------------------------------------------------------------- -->


RUTAS PARA CARRITO
<!-- --------------------------------------------- -->
POST('/') ===> http://localhost:8080/api/carrito

GET('/') ===> http://localhost:8080/api/carrito

DELETE('/:id') ===> http://localhost:8080/api/carrito/2

GET('/:idCart/productos') ===>  http://localhost:8080/api/carrito/1/productos

POST('/:idCart/productos/:idProd') ===>  http://localhost:8080/api/carrito/1/productos/2

DELETE('/:idCart/productos/:idProd') ===> http://localhost:8080/api/carrito/1/productos/2