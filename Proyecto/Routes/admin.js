const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { validateAdmin } = require('../controllers/router');


// Modelos de Mongoose para las diferentes colecciones
const Toyota = mongoose.model('toyotas');
const Chevrolet = mongoose.model('Chevrolet');
const Mazda = mongoose.model('mazdas');
const Cadillac = mongoose.model('cadillacs');
const Ford = mongoose.model('fords');
const Users = mongoose.model('users');

const productCollections = [Toyota, Chevrolet,Mazda,Cadillac,Ford];

router.delete("/delete/product/:id", async (req, res) => {
    const productId = req.params.id;
    try {
        // Iterar sobre todas las colecciones de productos
        for (const ProductModel of productCollections) {
            // Buscar el producto por su ID en la colección actual
            const deletedProduct = await ProductModel.findByIdAndDelete(productId);
            // Si se encontró y eliminó el producto, enviar una respuesta exitosa
            if (deletedProduct) {
                return res.json({ message: 'Producto eliminado correctamente' });
            }
        }
        // Si el producto no se encontró en ninguna colección, enviar una respuesta de error
        res.status(404).json({ message: 'Producto no encontrado' });
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

router.delete("/delete/users/:id",async(req,res) =>{
    const userId = req.params.id;
    try {
        // Busca y elimina el usuario por su ID
        const deletedUser = await Users.findByIdAndDelete(userId);
        
        // Si se encontró y eliminó el usuario, enviar una respuesta exitosa
        if (deletedUser) {
            return res.json({ message: 'Usuario eliminado correctamente' });
        }

        // Si el usuario no se encontró, enviar una respuesta de error
        res.status(404).json({ message: 'Usuario no encontrado' });
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }

});

//update productos y usuarios 
router.put("/update/products/:id", async(req,res)=> {
    const productId = req.params.id;
    const { nombre, Precio, img } = req.body;

    try {
        // Array de modelos de productos
        const productModels = [Toyota, Chevrolet, Mazda, Cadillac, Ford];

        // Objeto para almacenar los productos actualizados
        let updatedProduct = null;

        // Iterar sobre cada modelo de producto
        for (const ProductModel of productModels) {
            // Buscar el producto por su ID en el modelo actual
            const product = await ProductModel.findById(productId);

            // Si se encuentra el producto en el modelo actual, actualizarlo
            if (product) {
                // Actualizar los campos especificados
                if (nombre) product.nombre = nombre;
                if (Precio) product.Precio = Precio;
                if (img) product.img = img;

                // Guardar el producto actualizado
                updatedProduct = await product.save();
                break; // Salir del bucle una vez que se haya actualizado el producto
            }
        }

        // Si se encontró y actualizó el producto, enviar la respuesta con el producto actualizado
        if (updatedProduct) {
            return res.json({ message: 'Producto actualizado correctamente', product: updatedProduct });
        }

        // Si el producto no se encontró en ninguna colección, enviar una respuesta de error
        res.status(404).json({ message: 'Producto no encontrado' });
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }

});

//ruta para crear productos 
router.post("/create/products/:collection", async (req, res) => {
    const collectionName = req.params.collection;
    const { nombre, Precio, img } = req.body;

    try {
        // Determina el modelo correspondiente según el nombre de la colección
        let ProductModel;
        switch (collectionName) {
            case 'toyotas':
                ProductModel = mongoose.model('toyotas');
                break;
            case 'chevrolets':
                ProductModel = mongoose.model('Chevrolet');
                break;
            case 'mazdas':
                ProductModel = mongoose.model('mazdas');
                break;
            case 'cadillacs':
                ProductModel = mongoose.model('Cadillacs');
                break;
            case 'fords':
                ProductModel = mongoose.model('fords');
                break;
            default:
                return res.status(400).json({ message: 'Colección no válida' });
        }

        // Crea un nuevo producto con los datos proporcionados
        const newProduct = new ProductModel({
            nombre,
            Precio,
            img
        });

        // Guarda el nuevo producto en la colección correspondiente
        await newProduct.save();

        // Devuelve una respuesta con el producto creado
        res.json({ message: 'Producto creado correctamente', product: newProduct });
    } catch (error) {
        console.error('Error al crear el producto:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});


module.exports = router;
