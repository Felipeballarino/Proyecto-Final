const express = require('express')

const carrito = require('./Routes/carrito')
const productos = require('./Routes/productos')
const app = express()

app.use(express.json())

app.use( "/api/carrito",carrito)
app.use( "/api/productos", productos)









app.listen(8080, ()=>{
    console.log("Listen on Port 8080")
})