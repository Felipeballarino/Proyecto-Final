const fs = require("fs")

class Contenedor {
    constructor(fileName) {
        this.fileName = `./utils/${fileName}.json`
        this.stock = []
    }

    save(objeto) {
        if(!Array.isArray(objeto)){
            this.stock.push(objeto)
        }else{
            this.stock = objeto
        }
        fs.readFile(this.fileName, "utf-8", (error, contenido) => {
            if (error) {
                fs.writeFile(this.fileName, JSON.stringify(this.stock, null, ' '), (error) => {
                    if (error) {
                        console.log("HUBO UN ERROR", error)
                    } else {
                        console.log("ARCHIVO CREADO CORRECTAMENTE")
                    }
                })

            } else {
                if(!Array.isArray(objeto)){
                    const dataFile = JSON.parse(contenido)
                    this.stock.unshift(...dataFile)
                    this.stock.forEach((element, i) => {
                        element.id = i
                    });
                }
                fs.writeFile(this.fileName, JSON.stringify(this.stock, null, ' '), (error) => {
                    if (error) {
                        console.log("HUBO UN ERROR EN LA EDICION", error)
                    } else {
                        console.log("ARCHIVO EDITADO CORRECTAMENTE")
                    }
                })
            }
        })
    }


    getById(id) {
        try {
            const data = JSON.parse(fs.readFileSync(this.fileName, "utf-8"))
            const find = data.find(e => e.id == id)
            if (find) {
                return find
            } else {
                return({"Mensaje":"El producto no existe"})
            }
        } catch (error) {
            console.log(error)
        }
    }

    getAll() {
        try {
            const data = JSON.parse(fs.readFileSync(this.fileName, "utf8"))
            if (data) {
                return data
            } else {
                return "error"
            }
        } catch (error) {
            console.log(error)
        }
    }

    deleteforId(id) {
        try {
            const data = JSON.parse(fs.readFileSync(this.fileName, "utf8"))
            const filtro = data.filter(e => e.id != id)
            fs.writeFile(this.fileName, JSON.stringify(filtro, null, ' '), error => {
                if (error) {
                    return("No se pudo eliminar el producto")
                } else {
                    return("Producto eliminado")
                }
            })
        } catch (error) {
            console.log(error)
        }
    }


    //----------------------------------------------------------------//

    deleteAll() {
        try {
            const data = JSON.parse(fs.readFileSync(this.fileName, "utf8"))
            fs.writeFile(this.fileName, JSON.stringify(), error => {
                if (error) {
                    console.log("No se pudo eliminar el producto")
                } else {
                    console.log("Producto eliminado")
                }
            })
        } catch (error) {
            console.log(error)
        }


    }
}


module.exports = Contenedor

//  const producto = new Contenedor("productos")


// producto.save({
//     "timestamp": "14/05",
//     "nombre": "Television",
//     "descripcion": "Esto es una descripcion",
//     "codigo": 003,
//     "foto": "https://es.wikipedia.org/wiki/Imagen#/media/Archivo:Image_created_with_a_mobile_phone.png",
//     "precio": 30000,
//     "stock": 500,
//     "id":0
// })
// producto.save({
//     "timestamp": "14/05",
//     "nombre": "radio",
//     "descripcion": "Esto es una descripcion",
//     "codigo": 103,
//     "foto": "https://es.wikipedia.org/wiki/Imagen#/media/Archivo:Image_created_with_a_mobile_phone.png",
//     "precio": 2000,
//     "stock": 500,
//     "id":1
// })

// //  producto.getForId(0)

//  console.log(producto)

