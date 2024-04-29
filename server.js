const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const port = 3000;

app.use(cors());

// Conexión a la base de datos
mongoose.connect('mongodb+srv://admin:admin@myapp.m2pe9wf.mongodb.net/RetroGarage', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');
});

// Definir el modelo de Mongoose para los autos de Toyota
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
const chevrolet = mongoose.model('Chevrolet', ChevroletSchema);

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


// Ruta para obtener los autos de Toyota
app.get('/api/toyota', async (req, res) => {
    try {
        const cars = await Toyota.find(); // Obtener todos los autos de Toyota desde la base de datos
        res.json(cars); // Enviar los datos como respuesta en formato JSON
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' }); // Manejar errores
    }
});
app.get('/api/chevrolet', async (req, res) => {
    try {
        const cars = await chevrolet.find(); // Obtener todos los autos de Toyota desde la base de datos
        res.json(cars); // Enviar los datos como respuesta en formato JSON
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' }); // Manejar errores
    }
});
app.get('/api/mazda', async (req, res) => {
    try {
        const cars = await mazda.find(); // Obtener todos los autos de Toyota desde la base de datos
        res.json(cars); // Enviar los datos como respuesta en formato JSON
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' }); // Manejar errores
    }
});

app.get('/api/cadillac', async (req, res) => {
    try {
        const cars = await cadillac.find(); // Obtener todos los autos de Toyota desde la base de datos
        res.json(cars); // Enviar los datos como respuesta en formato JSON
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' }); // Manejar errores
    }
});
app.get('/api/ford', async (req, res) => {
    try {
        const cars = await ford.find(); // Obtener todos los autos de Toyota desde la base de datos
        res.json(cars); // Enviar los datos como respuesta en formato JSON
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' }); // Manejar errores
    }
});
// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
