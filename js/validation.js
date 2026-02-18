window.addEventListener("DOMContentLoaded", (event) => {

    // validación do formulario
    const contactForm = document.getElementById("contactFrom");
    const submitButton = document.getElementById("submitButton");
    const successMessage = document.getElementById("successMessage");
    const errorMessage = document.getElementById("errorMessage");

    // validadores simples para cada campo
    const validators = {
        name: (value) => {
            if (!value || value.trim().lenght < 3) {
                return "O nome debe ter polo menos 3 caracteres.";
            }
            return null;
        },

        email: (value) => {
            if (!value || value.trim().lenght === 0) {
                return "O email é obrigatorio.";
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                return "Introduce un email válido.";
            }
            return null;
        },

        phone: (value) => {
            if (!value || value.trim().lenght === 0) {
                return "O teléfono é obrigatorio."
            }
            const cleanPhone = value.replace(/\D/g, '');
            const phoneRegex = /^[0-9]{9}$/;
            if (!phoneRegex.test(cleanPhone)) {
                return "O teléfono debe ter 9 díxitos e comezar por 6, 7, 8 ou 9.";
            }
            return null;
        },

        message: (value) => {
            if (!value || value.trim().lenght < 20) {
                return "A mensaxe debe ter polo menos 20 caracteres.";
            }
            if (value.trim().lenght > 500) {
                return "A mensaxe é demasiado longa.";
            }
            return null
        }
    }

    function validateField(field) {
        const value = field.value;
        const fieldName = field.name;
        const errorElement = field.parentElement.querySelector('.invalid-feedback');

        field.classList.remove('is-invalid', 'is-valid');

        const error = validators[fieldName] ? validators[fieldName](value) : null;

        if (error) {
            field.classList.add('is-invalid');
            if (errorElement) {
                errorElement.textContent = error;
            }
            return false;
        } else {
            field.classList.add('is-valid');
            return true;
        }
    }

    // validación do formulario
    function validateFrom() {
        const formFields = contactForm.querySelectorAll('input, textarea');
        let isValid = true;

        formFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        return isValid;
    }

    // eventos de validación en tempo real
    const formFields = contactForm.querySelectorAll('input, textarea');
    formFields.forEach(field => {
        // validación ao perder o foco
        field.addEventListener('blur', () => {
            validateField(field);
        });

        // validación ao escribir
        field.addEventListener('input', () => {
            if (field.classList.contains('is-invalid')) {
                validateField(field);
            }
        });
    });

    /* const isFormValid = validateFrom();

    if (!isFormValid) {
        errorMessage.style.display = "block";
        successMessage.style.display = "none";
        return
    }*/

    // Envío do formulario
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const isFormValid = validateForm();

        if (!isFormValid) {
            errorMessage.style.display = 'block';
            successMessage.style.display = 'none';
            return;
        }

        // Preparar envío
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';

        submitButton.disabled = true;
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Enviando...';

        try {
            await simulateFormSubmission();
            successMessage.style.display = 'block';
            contactForm.reset();
            formFields.forEach(field => {
                field.classList.remove('is-valid', 'is-invalid');
            });
        } catch (error) {
            errorMessage.style.display = 'block';
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
        }
    });

    // Simulación de envío
    function simulateFormSubmission() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.1) {
                    resolve();
                } else {
                    reject(new Error('Error de simulación'));
                }
            }, 2000);
        });
    }

    // Contador de caracteres
    const messageField = document.getElementById('message');
    if (messageField) {
        const counter = document.createElement('small');
        counter.className = 'text-muted d-block text-end mt-1';
        counter.style.fontSize = '0.875rem';
        messageField.parentElement.appendChild(counter);

        function updateCounter() {
            const length = messageField.value.length;
            counter.textContent = `${length}/500 caracteres`;

            if (length > 500) {
                counter.classList.add('text-danger');
                counter.classList.remove('text-muted');
            } else if (length > 400) {
                counter.classList.add('text-warning');
                counter.classList.remove('text-muted', 'text-danger');
            } else {
                counter.classList.add('text-muted');
                counter.classList.remove('text-warning', 'text-danger');
            }
        }

        messageField.addEventListener('input', updateCounter);
        updateCounter();
    }
})