const express = require('express');
const router = express.Router();
const path = require('path');

const products = require('../Routes/products');
const admin = require('../Routes/admin');

//middleware pra las rutas de admin
function validateAdmin(req, res, next) {
    const adminHeader = req.headers['x-auth'];
    if (adminHeader !== 'admin') {
        return res.status(403).send('Acceso no autorizado, no se cuenta con privilegios de administrador.');
    }
    next();
}

router.use('/products',products);
router.use('/admin',admin);


router.get('/',(req,res) => res.sendFile(path.resolve(__dirname + "/../home/home.html")));

module.exports = { router, validateAdmin };