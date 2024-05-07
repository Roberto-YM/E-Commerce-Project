function handleCheckboxClick(checkbox) {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    if (checkbox.checked) {
        checkboxes.forEach(function (cb) {
            if (cb !== checkbox) {
                cb.disabled = true;
            }
        });
    } else {
        checkboxes.forEach(function (cb) {
            cb.disabled = false;
        });
    }
}

function handleAdultCheckboxClick(adultCheckbox) {
    var childCheckboxes = document.querySelectorAll('.child-checkbox');
    childCheckboxes.forEach(function (cb) {
        cb.disabled = !adultCheckbox.checked;
    });
}

function handleFormSubmit(event) {
    event.preventDefault(); // Evitar el envío del formulario
    // Aquí puedes agregar la lógica para guardar la renta o simplemente mostrar un mensaje de éxito
    alert("¡La renta se guardó con éxito!");
}

function abrirModal(car) {
    // Eliminar el modal existente si hay alguno
    var existingModal = document.getElementById('id01');
    if (existingModal) {
        existingModal.remove();
    }
    //document.querySelector('form').addEventListener('submit', handleFormSubmit);
     // Detalles de los seguros
     const seguros = [
        { nombre: "Basico", precio: 8500, descripcion: "Responsabilidad civil: Cubre los daños causados a terceros en caso de un accidente en el que el conductor sea responsable. Esto puede incluir daños a vehículos de otras personas, propiedades u lesiones corporales. Cobertura de lesiones personales: Proporciona cobertura para gastos médicos del conductor y sus pasajeros en caso de un accidente, independientemente de quién tenga la culpa. Cobertura de daños a la propiedad: Puede cubrir los costos de reparación o reemplazo de vehículos u otras propiedades dañadas en un accidente en el que el conductor sea responsable." },
        { nombre: "Premium", precio: 15000, descripcion: "Cobertura ampliada de responsabilidad civil: Ofrece límites de cobertura más altos para proteger contra reclamos por daños a terceros en caso de un accidente en el que el conductor sea responsable. Esto puede incluir cobertura para daños a la propiedad y lesiones corporales.Cobertura de daños por colisión: Cubre los costos de reparación o reemplazo del vehículo alquilado en caso de colisión, independientemente de quién tenga la culpa. Esto puede incluir daños causados por accidentes con otros vehículos, objetos fijos o condiciones climáticas adversas. Cobertura integral: Protege contra daños no relacionados con colisiones, como robo, vandalismo, incendio, inundación u otros eventos fuera del control del conductor. Asistencia en carretera: Proporciona servicios de emergencia en carretera, como remolque, cambio de neumáticos, suministro de combustible, cerrajería, etc. Cobertura de alquiler de autos: Reembolsa los cargos de alquiler diarios mientras el vehículo está siendo reparado debido a un accidente cubierto. Cobertura de lesiones personales del conductor: Proporciona beneficios adicionales para cubrir gastos médicos, pérdida de ingresos y otros costos asociados si el conductor resulta herido en un accidente." },
        { nombre: "Platinum", precio: 25000, descripcion: "Cobertura ampliada de responsabilidad civil: Ofrece los límites de cobertura más altos disponibles para proteger contra reclamos por daños a terceros en caso de accidente, incluyendo daños a la propiedad y lesiones corporales. Cobertura de daños por colisión y cobertura integral: Proporciona una amplia protección contra daños al vehículo alquilado, ya sea por colisión, robo, vandalismo, incendio, inundación u otros eventos. Asistencia en carretera ampliada: Incluye servicios adicionales de asistencia en carretera, como mayor límite de distancia para remolque, cobertura de más tipos de problemas mecánicos, etc. Cobertura de alquiler de autos mejorada: Ofrece un reembolso más generoso de los cargos de alquiler diarios mientras el vehículo está siendo reparado debido a un accidente cubierto. Beneficios de viaje:  incluye beneficios adicionales relacionados con el viaje, como cobertura de cancelación de viaje, retrasos de viaje, pérdida de equipaje, entre otros. Servicio de concierge: Algunas pólizas Platinum pueden ofrecer servicios de conserjería, como reservas de hoteles, recomendaciones de restaurantes, organización de actividades, etc." }
    ];

    // Generar opciones de seguros para el select
    var options = seguros.map(function(seguro) {
        return `<option value="${seguro.nombre}" data-precio="${seguro.precio}" data-descripcion="${seguro.descripcion}">${seguro.nombre} - $${seguro.precio}</option>`;
    }).join('');
    var modalContent = `
    <div id="id01" class="w3-modal">
    <div class="w3-modal-content w3-card-4 w3-animate-zoom" style="max-width:600px">
      <div class="w3-center"><br>
        <span onclick="document.getElementById('id01').style.display='none'" class="w3-button w3-xlarge w3-hover-red w3-display-topright" title="Close Modal">&times;</span>
        <img src="${car.img}" width="300px" name="img_car" alt="${car.nombre}">
      </div>

      <form class="w3-container" >
        <div class="w3-section">
          <label style="color: black;"><b>Email</b></label>
          <input class="w3-input w3-border w3-margin-bottom" type="email" name="correo" required>

          <label  style="color: black;"><b>Nombre/s</b></label>
          <input class="w3-input w3-border w3-margin-bottom" type="text" name="full_name" required>

          <label  style="color: black;"><b>Apellido/s</b></label>
          <input class="w3-input w3-border w3-margin-bottom" type="text" name="last_name" required>

          <label  style="color: black;"><b>Numero de Adultos</b></label><br>
          <p style="color: black;"><input type="checkbox" onclick="handleCheckboxClick(this); handleAdultCheckboxClick(this);" > 1-3</p>
          <p style="color: black;"><input type="checkbox" onclick="handleCheckboxClick(this); handleAdultCheckboxClick(this);" > 4-6</p>
          <p style="color: black;"><input type="checkbox" id="adult" onclick="handleCheckboxClick(this); handleAdultCheckboxClick(this);" > 6-8</p>
          <label  style="color: black;"><b>Numero de Niños</b></label><br>
          <p style="color: black;"><input type="checkbox" id="niño" class="child-checkbox" onclick="handleCheckboxClick(this);" > 1-3</p>
          <p style="color: black;"><input type="checkbox" id="niño" class="child-checkbox" onclick="handleCheckboxClick(this);" > 4-6</p>
          <p style="color: black;"><input type="checkbox" id="niño" class="child-checkbox" onclick="handleCheckboxClick(this);" > 6-8 </p>

          <label style="color: black;"><b>Tipo de Seguro</b></label>
                    <select class="w3-select w3-border" name="insurance_type" id="insurance_type" required>
                        <option value="" disabled selected>Escoge un seguro</option>
                        ${options}
                    </select>

                    <label style="color: black;"><b>Descripción del Seguro</b></label>
                    <textarea class="w3-input w3-border w3-margin-bottom" name="insurance_description" id="insurance_description" readonly rows="15"></textarea>
                    <label  style="color: black;"><b>Fecha de inicial</b></label>
                    <input class="w3-input w3-border w3-margin-bottom" type="date" name="start_date" required>
                    <label  style="color: black;"><b>Fecha Final</b></label>
                    <input class="w3-input w3-border w3-margin-bottom" type="date" name="end_date" required>
                    <label  style="color: black;"><b>Tipo de carro: </b></label>
                    <label  style="color: black;" name="car_name">${car.nombre}</label><br>
                    <label  style="color: black;" name="car_precio"><b>Precio: </b>$${car.Precio} - el día</label>
                    <input type="hidden" name="car_name" value="${car.nombre}">
                    <input type="hidden" name="car_precio" value="${car.Precio}">
                    <hr>
                    <h4 style="color: black;"><b>Desglose de la Renta:</b></h4>
                    <div id="rent-breakdown"></div>
                    
          

          <button id="rentNowButton" class="w3-button w3-block w3-green w3-section w3-padding" type="submit" >Rent Now</button>
        </div>
      </form>

      <div class="w3-container w3-border-top w3-padding-16 w3-light-grey">
        <button onclick="document.getElementById('id01').style.display='none'" type="button" class="w3-button w3-red">Cancel</button>
        <span class="w3-right w3-padding w3-hide-small">Need help? Contact <a href="#">support</a></span>
      </div>
    </div>
  </div>
    `;
   // Agregar el modal al documento y mostrarlo
   document.body.insertAdjacentHTML('beforeend', modalContent);
   document.getElementById('id01').style.display = 'block';
   document.getElementById('rentNowButton').addEventListener('click', saveRentalToSession);

   // Agregar evento change al select para actualizar la descripción del seguro seleccionado
   document.getElementById('insurance_type').addEventListener('change', function() {
       var selectedOption = this.options[this.selectedIndex];
       document.getElementById('insurance_description').value = selectedOption.getAttribute('data-descripcion');
   });

   document.getElementsByName('end_date')[0].addEventListener('change', function() {
    var carPrecio = car.Precio;
    var selectedOption = document.getElementById('insurance_type').options[document.getElementById('insurance_type').selectedIndex];
    var precioSeguro = parseInt(selectedOption.getAttribute('data-precio'));
    var startDate = new Date(document.getElementsByName('start_date')[0].value);
    var endDate = new Date(this.value);
    var dias = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)); // Calcular días redondeados hacia arriba
    var precioPorDia = carPrecio * dias;
    var preciTotal = precioPorDia + precioSeguro
    var rentBreakdown = `
    <input type="hidden" name="seguro_precio" value="${precioSeguro}">
    <input type="hidden" name="car_price_per_day" value="${carPrecio}">
    <input type="hidden" name="dias" value="${dias}">
    <input type="hidden" name="total" value="${preciTotal}">
    <p style="color: black;">Precio del seguro: $${precioSeguro}</p>
    <p style="color: black;">Precio del carro por día: $${carPrecio}</p>
    <p style="color: black;">Cantidad de días: ${dias}</p>
    <p style="color: black;">Total por días de alquiler: $${precioPorDia}</p>
    <p style="color: black;">Total de la renta: $${preciTotal}</p>
`;
document.getElementById('rent-breakdown').innerHTML = rentBreakdown;


});

   
}

