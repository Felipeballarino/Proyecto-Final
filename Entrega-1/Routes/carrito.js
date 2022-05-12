const e = require("express")
const express = require("express")
const { Router } = express

const router = new Router()

const Contenedor = require('../utils/proces')
const fileCarrito = new Contenedor("carrito")
const fileProducto = new Contenedor("productos")


//crea el carrito
router.post('/', (req, res) => {
    const newCarrito = {
        id:0,
        timestamp: Date.now(),
        productos: []
    }
    try {
        fileCarrito.save(newCarrito);
        res.send({ "mensaje": "Carrito creado"})
        // res.redirect(301, "/api/carrito/carritos");
    } catch (error) {
        console.log(error)
    }

})
//mustra todos los carritos
router.get('/',async (req, res) => {
    const carrito = await fileCarrito.getAll()
    res.send(carrito)
})
//Vacia el carrito y lo elimina
router.delete('/:id', (req, res) => {
    const {id} = req.params
    try {
        fileCarrito.deleteforId(id)
        res.send({"mensaje": "Carrito Eliminado"})
    } catch (error) {
        res.send({"Mensaje":"Error en elimnar el carrito"})
    }

})
//busca todos los productos en un carrito
router.get('/:idCart/productos', (req, res) => {
    const { idCart } = req.params
    const getCart = fileCarrito.getById(idCart)
    res.send(getCart.productos)
})
//agrega un nuevo producto al carrito
router.post('/:idCart/productos/:idProd', (req, res) => {
    const { idCart, idProd } = req.params
    const allCart = fileCarrito.getAll()
    const cart = allCart.find(e=> e.id == idCart)
    const producto = fileProducto.getById(idProd)
    cart.productos.push(producto)
    try {
        fileCarrito.save(allCart)
        res.send({"Mensaje": "Producto agregado al carrito"});     
    } catch (error) {
        console.log(error)
    }

        
   // console.log(allCart)
})
//elimina un solo producto del carrito
router.delete('/:idCart/productos/:idProd', (req, res) => {
    const { idCart, idProd } = req.params
    const allCart = fileCarrito.getAll()    
    const cart = allCart.find(e=> e.id == idCart)
    const  productos =cart.productos.filter(e=>e.id != idProd)
    cart.productos = productos
    allCart.map(e=>{
        if(e.id == idCart){
            return e=cart
        }
    })
    try {
        fileCarrito.save(allCart)
        res.send({"Mensaje": "Producto eliminado del carrito"});     
    } catch (error) {
        console.log({"mensaje":"El producto no se encuentra en el carrito"})
    }
    // console.log(allCart)
    // try {
    //     fileCarrito.save(allCart)
    //     res.send({"Mensaje": "Producto agregado al carrito"});     
    // } catch (error) {
    //     console.log(error)
    // }

})




module.exports = router


