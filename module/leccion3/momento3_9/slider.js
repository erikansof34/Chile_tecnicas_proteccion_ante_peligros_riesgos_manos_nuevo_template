export function init() {

    // Datos de la información
    const infoDataMom3Sld8 = {
        1: "<strong>1. Tratamiento y Rehabilitación del Trabajador</strong><br>La ley establece que las mutualidades de empleadores (Mutual de Seguridad, ACHS, IST y CChC) deben encargarse del tratamiento, rehabilitación y reincorporación del trabajador accidentado.",
        2: "<strong>2. Derecho a Atención Médica y Prestaciones</strong><br>Define que el trabajador tiene derecho a atención médica gratuita y prestaciones económicas mientras se recupera.",
        3: "<strong>3. Control de recuperación</strong><br>La mutualidad realizará controles médicos hasta el alta..",
        4: "<strong>4. Reincorporación segura</strong><br>Si la lesión afecta la funcionalidad de la mano, pueden evaluarse adaptaciones al puesto de trabajo."
    };

    // Función para cambiar la información
    function changeInfo(buttonId) {
        const infoText = document.getElementById('info-text-mom3-9');

        if (infoText) {
            infoText.innerHTML = infoDataMom3Sld8[buttonId];
        }

        // Actualizar estado activo de los botones
        const buttons = document.querySelectorAll('.circle-button-mom3-9');

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
    const buttons = document.querySelectorAll('.circle-button-mom3-9');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const buttonId = this.getAttribute('data-id');
            changeInfo(buttonId);
        });
    });

    // Inicializar con el primer elemento activo
    changeInfo('1');
}