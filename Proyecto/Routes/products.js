const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { json } = require('body-parser');
const router = express.Router();

//FUNCIONES
const validarCorreo = async (correo) => {
    try {
        const usuarioExistente = await User.findOne({ email: correo });
        return !! usuarioExistente;
    } catch (error) {
        console.error("Error al validar correo:", error);
        throw error;
    }
}; 

//Subir info de usuario a la base de datos
let userSchema = mongoose.Schema({
    nombre: String,
    email: String,
    Password:String,
}); let User = mongoose.model('users', userSchema);

router.post('/users', async (req, res) => {
    try {
        let { nombre, email, pswd } = req.body;
        console.log("Datos del usuario: ", nombre, email, pswd);
        // Verificar si el correo ya está en uso
        const correoEnUso = await validarCorreo(email);
        if (correoEnUso) {
            return res.status(400).json({ success: false, message: "El correo ya está en uso" });
        }
        // Encriptar la contraseña antes de guardarla en la base de datos
        let hash = bcrypt.hashSync(pswd, 10);
        console.log("Contraseña encriptada: ", hash);
        let newUser = new User({ nombre, email, Password: hash });
        // Guardar el nuevo usuario en la base de datos
        await newUser.save();
        
        console.log("Usuario creado: ", newUser);
        res.status(200).json({ success: true, message: "Usuario creado exitosamente" });
    } catch (error) {
        console.error("Error al crear usuario: ", error);
        res.status(500).json({ success: false, message: "Error al crear usuario"});
    }
});


router.post('/login', async (req, res) => {
    try {
        const { email, pswd } = req.body;
        // Verificar si el correo existe en la base de datos
        const usuario = await User.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ success: false, message: "Credenciales inválidas" });
        }
        // Verificar si las contraseñas coinciden
        const contraseñaValida = await bcrypt.compare(pswd, usuario.Password);
        if (!contraseñaValida) {
            return res.status(400).json({ success: false, message: "Credenciales inválidas" });
        }
        // Generar y devolver un token JWT si las credenciales son válidas
        const token = jwt.sign({ userId: usuario._id, email: usuario.email }, 'secreto', { expiresIn: '1h' });
        res.status(200).json({ success: true, message: "Inicio de sesión exitoso", token });
    } catch (error) {
        console.error("Error al iniciar sesión: ", error);
        res.status(500).json({ success: false, message: "Error al iniciar sesión" });
    }
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




let rentaSchema = new mongoose.Schema({
    carName: String,
    carPricePerDay: String,
    daysRented: String,
    email: String,
    endDate: String,
    fullName: String,
    img: String,
    insuranceName: String,
    insurancePrice: String,
    lastName: String,
    startDate: String,
    total: String
});

let Rent = mongoose.model('rents', rentaSchema);

router.post('/rents', (req, res) => {
// Recibir los datos del cuerpo de la solicitud
const rentaDataArray = req.body;

// Guardar los datos de las rentas en la base de datos
Rent.insertMany(rentaDataArray)
    .then(docs => {
        console.log("Rentas creadas:", docs);
        res.status(200).json({ success: true, message: "Rentas creadas exitosamente", docs });
    })
    .catch(err => {
        console.error("Error al crear rentas:", err);
        res.status(500).json({ success: false, message: "Error al crear rentas" });
    });
    
});

module.exports = router;