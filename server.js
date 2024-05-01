require("dotenv").config(); //stripe

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const port = 3000;
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY); //stripe

app.use(cors());
app.use(express.static('./Proyecto'));
app.use(express.json());
app.use(express.urlencoded());

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


// Ruta para obtener todos los autos de todas las marcas
app.get('/api/all-cars', async (req, res) => {
    try {
        // Utilizamos un array para almacenar todos los autos de cada marca
        let allCars = [];

        // Obtenemos los autos de cada marca y los agregamos al array
        const toyotaCars = await Toyota.find();
        allCars = allCars.concat(toyotaCars);

        const chevroletCars = await chevrolet.find();
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


//users

//definimos el esquema
let userSchema = mongoose.Schema({
    nombre: String,
    email: String,
    Password:String,
});



app.get('/',function(req,res){
    res.sendFile( __dirname + '/Proyecto/home/home.html')
});

app.post('/', (req, res) => {
    // Create the model
    let User = mongoose.model('users', userSchema);

    // Extract data from request body
    let { nombre, email, pswd } = req.body;

    // Create a new user instance
    let newUser = new User({ nombre, email, Password: pswd });

    // Save the user to the database
    newUser.save().then((doc) => {
        console.log("Usuario creado: ", doc);
        res.status(200).json({ success: true, message: "Usuario creado exitosamente" });
    }).catch((err) => {
        console.error("Error al crear usuario: ", err);
        res.status(200).json({ success: false, message: "Error al crear usuario"});
    });
});

app.post("/create-checkout-session", async (req, res) => {    //stripe checkout session
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: req.body.items.map(item => {
          const storeItem = storeItems.get(item.id)
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: storeItem.name,
              },
              unit_amount: storeItem.priceInCents,
            },
            quantity: item.quantity,
          }
        }),
        success_url: `${process.env.CLIENT_URL}/success.html`,
        cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
      });
      res.json({ url: session.url });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
});



// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});