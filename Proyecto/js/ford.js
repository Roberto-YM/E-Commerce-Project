function obtenerProductos() {
    const url = "http://localhost:3000/api/ford"; // Cambia la URL según la ruta de tu servidor

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject(new Error('Error al cargar los productos'));
            }
        };

        xhr.onerror = function() {
            reject(new Error('Error de red al cargar los productos'));
        };

        xhr.send();
    });
}

function agregarCards() {
    // Obtiene el contenedor donde se agregarán las cards
    var container = document.getElementById("product-container");

    // Obtener los productos del servidor
    obtenerProductos()
        .then(data => {
            // Genera las cards y las agrega al contenedor
            data.forEach(function(car) {
                var card = document.createElement("div");
                card.className = "product";
                card.innerHTML = `
                    <img src="${car.img}" width="360px" alt="${car.nombre}">
                    <div class="product-info">
                        <h4 class="product-title">${car.nombre}</h4>
                        <p class="product-price">$${car.Precio} - el dia</p>
                        <a href="#" class="product-btn rent-btn">Renta Ahora</a>
                    </div>
                `;
                container.appendChild(card);
            });
            // Agregar event listener al botón de rentar después de agregar las cards
            document.querySelectorAll('.rent-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    abrirModal();
                });
            });
        })
        .catch(error => console.error('Error:', error));
}

// Llama a la función para agregar las cards al cargar el contenido
agregarCards();

