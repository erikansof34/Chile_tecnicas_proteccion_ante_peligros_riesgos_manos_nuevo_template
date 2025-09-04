export function init() {

    // Datos de la información
    const infoDataMom3Sld8 = {
        1: "<strong>1. ¿Por qué ocurrió el accidente?</strong><br>Porque la mano del trabajador quedó atrapada en la prensa de corte.",
        2: "<strong>2. ¿Por qué no estaba usando guantes de protección?</strong><br>Porque intentó retirar un residuo de material sin detener la máquina.",
        3: "<strong>3. ¿Por qué pensaba que los guantes podían engancharse?</strong><br>Porque no sabía que era obligatorio apagarla antes de limpiar.",
        4: "<strong>4. ¿Por qué no había recibido una capacitación adecuada?</strong><br>Porque no recibió capacitación específica sobre procedimientos seguros.",
        5: "<strong>5. ¿Por qué la empresa no tiene un programa de formación continua?</strong><br>Porque la empresa no tiene un programa formal de inducción en seguridad para operadores de maquinaria."
    };

    // Función para cambiar la información
    function changeInfo(buttonId) {
        const infoText = document.getElementById('info-text-mom3-8');

        if (infoText) {
            infoText.innerHTML = infoDataMom3Sld8[buttonId];
        }

        // Actualizar estado activo de los botones
        const buttons = document.querySelectorAll('.circle-button-mom3-8');

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
    const buttons = document.querySelectorAll('.circle-button-mom3-8');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const buttonId = this.getAttribute('data-id');
            changeInfo(buttonId);
        });
    });

    // Inicializar con el primer elemento activo
    changeInfo('1');
}