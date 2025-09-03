export function init() {

  // Datos de la información
  const infoDataMom2Sld3 = {
    1: "<strong>1. Evaluar los Riesgos.</strong>",
    2: "<strong>2. Elegir la TALLA correcta.</strong>",
    3: "<strong>3. Tener en cuenta el ENTORNO.</strong>",
    4: "<strong>4. Revisar cumplimiento de Normas.</strong>",
    5: "<strong>5. Realizar Mantenimiento.</strong>"
  };

  // Función para cambiar la información
  function changeInfo(buttonId) {
    const infoText = document.getElementById('info-text-mom2-3');

    if (infoText) {
      infoText.innerHTML = infoDataMom2Sld3[buttonId];
    }

    // Actualizar estado activo de los botones
    const buttons = document.querySelectorAll('.circle-button-mom2-3');

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
  const buttons = document.querySelectorAll('.circle-button-mom2-3');

  buttons.forEach(button => {
    button.addEventListener('click', function () {
      const buttonId = this.getAttribute('data-id');
      changeInfo(buttonId);
    });
  });

  // Inicializar con el primer elemento activo
  changeInfo('1');
}