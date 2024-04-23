document.addEventListener("DOMContentLoaded", function() {
    const menuIcon = document.getElementById("menu-icon");
    const closeIcon = document.getElementById("close-icon");
    const navbar = document.getElementById("navbar");

    const links = [
        "Home", "../home/home.html",
        "About", "../About/About.html",
        "Ingresar", "../Navbar/modal.html",
        "Carrito", "../carrito/carrito.html",
    ];

    for (let i = 0; i < links.length; i += 2) {
        const text = links[i];
        const url = links[i + 1];

        const anchor = document.createElement("a");
        anchor.textContent = text;
        anchor.href = url;
        anchor.style.setProperty("--i", i / 2);

        navbar.appendChild(anchor);
    }

    menuIcon.addEventListener("click", function() {
        navbar.classList.add("show");
    });

    closeIcon.addEventListener("click", function() {
        navbar.classList.remove("show");
    });
});
