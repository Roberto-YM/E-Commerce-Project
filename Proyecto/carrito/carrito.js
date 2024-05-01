document.getElementById("boton_pagar_carrito").addEventListener("click", function(event) {
    event.preventDefault(); // Esto evita que el navegador siga el enlace o realice la acción predeterminada.
    console.log("Botón pagar clickeado, se ejecuta fetch");

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
