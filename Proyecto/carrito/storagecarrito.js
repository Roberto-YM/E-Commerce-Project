 // Función para cargar los productos en el carrito
 function cargarProductosEnCarrito() {
    var carritoDiv = document.getElementById("listaProductos");

    // Obtener los datos de la renta desde sessionStorage
    var rentalData = JSON.parse(sessionStorage.getItem('rentalData'));

    if (!rentalData) {
        carritoDiv.innerHTML = '<p>No hay productos en el carrito.</p>';
        return;
    }

    // Limpiar el contenedor antes de agregar la nueva información
    carritoDiv.innerHTML = '';

    // Crear el contenido HTML para los datos de la renta
    var cardProduct = `
        <div class="card mb-3">
            <div class="card-body">
                <h4 class="card-title">${rentalData.carName} <button type="button" class="btn btn-danger" onclick="eliminarProducto()"><i class="fas fa-trash-alt"></i></button></h4>
                <div class="mb-4">
                    <img src="${rentalData.img}" width="500" class="mx-auto d-block" alt="${rentalData.carName}">
                </div>
                <div class="mb-4">
                    <div class="input-group mb-4">
                        <span class="input-group-text">Precio de renta por día</span>
                        <input type="number" class="form-control" value="${rentalData.carPricePerDay}" readonly>
                        <span class="input-group-text">MXN</span>
                    </div>
                </div>
                <div>
                    <p><strong>Fecha Inicial:</strong> ${rentalData.startDate}</p>
                    <p><strong>Fecha Final:</strong> ${rentalData.endDate}</p>
                    <p><strong>Precio del Seguro:</strong> ${rentalData.insurancePrice} MXN</p>
                    <p><strong>Nombre del Seguro:</strong> ${rentalData.insuranceName}</p>
                    <p><strong>Total del Alquiler:</strong> ${rentalData.total} MXN</p>
                    <p><strong>Días Rentados:</strong> ${rentalData.daysRented}</p>
                </div>
            </div>
        </div>
    `;

    // Agregar la tarjeta al contenedor
    carritoDiv.innerHTML = cardProduct;
    cardTotal();
}

// Función para eliminar un producto del carrito
function eliminarProducto() {
    // Limpiar los datos del sessionStorage y la interfaz del carrito
    sessionStorage.removeItem('rentalData');
    document.getElementById("listaProductos").innerHTML = '<p>El producto ha sido eliminado del carrito.</p>';
    cardTotal(); // Actualizar el total después de eliminar el producto
}

// Función para calcular y mostrar el total del carrito
function cardTotal() {
    var carritoDiv = document.getElementById("cuenta_total");

    // Obtener los datos de la renta desde sessionStorage
    var rentalData = JSON.parse(sessionStorage.getItem('rentalData'));

    if (!rentalData) {
        carritoDiv.innerHTML = ''; // Limpiar el total si no hay productos en el carrito
        return;
    }

    // Calcular el total
    var total = rentalData.total;

    // Generar la tarjeta para el total de la compra
    var totalCard = `
    <div class="col-md-">
    <div class="card mb-3" style="box-shadow: 0 4px 8px rgba(0,0,0,0.2); border-radius: 8px;">
        <div class="card-body text-center" style="background-color: #fff; padding: 20px;">
            <h4 class="card-title" style="color: #000; margin-bottom: 15px;">Total de Renta:</h4>
            <h6 id="nombre_carro" style="color: #000; margin-bottom: 5px;">${rentalData.carName}</h6> <b id="dias">Cantidad de días: ${rentalData.daysRented}</b> 
            <br> <b id="cantidad">Precio por dia: $${rentalData.carPricePerDay} MXN</b>
            <h6 style="color: #000; margin-bottom: 5px;">Costo de Seguro </h6> <b id="cantidad">$${rentalData.insurancePrice} MXN</b><b> MXN</b>  <br></br>
            <h5 style="color: #28a745; margin-bottom: 20px;"><strong>Total: $${rentalData.total} MXN</strong></h5>
            <div class="d-flex justify-content-around mt-4">
                <button id="boton_pagar_carrito" class="btn btn-primary" style="width: 48%; padding: 10px; font-size: 16px; background-color: #007bff; border: none;">Pagar</button>
                <a href="cancel.html" class="btn btn-danger" style="width: 48%; padding: 10px; font-size: 16px; background-color: #dc3545; border: none;">Cancelar</a>
            </div>
        </div>
    </div>
</div>
    `;

    // Mostrar el totalCard en el contenedor correspondiente
    carritoDiv.innerHTML = totalCard;

    document.getElementById("boton_pagar_carrito").addEventListener("click", function(event) {
        event.preventDefault(); // Esto evita que el navegador siga el enlace o realice la acción predeterminada.
    
        fetch("http://localhost:3000/create-checkout-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                items: [
                    { id: 1, quantity: 3 },
                    { id: 2, quantity: 1 },
                ],
            }),
        })
        .then(res => {
            if (res.ok) return res.json();
            return res.json().then(json => Promise.reject(json));
        })
        .then(({ url }) => {
            window.location = url;
        })
        .catch(e => {
            console.error("Error en el proceso de pago:", e);
        });
    });
    
}

// Llamar a la función de inicialización cuando se carga la página
document.addEventListener("DOMContentLoaded", function() {
    cargarProductosEnCarrito();
});

