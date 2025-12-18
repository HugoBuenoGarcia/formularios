// Función de Registro (registerForm)
function authRegister() {
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword1').value;
    const nombre = document.getElementById('regNombre').value;
    const direccion = document.getElementById('regDireccion').value;
    const nacimiento = document.getElementById('regNacimiento').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Registro exitoso en Firebase Auth
            const user = userCredential.user;
            alert("¡Registro exitoso! Ya puedes acceder.");
            
            // Guardar datos adicionales del usuario en Firestore
            return db.collection("usuarios").doc(user.uid).set({
                nombre: nombre,
                direccion: direccion,
                nacimiento: nacimiento,
                email: email,
                fechaRegistro: firebase.firestore.FieldValue.serverTimestamp()
            });
        })
        .then(() => {
            // Redirigir al login después de guardar los datos
            window.location.href = 'login.html';
        })
        .catch((error) => {
            // Manejo de errores (ej. correo ya en uso, contraseña débil)
            console.error("Error en el registro:", error);
            alert("Error al registrar: " + error.message);
        });
}


// Función de Login (loginForm)
function authLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Acceso exitoso
            const user = userCredential.user;
            alert("¡Acceso exitoso! Bienvenido.");

            // Registrar la fecha y hora de entrada en Firestore
            // Usamos un sub-colección de logs para el usuario
            return db.collection("usuarios").doc(user.uid).collection("logs").add({
                tipo: "login",
                fechaHora: firebase.firestore.FieldValue.serverTimestamp()
            });
        })
        .then(() => {
            // Redirigir al área de usuario
            // window.location.href = 'area-privada.html'; 
            console.log("Fecha de acceso registrada.");
        })
        .catch((error) => {
            // Manejo de errores (ej. usuario no encontrado, contraseña incorrecta)
            console.error("Error en el acceso:", error);
            alert("Error al acceder: " + error.message);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Llamamos a la función de validacion.js antes de proceder
            if (typeof validateEmail === "function" && validateEmail('loginEmail', 'emailError')) {
                authLogin(); 
            }
        });
    }

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const isEmailValid = validateEmail('regEmail', 'regEmailError');
            const passwordsMatch = validatePasswordMatch();

            if (isEmailValid && passwordsMatch) {
                authRegister();
            }
        });
    }
});