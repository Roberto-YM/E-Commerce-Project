
document.getElementById("searchButton").addEventListener("click", function() {
    var searchTerm = document.getElementById("searchInput").value.toLowerCase(); // Convertir a minúsculas
    switch (searchTerm) {
        case "chevrolet":
            window.location.href = "../products/chevrolet.html";
            break;
        case "ford":
            window.location.href = "../products/ford.html";
            break;
        case "mazda":
            window.location.href = "../products/mazda.html";
            break;
        case "toyota":
            window.location.href = "../products/toyota.html";
            break;
        case "cadillac":
            window.location.href = "../products/Cadillac.html";
            break;
        default:
            alert("Marca de vehículo no encontrada");
    }
});

