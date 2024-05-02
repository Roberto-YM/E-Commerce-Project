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
}

function eliminarProducto() {
    // Limpiar los datos del sessionStorage y la interfaz del carrito
    sessionStorage.removeItem('rentalData');
    document.getElementById("listaProductos").innerHTML = '<p>El producto ha sido eliminado del carrito.</p>';
}




/*
// Función para habilitar la edición de la cantidad de un producto
function habilitarEdicion(id) {
    // Ocultar el botón de lápiz y mostrar los botones de confirmar y cancelar
    document.getElementById(cantidad-${id}).readOnly = false;
    document.getElementById(btnConfirmar-${id}).classList.remove('d-none');
    document.getElementById(btnCancelar-${id}).classList.remove('d-none');
    document.querySelector(#btnConfirmar-${id}).addEventListener('click', () => confirmarEdicion(id));
    document.querySelector(#btnCancelar-${id}).addEventListener('click', () => cancelarEdicion(id));


    // Obtener el input de cantidad actual
    var cantidadInput = document.getElementById(cantidad-${id});

    // Habilitar el input para editar la cantidad
    cantidadInput.removeAttribute('readonly');
}

// Función para confirmar la edición de la cantidad de un producto
function confirmarEdicion(id) {
    // Obtener el nuevo valor de cantidad
    var nuevaCantidad = parseInt(document.getElementById(cantidad-${id}).value);

    // Actualizar la cantidad en sessionStorage
    editarCantidad(id, nuevaCantidad);

    // Ocultar los botones de confirmar y cancelar, y mostrar el botón de editar
    document.getElementById(btnConfirmar-${id}).classList.add('d-none');
    document.getElementById(btnCancelar-${id}).classList.add('d-none');
    


    // Deshabilitar el input de cantidad
    document.getElementById(cantidad-${id}).setAttribute('readonly', 'true');
}

// Función para cancelar la edición de la cantidad de un producto
function cancelarEdicion(id) {
    // Ocultar los botones de confirmar y cancelar, y mostrar el botón de editar
    document.getElementById(btnConfirmar-${id}).classList.add('d-none');
    document.getElementById(btnCancelar-${id}).classList.add('d-none');
   
    // Recargar las tarjetas del carrito sin realizar cambios
    cargarProductosEnCarrito();
}
*/

// Función para eliminar un producto del carrito
function eliminarProducto(id) {
    // Obtener los productos del sessionStorage
    var productosEnCarrito = JSON.parse(sessionStorage.getItem('carrito')) || [];
    
    // Filtrar los productos para eliminar el que tiene el ID proporcionado
    var nuevosProductos = productosEnCarrito.filter(producto => producto.id !== id);
    
    // Guardar los nuevos productos en el sessionStorage
    sessionStorage.setItem('carrito', JSON.stringify(nuevosProductos));
    
    // Recargar las tarjetas del carrito
    cargarProductosEnCarrito();
    cardTotal();
}

/*
// Función para editar la cantidad de un producto en el carrito
function editarCantidad(id, nuevaCantidad) {
    // Obtener los productos del sessionStorage
    var productosEnCarrito = JSON.parse(sessionStorage.getItem('carrito')) || [];
    
    // Encontrar el producto en el carrito
    var productoEncontrado = productosEnCarrito.find(producto => producto.id === id);
    
    // Actualizar la cantidad del producto
    if (productoEncontrado) {
        productoEncontrado.cantidad = nuevaCantidad;
    }
    
    // Guardar los productos actualizados en el sessionStorage
    sessionStorage.setItem('carrito', JSON.stringify(productosEnCarrito));
    
    // Recargar las tarjetas del carrito
    cargarProductosEnCarrito();
    cardTotal();
}*/

// Llamar a la función de inicialización cuando se carga la página
document.addEventListener("DOMContentLoaded", function() {
    cardTotal();
    cargarProductosEnCarrito();
});





function cardTotal() {
    var carritoDiv = document.getElementById("cuenta_total");

    // Obtener los productos del sessionStorage
    var productosEnCarrito = JSON.parse(sessionStorage.getItem('carrito')) || [];
    
    // Calcular el total de la compra
    var total = productosEnCarrito.reduce((acc, producto) => {
        return acc + (producto.price * producto.cantidad);
    }, 0);

    // Generar la tarjeta para el total de la compra
    var totalCard = `
        <div class="card">
            <div class="card-body">
                <h4 class="card-title"><b>Total de la Compra:</b></h4>
    `;
    
    // Agregar cada producto del carrito al totalCard
    productosEnCarrito.forEach(producto => {
        totalCard += `
            <p class="card-text"><b>${producto.name}: </b> ${producto.cantidad} x $${producto.price} MXN</p>
            <hr>
        `;
    });
    
    // Agregar el total al totalCard
    totalCard += `
            <p class="card-text"><b>TOTAL: $${total} MXN</b></p>
            <hr>
            <button type="submit" id="btn_total" class="btn btn-primary">Pagar.</button><br><br>
            <button type="submit" id="btn_total" class="btn btn-danger">Cancelar.</button>
            </div>
        </div>
    `;

    // Mostrar el totalCard en el contenedor correspondiente
    carritoDiv.innerHTML = totalCard;
}

// Llamar a la función de inicialización cuando se carga la página
document.addEventListener("DOMContentLoaded", function() {
    cardTotal();
    cargarProductosEnCarrito();
});