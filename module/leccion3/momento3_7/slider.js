export function init() {

    // Datos de la información
    const infoDataMom3Sld11 = {
        1: "<strong>1. Asegurar el área:</strong><br> Demarcar el espacio para evitar interferencias.",
        2: "<strong>2. Evaluación y planificación:</strong><br> Decidir el equipo y el método de rescate.",
        3: "<strong>3. Acceso al accidentado:</strong><br> Lograr un acceso seguro.",
        4: "<strong>4. Rescate y estabilización:</strong><br> Ejecutar la maniobra de rescate y estabilizar al accidentado.",
        5: "<strong>5. Evacuación de la maniobra:</strong><br> Evaluar posibles errores o fallas post-rescate.",
        6: "<strong>6. Verificación de condición del rescatista:</strong><br> Asegurar que los rescatistas estén en condiciones óptimas."
    }

        ;

    // Función para cambiar la información
    function changeInfo(buttonId) {
        const infoText = document.getElementById('info-text-mom3-11');

        if (infoText) {
            infoText.innerHTML = infoDataMom3Sld11[buttonId];
        }

        // Actualizar estado activo de los botones
        const buttons = document.querySelectorAll('.circle-button-mom3-11');

        buttons.forEach(button => {
            if (button.getAttribute('data-id') === buttonId) {
                button.classList.add('active');
            }

            else {
                button.classList.remove('active');
            }
        });
    }

    // Añadir event listeners a los botones
    const buttons = document.querySelectorAll('.circle-button-mom3-11');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const buttonId = this.getAttribute('data-id');
            changeInfo(buttonId);
        });
    });

    // Inicializar con el primer elemento activo
    changeInfo('1');
}