function saveRentalToSession() {
    // Obtiene los datos del formulario y los elementos del DOM
    const email = document.querySelector('[name="correo"]').value;
    const fullName = document.querySelector('[name="full_name"]').value;
    const lastName = document.querySelector('[name="last_name"]').value;
    const startDate = document.querySelector('[name="start_date"]').value;
    const endDate = document.querySelector('[name="end_date"]').value;
    const carName = document.querySelector('[name="car_name"]').innerHTML;
    const carPricePerDay = document.querySelector('[name="car_price_per_day"]').value;
    const selectedInsurance = document.getElementById('insurance_type').selectedOptions[0];
    const insuranceName = selectedInsurance.value;
    const insurancePrice = selectedInsurance.getAttribute('data-precio');
    const total = document.querySelector('[name="total"]').value;
    const img = document.querySelector('[name="img_car"]').getAttribute('src');

    // Calcula los días de renta
    const start = new Date(startDate);
    const end = new Date(endDate);
    const daysRented = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    // Consultar el contador actual y generar la nueva clave única
    let rentalCounter = sessionStorage.getItem('rentalCounter');
    if (!rentalCounter) {
        rentalCounter = 1;
    } else {
        rentalCounter = parseInt(rentalCounter) + 1;
    }
    const rentalKey = `rentalData_${rentalCounter}`;

    // Crea el objeto con los datos de la renta
    const rentalData = {
        email,
        fullName,
        lastName,
        startDate,
        endDate,
        daysRented,
        carName,
        carPricePerDay,
        insuranceName,
        insurancePrice,
        total,
        img
    };

    // Almacena los datos en sessionStorage con la nueva clave única
    sessionStorage.setItem(rentalKey, JSON.stringify(rentalData));
    
    // Actualiza el contador en sessionStorage
    sessionStorage.setItem('rentalCounter', rentalCounter);

    // Muestra confirmación al usuario
    alert("¡Información de la renta guardada con éxito!");
}


function setupModalListeners() {
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('w3-button') || event.target.classList.contains('w3-modal')) {
            document.getElementById('id01').style.display = 'none';
        }
    });
}

// Llama a la función para configurar los listeners del modal
setupModalListeners();
