let sign_up_btn = document.getElementById('sign_up_btn');
sign_up_btn.addEventListener('click', function(){
    findUser();
});

function findUser() {
    event.preventDefault();
    
    const formData = new FormData(document.getElementById('userForm'));
    const userData = {
        nombre: formData.get('nombre'),
        email: formData.get('email'),
        pswd: formData.get('pswd')
    };

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/products/users', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const responseData = JSON.parse(xhr.responseText);
            console.log(responseData);
            alert('Usuario creado exitosamente');
        } else if (xhr.status === 400) {
            alert('El correo ya está en uso');
        } else {
            console.error('Error al crear usuario.');
            alert('Error al crear usuario');
        }
    };
    xhr.onerror = function () {
        console.error('Error de red al buscar usuario.');
        alert('Error al crear usuario');
    };
    xhr.send(JSON.stringify(userData));
}

function loginUser() {
    event.preventDefault();
    
    // Obtener los datos del formulario de inicio de sesión
    const formData = new FormData(document.getElementById('loginForm'));
    const loginData = {
        email: formData.get('email'),
        pswd: formData.get('pswd')
    };

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/products/login', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const responseData = JSON.parse(xhr.responseText);
            console.log(responseData);
            alert('Inicio de sesión exitoso');
            localStorage.setItem('token', responseData.token); // Almacenar el token en el almacenamiento local
            // Redireccionar a otra página, si es necesario
            // window.location.href = 'url_de_redireccionamiento';
        } else if (xhr.status === 400) {
            alert('Credenciales inválidas');
        } else {
            console.error('Error al iniciar sesión.');
            alert('Error al iniciar sesión');
        }
    };
    xhr.onerror = function () {
        console.error('Error de red al iniciar sesión.');
        alert('Error al iniciar sesión');
    };
    xhr.send(JSON.stringify(loginData));
}

document.addEventListener('DOMContentLoaded', function() {
    // Obtener el botón de inicio de sesión
    let loginbtn = document.getElementById('log_in_btn');

    // Agregar un event listener al botón de inicio de sesión
    loginbtn.addEventListener('click', function(){
        // Llamar a la función loginUser() cuando se haga clic en el botón
        loginUser();
    });
});
