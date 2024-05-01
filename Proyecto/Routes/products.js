const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');



//Subir info de usuario a la base de datos
let userSchema = mongoose.Schema({
    nombre: String,
    email: String,
    Password:String,
});
let User = mongoose.model('users', userSchema);
router.post('/users', (req, res) => {
    let { nombre, email, pswd } = req.body;
    let newUser = new User({ nombre, email, Password: pswd });
 
    newUser.save().then((doc) => {
        console.log("Usuario creado: ", doc);
        res.status(200).json({ success: true, message: "Usuario creado exitosamente" });
    }).catch((err) => {
        console.error("Error al crear usuario: ", err);
        res.status(200).json({ success: false, message: "Error al crear usuario"});
    });
});



//Descargar los autos de la base de datos 
const Toyota = mongoose.model('toyotas', {
    img: String,
    nombre: String,
    Precio: String
});

const ChevroletSchema = new mongoose.Schema({
    img: String,
    nombre: String,
    Precio: String
}, { collection: 'Chevrolet' }); // Especificar el nombre de la colección
const Chevrolet = mongoose.model('Chevrolet', ChevroletSchema);

const mazdaSchema = new mongoose.Schema({
    img: String,
    nombre: String,
    Precio: String
}, { collection: 'mazdas' }); // Especificar el nombre de la colección
const mazda = mongoose.model('mazdas', mazdaSchema);

const cadillacSchema = new mongoose.Schema({
    img: String,
    nombre: String,
    Precio: String
}, { collection: 'cadillacs' }); // Especificar el nombre de la colección
const cadillac = mongoose.model('cadillacs', cadillacSchema);

const fordSchema = new mongoose.Schema({
    img: String,
    nombre: String,
    Precio: String
}, { collection: 'fords' }); // Especificar el nombre de la colección
const ford = mongoose.model('fords', fordSchema);


router.get('/toyota', async (req, res) => {
    try {
        const cars = await Toyota.find();
        res.json(cars);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/chevrolet', async (req, res) => {
    try {
        const cars = await Chevrolet.find(); // Obtener todos los autos de Toyota desde la base de datos
        res.json(cars); // Enviar los datos como respuesta en formato JSON
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' }); // Manejar errores
    }
});
router.get('/mazda', async (req, res) => {
    try {
        const cars = await mazda.find(); // Obtener todos los autos de Toyota desde la base de datos
        res.json(cars); // Enviar los datos como respuesta en formato JSON
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' }); // Manejar errores
    }
});

router.get('/cadillac', async (req, res) => {
    try {
        const cars = await cadillac.find(); // Obtener todos los autos de Toyota desde la base de datos
        res.json(cars); // Enviar los datos como respuesta en formato JSON
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' }); // Manejar errores
    }
});
router.get('/ford', async (req, res) => {
    try {
        const cars = await ford.find(); // Obtener todos los autos de Toyota desde la base de datos
        res.json(cars); // Enviar los datos como respuesta en formato JSON
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' }); // Manejar errores
    }
});

router.get('/all-cars', async (req, res) => {
    try {
        // Utilizamos un array para almacenar todos los autos de cada marca
        let allCars = [];

        // Obtenemos los autos de cada marca y los agregamos al array
        const toyotaCars = await Toyota.find();
        allCars = allCars.concat(toyotaCars);

        const chevroletCars = await Chevrolet.find();
        allCars = allCars.concat(chevroletCars);

        const mazdaCars = await mazda.find();
        allCars = allCars.concat(mazdaCars);

        const cadillacCars = await cadillac.find();
        allCars = allCars.concat(cadillacCars);

        const fordCars = await ford.find();
        allCars = allCars.concat(fordCars);

        // Enviamos todos los autos como respuesta en formato JSON
        res.json(allCars);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' }); // Manejar errores
    }
});


//Subir la información de la renta a la base de datos 
let rentaSchema = new mongoose.Schema({
    correo: String,
    full_name: String,
    last_name: String,
    insurance_type: String,
    start_date: String,
    end_date: String,
    car_name: String,
    car_precio: String,
    seguro_precio: String,
    dias: String,
    total: String
});
let Rent = mongoose.model('rents', rentaSchema);

router.post('/rents', (req, res) => {

    let {correo,full_name,last_name,insurance_type,start_date,end_date,car_name,car_precio,seguro_precio,dias,total} = req.body;
    let newRent = Rent({correo,full_name,last_name,insurance_type,start_date,end_date,car_name,car_precio,seguro_precio,dias,total});

        newRent.save().then((doc) => {
            console.log("Renta creada: ", doc);
            res.status(200).json({ success: true, message: "Renta creada exitosamente" ,doc});
        }).catch((err) => {
            console.error("Error al crear usuario: ", err);
            res.status(200).json({ success: false, message: "Error al crear usuario" });
        });

});




module.exports = router;