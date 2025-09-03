export function init() {
    // Respuestas correctas (en el orden de los selects)
    const correctAnswers = ["1", "2", "3", "4", "5"];
    let selectedValues = {};

    // Elementos del DOM
    const selects = document.querySelectorAll('.select-mom1-5');
    const validateBtn = document.querySelector('.select-mom1-5-validate');
    const resetBtn = document.querySelector('.select-mom1-5-reset');
    const feedbackDiv = document.querySelector('.select-mom1-5-feedback');

    // Inicializar el objeto de valores seleccionados
    selects.forEach(select => {
        selectedValues[select.dataset.index] = "0";
    });

    // Función para actualizar las opciones disponibles
    function updateSelectOptions() {
        // Primero, restaurar todas las opciones en todos los selects
        selects.forEach(select => {
            Array.from(select.options).forEach(option => {
                if (option.value !== "0") option.hidden = false;
            });
        });

        // Luego, ocultar las opciones seleccionadas en otros selects
        selects.forEach(currentSelect => {
            const currentValue = currentSelect.value;
            if (currentValue !== "0") {
                selects.forEach(otherSelect => {
                    if (otherSelect !== currentSelect) {
                        const optionToHide = otherSelect.querySelector(`option[value="${currentValue}"]`);
                        if (optionToHide) optionToHide.hidden = true;
                    }
                });
            }
        });

        // Actualizar estilo visual de los selects
        selects.forEach(select => {
            if (select.value !== "0") {
                select.classList.add('select-mom1-5-selected');
            } else {
                select.classList.remove('select-mom1-5-selected');
            }
        });
    }

    // Manejar cambios en los selects
    selects.forEach(select => {
        select.addEventListener('change', function () {
            const previousValue = selectedValues[select.dataset.index];
            selectedValues[select.dataset.index] = select.value;
            updateSelectOptions();
        });
    });

    // Validar respuestas
    validateBtn.addEventListener('click', function () {
        // Verificar que todos los selects tengan una opción seleccionada
        let allSelected = true;
        selects.forEach(select => {
            if (select.value === "0") {
                allSelected = false;
            }
        });

        if (!allSelected) {
            showError('Debe seleccionar todas las opciones antes de validar.');
            return;
        }

        // Limpiar mensaje de error
        hideError();

        // Validar respuestas
        let correctCount = 0;
        selects.forEach((select, index) => {
            if (select.value === correctAnswers[index]) {
                select.classList.add('select-mom1-5-correct-answer');
                select.classList.remove('select-mom1-5-incorrect-answer');
                correctCount++;
            } else {
                select.classList.add('select-mom1-5-incorrect-answer');
                select.classList.remove('select-mom1-5-correct-answer');
            }
            select.classList.remove('select-mom1-5-selected');
        });

        // Mostrar feedback
        const percentage = Math.round((correctCount / correctAnswers.length) * 100);
        if (correctCount === correctAnswers.length) {
            showFeedback('¡Muy bien! Has completado correctamente el texto.', 'select-mom1-5-correct');
        } else {
            showFeedback('¡Piénsalo bien! Algunas respuestas no son correctas.', 'select-mom1-5-incorrect');
        }

        // Mostrar resultados
        const resultsHtml = `<div class="select-mom1-5-results">Tus respuestas correctas son: ${correctCount} de ${correctAnswers.length} (${percentage}%)</div>`;
        feedbackDiv.insertAdjacentHTML('beforeend', resultsHtml);

        // Mostrar botón de reinicio y habilitarlo
        resetBtn.classList.remove('hidden');
        resetBtn.disabled = false;

        // Deshabilitar selects
        selects.forEach(select => {
            select.disabled = true;
        });

        // Deshabilitar botón de validar
        validateBtn.disabled = true;
    });

    // Reiniciar actividad
    resetBtn.addEventListener('click', function () {
        selects.forEach(select => {
            select.value = "0";
            select.classList.remove('select-mom1-5-correct-answer', 'select-mom1-5-incorrect-answer', 'select-mom1-5-selected');
            select.disabled = false;

            // Mostrar todas las opciones
            Array.from(select.options).forEach(option => {
                option.hidden = false;
            });
        });

        // Resetear valores seleccionados
        selects.forEach(select => {
            selectedValues[select.dataset.index] = "0";
        });

        feedbackDiv.innerHTML = '';
        feedbackDiv.classList.add('hidden');
        feedbackDiv.classList.remove('select-mom1-5-correct', 'select-mom1-5-incorrect');

        resetBtn.classList.add('hidden');
        resetBtn.disabled = true; // Deshabilitar el botón de reinicio
        validateBtn.disabled = false;

        hideError();
    });

    // Funciones auxiliares
    function showFeedback(message, type) {
        feedbackDiv.textContent = message;
        feedbackDiv.classList.remove('hidden', 'select-mom1-5-correct', 'select-mom1-5-incorrect');
        feedbackDiv.classList.add(type);
    }

    function showError(message) {
        const errorDiv = document.querySelector('.select-mom1-5-error');
        if (!errorDiv) {
            const errorHtml = `<div class="select-mom1-5-error">${message}</div>`;
            validateBtn.insertAdjacentHTML('beforebegin', errorHtml);
        } else {
            errorDiv.textContent = message;
        }
    }

    function hideError() {
        const errorDiv = document.querySelector('.select-mom1-5-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    // Inicializar opciones
    updateSelectOptions();
}