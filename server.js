require("dotenv").config(); //stripe

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const { router, validateAdmin } = require('./Proyecto/controllers/router');

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

app.use('/',router);


// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});




/*const storeItems = new Map([
    [1, { priceInCents: 10000, name: "Learn React Today" }],   // Mapa de la informacion que contiene el carrit de stripe
    [2, { priceInCents: 20000, name: "Learn CSS Today" }],          
]);*/
app.post("/create-checkout-session", async (req, res) => {    //stripe checkout session
  try {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: req.body.items.map(item => {
            return {
                price_data: {
                    currency: "MXN",
                    product_data: {
                        name: item.carName, // Ajusta según la estructura de tus datos
                        /*Image: item.img*/
                        images: [item.img],
                        
                        
                    },
                    unit_amount: item.total * 100, // Ajusta según la estructura de tus datos
                },
                quantity: 1, // Ajusta según la estructura de tus datos
            }
        }),
        success_url: `${process.env.CLIENT_URL}/succes.html`,
        cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
    });
    res.json({ url: session.url });
} catch (e) {
    res.status(500).json({ error: e.message });
}
});


