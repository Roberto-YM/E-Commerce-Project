  
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


function abrirModal() {
    var modalContent = `
    <div id="id01" class="w3-modal">
    <div class="w3-modal-content w3-card-4 w3-animate-zoom" style="max-width:600px">
      <div class="w3-center"><br>
        <span onclick="document.getElementById('id01').style.display='none'" class="w3-button w3-xlarge w3-hover-red w3-display-topright" title="Close Modal">&times;</span>
        <p  style="color: black;"><b>RetroGarage</b></p>
      </div>

      <form class="w3-container" action="/rent_car.php">
        <div class="w3-section">
          <label style="color: black;"><b>Email</b></label>
          <input class="w3-input w3-border w3-margin-bottom" type="email" name="email" required>

          <label  style="color: black;"><b>Nombre/s</b></label>
          <input class="w3-input w3-border w3-margin-bottom" type="text" name="full_name" required>

          <label  style="color: black;"><b>Apellido/s</b></label>
          <input class="w3-input w3-border w3-margin-bottom" type="text" name="last_name" required>

          <label  style="color: black;"><b>Numero de Adultos</b></label><br>
          <p style="color: black;"><input type="checkbox" onclick="handleCheckboxClick(this); handleAdultCheckboxClick(this);" > 1</p>
          <p style="color: black;"><input type="checkbox" onclick="handleCheckboxClick(this); handleAdultCheckboxClick(this);" > 2</p>
          <p style="color: black;"><input type="checkbox" onclick="handleCheckboxClick(this); handleAdultCheckboxClick(this);"> 3</p>
          <p style="color: black;"><input type="checkbox" onclick="handleCheckboxClick(this); handleAdultCheckboxClick(this);"> 4</p>
          <p style="color: black;"><input type="checkbox" onclick="handleCheckboxClick(this); handleAdultCheckboxClick(this);"> 5</p>

          <label  style="color: black;"><b>Numero de Niños</b></label><br>
          <p style="color: black;"><input type="checkbox" class="child-checkbox" onclick="handleCheckboxClick(this);" > 1</p>
          <p style="color: black;"><input type="checkbox" class="child-checkbox" onclick="handleCheckboxClick(this);" > 2</p>
          <p style="color: black;"><input type="checkbox" class="child-checkbox" onclick="handleCheckboxClick(this);"> 3</p>
          <p style="color: black;"><input type="checkbox" class="child-checkbox" onclick="handleCheckboxClick(this);"> 4</p>
          <p style="color: black;"><input type="checkbox" class="child-checkbox" onclick="handleCheckboxClick(this);"> 5</p>

          <label  style="color: black;"><b>Tipo de Seguro</b></label>
          <select class="w3-select w3-border" name="insurance_type" required>
            <option value="" disabled selected>Escoge un seguro</option>
            <option value="Basic">Basic</option>
            <option value="Premium">Premium</option>
            <option value="Platinum">Platinum</option>
          </select>

          <label  style="color: black;"><b>Descripción </b></label>
          <textarea class="w3-input w3-border w3-margin-bottom" name="insurance_description" required></textarea>

          <label  style="color: black;"><b>Fecha de inicial</b></label>
          <input class="w3-input w3-border w3-margin-bottom" type="date" name="start_date" required>

          <label  style="color: black;"><b>Fecha Final</b></label>
          <input class="w3-input w3-border w3-margin-bottom" type="date" name="end_date" required>

          <label  style="color: black;"><b>Tipo de carro</b></label>
          <select class="w3-select w3-border" name="car_type" required>
            <option value="" disabled selected>Escoge un carro  </option>
            <option value="Corolla 2024">Corolla 2024</option>
            <option value="Sinea 2023">Sinea 2023</option>
            <option value="Prius 2024">Prius 2024</option>
            <option value="Rav4 2024">Rav4 2024</option>
            <option value="Yaris 2024">Yaris 2024</option>
            <option value="Tacoma 2024">Tacoma 2023</option>
          </select>

          <button class="w3-button w3-block w3-green w3-section w3-padding" type="submit">Rent Now</button>
        </div>
      </form>

      <div class="w3-container w3-border-top w3-padding-16 w3-light-grey">
        <button onclick="document.getElementById('id01').style.display='none'" type="button" class="w3-button w3-red">Cancel</button>
        <span class="w3-right w3-padding w3-hide-small">Need help? Contact <a href="#">support</a></span>
      </div>
    </div>
  </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalContent);
    document.getElementById('id01').style.display = 'block';
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
