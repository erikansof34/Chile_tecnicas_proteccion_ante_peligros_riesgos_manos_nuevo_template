export function init() {
  // Código para el termómetro de riesgo
  const tempRange = document.getElementById("tempRange");
  const temperature = document.getElementById("temperature");
  const leftMessages = document.querySelectorAll("#left-messages .centered-text");
  const rightMessages = document.querySelectorAll("#right-messages .centered-text");

  if (tempRange && temperature) {
    tempRange.addEventListener("input", () => {
      const value = tempRange.value;

      // Ajustar la altura del termómetro
      temperature.style.height = `${value}%`;

      // Mostrar los mensajes según el valor
      const step = 100 / leftMessages.length;

      leftMessages.forEach((message, index) => {
        if (value >= step * (index + 1)) {
          message.classList.add("visible");
        } else {
          message.classList.remove("visible");
        }
      });

      rightMessages.forEach((message, index) => {
        if (value >= step * (index + 1)) {
          message.classList.add("visible");
        } else {
          message.classList.remove("visible");
        }
      });
    });

    // Disparar evento input para inicializar el estado
    tempRange.dispatchEvent(new Event('input'));
  }
}