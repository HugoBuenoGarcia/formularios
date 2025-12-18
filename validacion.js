// Expresión regular para validar el formato de correo electrónico
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Función para alternar la visibilidad de la contraseña
function togglePasswordVisibility(fieldId) {
    const passwordField = document.getElementById(fieldId);
    const toggleIcon = document.getElementById('toggle' + fieldId.replace('login', 'Login').replace('reg', 'Reg') + 'Icon');

    if (passwordField.type === "password") {
        passwordField.type = "text";
        // Cambiar el icono a "ojo abierto"
        if (toggleIcon) {
            toggleIcon.classList.remove('fa-eye-slash');
            toggleIcon.classList.add('fa-eye');
        }
    } else {
        passwordField.type = "password";
        // Cambiar el icono a "ojo tachado"
        if (toggleIcon) {
            toggleIcon.classList.remove('fa-eye');
            toggleIcon.classList.add('fa-eye-slash');
        }
    }
}

// Función para validar el formato del correo
function validateEmail(emailId, errorId) {
    const emailInput = document.getElementById(emailId);
    const errorMessage = document.getElementById(errorId);
    
    if (!emailRegex.test(emailInput.value)) {
        errorMessage.textContent = "Formato de correo electrónico no válido.";
        emailInput.classList.add('invalid');
        return false;
    } else {
        errorMessage.textContent = "";
        emailInput.classList.remove('invalid');
        return true;
    }
}

// Función para validar la coincidencia de contraseñas (solo en registro)
function validatePasswordMatch() {
    const psw1 = document.getElementById('regPassword1').value;
    const psw2 = document.getElementById('regPassword2').value;
    const errorMsg = document.getElementById('passwordMatchError');
    const psw2Input = document.getElementById('regPassword2');

    if (psw1 !== psw2) {
        errorMsg.textContent = "Las contraseñas no coinciden.";
        psw2Input.classList.add('invalid');
        return false;
    } else {
        errorMsg.textContent = "";
        psw2Input.classList.remove('invalid');
        return true;
    }
}

// Event Listeners para validación en tiempo real
document.addEventListener('DOMContentLoaded', () => {
    // 1. Lógica para LOGIN
    const loginEmailInput = document.getElementById('loginEmail');
    if (loginEmailInput) {
        // Validación del correo al perder el foco
        loginEmailInput.addEventListener('blur', () => {
            validateEmail('loginEmail', 'emailError');
        });
    }

    // 2. Lógica para REGISTRO
    const regEmailInput = document.getElementById('regEmail');
    const regPassword2Input = document.getElementById('regPassword2');
    
    if (regEmailInput) {
        // Validación del correo al perder el foco
        regEmailInput.addEventListener('blur', () => {
            validateEmail('regEmail', 'regEmailError');
        });
    }
    
    if (regPassword2Input) {
        // Validación de coincidencia de contraseñas al perder el foco en Psw2
        regPassword2Input.addEventListener('blur', validatePasswordMatch);
    }
});
