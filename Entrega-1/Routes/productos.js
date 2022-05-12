const express = require("express")
const { Router } = express
const router = new Router()

const Contenedor = require('../utils/proces.js');
const fileProducto = new Contenedor("productos");

//Muestra todos los productos
router.get('/', (req, res) => {
    const listado = fileProducto.getAll()
    res.send(listado)
})
//muestra un solo producto
router.get("/:id", (req, res) => {
    const { id } = req.params
    try {
        const listado = fileProducto.getById(id)
        res.send(listado)
    } catch (error) {
        res.send({ "Mensaje": "El producto no existe" })
    }
})
//crea un nuevo producto
router.post('/', async (req, res) => {
    if (req.query.admin) {
        const { nombre, descripcion, codigo, foto, precio, stock } = req.body
        const objProducto = {
            timestamp: Date.now(),
            nombre: nombre,
            descripcion: descripcion,
            codigo: codigo,
            foto: foto,
            precio: precio,
            stock: stock
        }
        if (nombre && descripcion && codigo && foto && precio && stock) {
            fileProducto.save(objProducto)
            res.send({ "mensaje": "Producto creado" })
        } else {
            res.send({ mensaje: "Faltan Datos" })
        }

    } else {
        res.send({ error: -1, descripcion: "Ruta '/', Metodo 'POST' no autorizado" })
    }
})
//Edita un producto 
router.put("/:id", async (req, res) => {
    if (req.query.admin) {
        const { nombre, descripcion, codigo, foto, precio, stock } = req.body
        let id = req.params.id
        const arrProd = fileProducto.getAll()
        let index = arrProd.findIndex(p => p.id == id)
        let body = req.body
        let updateProduct = { id: id, ...body }
        if (nombre && descripcion && codigo && foto && precio && stock) {
            arrProd[index] = updateProduct;
            fileProducto.deleteforId(index)
            fileProducto.save(arrProd[index])
            res.send({ "mensaje": "Producto creado", "producto": updateProduct })
        } else {
            res.send({
                Alerta: "No puedes dejar campos vacios",
                mensaje: "Asegurate que halla title, price y thumbnail"
            })
        }
    } else {
        res.send({ error: -1, descripcion: "Ruta '/', Metodo 'POST' no autorizado" })
    }
})

//elimina un producto
router.delete("/:id", async (req, res) => {
    if (req.query.admin) {
        const { id } = req.params
        const eliminado = await fileProducto.deleteforId(id)
        res.send(eliminado)

    } else {
        res.send({ error: -1, descripcion: "Ruta '/', Metodo 'POST' no autorizado" })
    }

})

module.exports = router


