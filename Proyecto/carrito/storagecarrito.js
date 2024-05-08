// Función para iniciar la edición de una renta en el carrito
function iniciarEdicion(rentalKey) {
    // Habilitar campos para edición
    document.getElementById(rentalKey + '_startDate').disabled = false;
    document.getElementById(rentalKey + '_endDate').disabled = false;
    document.getElementById(rentalKey + '_insuranceType').disabled = false;

    // Obtener la fecha actual
    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().split('T')[0]; // Obtener la fecha en formato YYYY-MM-DD

    // Establecer la fecha mínima para el campo de inicio como la fecha actual
    document.getElementById(rentalKey + '_startDate').setAttribute('min', currentDateString);

    // Establecer la fecha mínima para el campo de fin como la fecha actual
    document.getElementById(rentalKey + '_endDate').setAttribute('min', currentDateString);
}


// Función para aplicar los cambios realizados en la edición
// Función para aplicar los cambios realizados en la edición
function aplicarCambios(rentalKey) {
    // Obtener los nuevos valores de los campos editables
    const startDate = document.getElementById(rentalKey + '_startDate').value;
    const endDate = document.getElementById(rentalKey + '_endDate').value;
    const insuranceType = document.getElementById(rentalKey + '_insuranceType').value;

    // Calcular la diferencia de días entre las fechas
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if(end < start){
        alert('Fechas incorrectas.')
        return;
    }

    // Obtener el precio del seguro según el tipo seleccionado
    let insurancePrice = 0;
    switch (insuranceType) {
        case 'Basico':
            insurancePrice = 8500; // Precio del seguro básico
            break;
        case 'Premium':
            insurancePrice = 15000; // Precio del seguro premium
            break;
        case 'Platinum':
            insurancePrice = 25000; // Precio del seguro platinum
            break;
        default:
            insurancePrice = 0;
            break;
    }

    // Calcular el nuevo total del alquiler
    const rentalData = JSON.parse(sessionStorage.getItem(rentalKey));
    const carPricePerDay = parseFloat(rentalData.carPricePerDay);
    const totalDays = diffDays;
    const totalInsurancePrice = insurancePrice;
    const totalRentalPrice = (carPricePerDay * totalDays) + totalInsurancePrice;

    // Actualizar los datos en sessionStorage
    rentalData.startDate = startDate;
    rentalData.endDate = endDate;
    rentalData.insuranceName = insuranceType;
    rentalData.insurancePrice = insurancePrice;
    rentalData.daysRented = diffDays;
    rentalData.total = totalRentalPrice.toFixed(2); // Actualizar el total del alquiler
    sessionStorage.setItem(rentalKey, JSON.stringify(rentalData));

    // Recargar los productos en el carrito
    cargarProductosEnCarrito();
}


////////////////////////////////////////////////////////////

// Función para cargar los productos en el carrito
function cargarProductosEnCarrito() {
    var carritoDiv = document.getElementById("listaProductos");

    // Obtener las rentas desde sessionStorage
    var rentalKeys = Object.keys(sessionStorage).filter(key => key.startsWith('rentalData'));

    if (rentalKeys.length === 0) {
        carritoDiv.innerHTML = '<p>No hay productos en el carrito.</p>';
        return;
    }

    // Limpiar el contenedor antes de agregar la nueva información
    carritoDiv.innerHTML = '';

    // Iterar sobre las rentas y crear tarjetas para cada una
    rentalKeys.forEach(function(key) {
        var rentalData = JSON.parse(sessionStorage.getItem(key));

        var cardProduct = `
        <div class="card mb-3">
        <div class="card-body">
            <h4 class="card-title">${rentalData.carName} <button type="button" class="btn btn-danger" onclick="eliminarProducto('${key}')"><i class="fas fa-trash-alt"></i></button></h4>
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
                <div class="d-flex mb-2">
                    <span class="input-group-text" style="width: 170px;"> <b> Fecha Inicial: </b></span>
                    <input id="${key}_startDate" type="date" class="form-control" value="${rentalData.startDate}" disabled >
                </div>
                <div class="d-flex mb-2">
                    <span class="input-group-text" style="width: 170px;"> <b> Fecha Final: </b></span>
                    <input id="${key}_endDate" type="date" class="form-control" value="${rentalData.endDate}" disabled >
                </div>
                <div class="d-flex mb-2">
                    <span class="input-group-text" style="width: 170px;"> <b> Precio del Seguro: </b></span>
                    <input type="text" class="form-control" value="${rentalData.insurancePrice} MXN" disabled >
                </div>
                <div class="d-flex mb-2">
                    <span class="input-group-text" style="width: 180px;"> <b> Nombre del Seguro: </b></span>
                    <select id="${key}_insuranceType" class="form-select" disabled >
                        <!-- Opciones de seguro -->
                        <option value="Basico" ${rentalData.insuranceName === 'Basico' ? 'selected' : ''}>Basico</option>
                        <option value="Premium" ${rentalData.insuranceName === 'Premium' ? 'selected' : ''}>Premium</option>
                        <option value="Platinum" ${rentalData.insuranceName === 'Platinum' ? 'selected' : ''}>Platinum</option>
                    </select>
                </div>
                <div class="d-flex mb-2">
                    <span class="input-group-text" style="width: 170px;"> <b> Total del Alquiler: </b></span>
                    <input type="text" class="form-control" value="${rentalData.total} MXN" disabled>
                </div>
                <div class="d-flex mb-2">
                    <span class="input-group-text" style="width: 170px;"> <b> Días Rentados:</b></span>
                    <input type="text" class="form-control" value="${rentalData.daysRented}" disabled >
                </div>
                <button type="button" class="btn btn-primary mb-2" onclick="iniciarEdicion('${key}')"><i class="fas fa-pencil-alt"></i> Editar</button>
                <button type="button" class="btn btn-success mb-2" onclick="aplicarCambios('${key}')">Confirmar</button>
                <button type="button" class="btn btn-danger mb-2" onclick="cancelarEdicion('${key}')">Cancelar</button>
            </div>
        </div>
    </div>
    
        `;

        // Agregar la tarjeta al contenedor
        carritoDiv.innerHTML += cardProduct;
    });
    // Calcular y mostrar el total del carrito
    cardTotal(rentalKeys);

}

// Función para eliminar un producto del carrito
function eliminarProducto(rentalKey) {
    // Eliminar la renta del sessionStorage
    sessionStorage.removeItem(rentalKey);
    // Volver a cargar los productos en el carrito
    cargarProductosEnCarrito();
}

// Función para calcular y mostrar el total del carrito
function cardTotal(rentalKeys) {
    
    var total = 0;
    // Iterar sobre las rentas y sumar los totales
    rentalKeys.forEach(function(key) {
        if (key.startsWith('rentalData')) {
            var rentalData = JSON.parse(sessionStorage.getItem(key));
            total += parseFloat(rentalData.total);
        }
    });

    // Mostrar el total del carrito
    var carritoTotalDiv = document.getElementById("cuenta_total");
    var totalCard = `
   
        <div class="col-md-">
            <div class="card mb-3" style="box-shadow: 0 4px 8px rgba(0,0,0,0.2); border-radius: 8px;">
                <div class="card-body text-center" style="background-color: #fff; padding: 20px;">
                    <h4 class="card-title" style="color: #000; margin-bottom: 15px;">Total de Renta:</h4>
                    <h5 style="color: #28a745; margin-bottom: 20px;"><strong>Total: $${total.toFixed(2)} MXN</strong></h5>
                    <div class="d-flex justify-content-around mt-4">
                        <button id="boton_pagar_carrito" class="btn btn-primary" style="width: 48%; padding: 10px; font-size: 16px; background-color: #007bff; border: none;">Pagar</button>
                        <a href="cancel.html" class="btn btn-danger" style="width: 48%; padding: 10px; font-size: 16px; background-color: #dc3545; border: none;">Cancelar</a>
                    </div>
                </div>
            </div>
        </div>

    `;
    carritoTotalDiv.innerHTML = totalCard;

    document.getElementById("boton_pagar_carrito").addEventListener("click", function(event) {
        var script = document.createElement('script');

        // Asignar la URL del script independiente
        script.src = './carrito.js'; // Reemplaza 'ruta/al/script.js' con la ruta real de tu archivo
    
        // Agregar el script al final del body para ejecutarlo
        document.body.appendChild(script);
        

        // Crear un array para almacenar los datos de las rentas
        let rentaDataArray = [];

        // Iterar sobre las claves del sessionStorage para obtener los datos de las rentas
        Object.keys(sessionStorage).forEach(function(key) {
            if (key.startsWith('rentalData')) {
                // Obtener los datos de la renta y agregarlos al array
                let rentalData = JSON.parse(sessionStorage.getItem(key));
                rentaDataArray.push(rentalData);
            }
        });

        // Enviar los datos de las rentas al servidor
        fetch("/products/rents", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(rentaDataArray),
        })
        .then(response => {
            if (response.ok) {
                console.log("Datos de renta enviados exitosamente.");
                console.log(rentaDataArray);

                // Una vez que los datos se hayan enviado correctamente, puedes limpiar el sessionStorage
                Object.keys(sessionStorage).forEach(function(key) {
                    if (key.startsWith('rentalData')) {
                        sessionStorage.removeItem(key);
                    }
                });
                // Luego, puedes redirigir al usuario a una página de confirmación o éxito
                //window.location.href = "/checkout-success"; // Cambia esto a la URL de tu página de éxito
            } else {
                console.error("Error al enviar datos de renta al servidor.");
                // Puedes mostrar un mensaje de error al usuario o manejarlo de otra manera
            }
        })
        .catch(error => {
            console.error("Error en la solicitud fetch:", error);
        });
    });
}

// Llamar a la función de inicialización cuando se carga la página
document.addEventListener("DOMContentLoaded", function() {
    cargarProductosEnCarrito();
    
   
});


