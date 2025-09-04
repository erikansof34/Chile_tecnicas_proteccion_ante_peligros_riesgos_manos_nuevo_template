export function init() {
    // Inicializar la actividad de arrastrar y soltar
    const dragItems = document.querySelectorAll('.drag-item');
    const dropZones = document.querySelectorAll('.drop-zone');
    const mobileSelects = document.querySelectorAll('.mobile-select');
    const validateButton = document.querySelector('.btn-validate');
    const resetButton = document.querySelector('.btn-reset');
    const feedbackMessage = document.querySelector('.feedback-message');

    // Estado de la actividad
    const state = {
        dropZone1: null,
        dropZone2: null,
        correctAnswers: {
            dropZone1: "Riesgos eléctricos",
            dropZone2: "Descargas eléctricas"
        }
    };

    // Verificar si es móvil
    const isMobile = window.innerWidth <= 768;

    // Configurar según el dispositivo
    if (isMobile) {
        setupMobileVersion();
    } else {
        setupDesktopVersion();
    }

    // Configurar botones
    validateButton.addEventListener('click', handleValidation);
    resetButton.addEventListener('click', handleReset);

    // Configurar versión desktop
    function setupDesktopVersion() {
        // Configurar eventos de arrastre
        dragItems.forEach(item => {
            item.addEventListener('dragstart', handleDragStart);
            item.addEventListener('dragend', handleDragEnd);
        });

        // Configurar zonas de destino
        dropZones.forEach(zone => {
            zone.addEventListener('dragover', handleDragOver);
            zone.addEventListener('dragenter', handleDragEnter);
            zone.addEventListener('dragleave', handleDragLeave);
            zone.addEventListener('drop', handleDrop);
        });
    }

    // Configurar versión móvil
    function setupMobileVersion() {
        mobileSelects.forEach((select, index) => {
            select.addEventListener('change', (e) => handleSelectChange(e, `dropZone${index + 1}`));

            // Inicializar opciones
            updateSelectOptions();
        });
    }

    // Actualizar opciones de los selects
    function updateSelectOptions() {
        const selectedValues = Array.from(mobileSelects).map(select => select.value).filter(Boolean);

        mobileSelects.forEach(select => {
            const currentValue = select.value;
            const options = select.querySelectorAll('option');

            // Habilitar/deshabilitar opciones según si están seleccionadas en otros selects
            options.forEach(option => {
                if (option.value && option.value !== currentValue && selectedValues.includes(option.value)) {
                    option.style.display = 'none';
                    option.disabled = true;
                } else {
                    option.style.display = 'block';
                    option.disabled = false;
                }
            });
        });
    }

    // Manejar cambio en selects móviles
    function handleSelectChange(e, dropZoneId) {
        const value = e.target.value;

        // Si se seleccionó una opción vacía, liberar el valor
        if (!value) {
            state[dropZoneId] = null;
        } else {
            // Verificar si el valor ya está seleccionado en otro select
            const alreadySelected = Object.values(state).includes(value);

            if (alreadySelected) {
                // Encontrar y limpiar el select que tenía este valor
                mobileSelects.forEach(select => {
                    if (select.value === value) {
                        select.value = "";
                        const zoneId = select.id === "mobileSelect1" ? "dropZone1" : "dropZone2";
                        state[zoneId] = null;
                    }
                });
            }

            // Asignar el nuevo valor
            state[dropZoneId] = value;
        }

        // Actualizar opciones disponibles
        updateSelectOptions();

        // Habilitar/deshabilitar botones
        updateButtonStates();
    }

    // Actualizar estado de los botones
    function updateButtonStates() {
        // Habilitar validar si ambas zonas están llenas
        const allFilled = Object.values(state).every(value => value !== null);
        validateButton.disabled = !allFilled;

        // Habilitar reiniciar si al menos una zona tiene valor o hay mensaje de feedback
        const hasValues = Object.values(state).some(value => value !== null);
        const hasFeedback = feedbackMessage.classList.contains('success') || feedbackMessage.classList.contains('error');
        resetButton.disabled = !(hasValues || hasFeedback);
    }

    // Funciones de manejo de eventos para desktop
    function handleDragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.dataset.value);
        e.target.classList.add('dragging');

        // Ocultar el elemento que se está arrastrando después de un breve retraso
        setTimeout(() => {
            e.target.style.display = 'none';
        }, 0);
    }

    function handleDragEnd(e) {
        e.target.classList.remove('dragging');
        e.target.style.display = 'block';
    }

    function handleDragOver(e) {
        e.preventDefault();
    }

    function handleDragEnter(e) {
        e.preventDefault();
        e.target.classList.add('drop-zone-active');
    }

    function handleDragLeave(e) {
        e.target.classList.remove('drop-zone-active');
    }

    function handleDrop(e) {
        e.preventDefault();
        e.target.classList.remove('drop-zone-active');

        const data = e.dataTransfer.getData('text/plain');
        const dropZoneId = e.target.id;

        // Verificar si la zona ya tiene un elemento
        if (state[dropZoneId]) {
            return; // No permitir soltar si ya hay un elemento
        }

        // Actualizar el estado
        state[dropZoneId] = data;

        // Actualizar la UI
        e.target.textContent = data;
        e.target.classList.add('filled');

        // Ocultar el elemento arrastrado de la lista de disponibles
        dragItems.forEach(item => {
            if (item.dataset.value === data) {
                item.style.visibility = 'hidden';
            }
        });

        // Actualizar estado de botones
        updateButtonStates();
    }

    function handleValidation() {
        // Verificar respuestas
        const isCorrect = state.dropZone1 === state.correctAnswers.dropZone1 &&
            state.dropZone2 === state.correctAnswers.dropZone2;

        // Mostrar retroalimentación
        if (isCorrect) {
            feedbackMessage.textContent = "¡Muy bien! Estás aprendiendo mucho para cuidar tus manos.";
            feedbackMessage.classList.add('success');
            feedbackMessage.classList.remove('error');

            // Marcar zonas correctas
            document.getElementById('dropZone1').classList.add('validation-success');
            document.getElementById('dropZone2').classList.add('validation-success');
            document.getElementById('card1').classList.add('validation-success');
            document.getElementById('card2').classList.add('validation-success');

            // Para móviles
            document.getElementById('mobileSelect1').classList.add('validation-success');
            document.getElementById('mobileSelect2').classList.add('validation-success');

            // Mostrar iconos de check
            document.querySelectorAll('.check-icon').forEach(icon => {
                icon.style.display = 'block';
            });
            document.querySelectorAll('.xmark-icon').forEach(icon => {
                icon.style.display = 'none';
            });
        } else {
            feedbackMessage.textContent = "¡Piénsalo bien! Revisa muy bien los conceptos y vuelve a intentarlo.";
            feedbackMessage.classList.add('error');
            feedbackMessage.classList.remove('success');

            // Marcar zonas según si son correctas o no
            if (state.dropZone1 === state.correctAnswers.dropZone1) {
                document.getElementById('dropZone1').classList.add('validation-success');
                document.getElementById('card1').classList.add('validation-success');
                document.getElementById('mobileSelect1').classList.add('validation-success');
                document.querySelector('#card1 .check-icon').style.display = 'block';
                document.querySelector('#card1 .xmark-icon').style.display = 'none';
            } else {
                document.getElementById('dropZone1').classList.add('validation-error');
                document.getElementById('card1').classList.add('validation-error');
                document.getElementById('mobileSelect1').classList.add('validation-error');
                document.querySelector('#card1 .check-icon').style.display = 'none';
                document.querySelector('#card1 .xmark-icon').style.display = 'block';
            }

            if (state.dropZone2 === state.correctAnswers.dropZone2) {
                document.getElementById('dropZone2').classList.add('validation-success');
                document.getElementById('card2').classList.add('validation-success');
                document.getElementById('mobileSelect2').classList.add('validation-success');
                document.querySelector('#card2 .check-icon').style.display = 'block';
                document.querySelector('#card2 .xmark-icon').style.display = 'none';
            } else {
                document.getElementById('dropZone2').classList.add('validation-error');
                document.getElementById('card2').classList.add('validation-error');
                document.getElementById('mobileSelect2').classList.add('validation-error');
                document.querySelector('#card2 .check-icon').style.display = 'none';
                document.querySelector('#card2 .xmark-icon').style.display = 'block';
            }
        }

        // Actualizar estado de botones
        updateButtonStates();
    }

    function handleReset() {
        // Restablecer estado
        state.dropZone1 = null;
        state.dropZone2 = null;

        // Restablecer UI desktop
        dropZones.forEach(zone => {
            zone.textContent = "Arrastre aquí";
            zone.classList.remove('filled', 'validation-success', 'validation-error', 'drop-zone-active');
        });

        // Restablecer UI móvil
        mobileSelects.forEach(select => {
            select.value = "";
            select.classList.remove('validation-success', 'validation-error');
        });

        // Actualizar opciones en móvil
        if (isMobile) {
            updateSelectOptions();
        }

        // Mostrar todos los elementos arrastrables (desktop)
        dragItems.forEach(item => {
            item.style.visibility = 'visible';
            item.style.display = 'block';
        });

        document.getElementById('card1').classList.remove('validation-success', 'validation-error');
        document.getElementById('card2').classList.remove('validation-success', 'validation-error');

        // Ocultar todos los iconos de validación
        document.querySelectorAll('.validation-icon').forEach(icon => {
            icon.style.display = 'none';
        });

        // Ocultar mensaje de retroalimentación
        feedbackMessage.classList.remove('success', 'error');
        feedbackMessage.textContent = "";
        feedbackMessage.style.display = 'none';

        // Deshabilitar botones
        validateButton.disabled = true;
        resetButton.disabled = true;
    }

    // Inicializar estado de botones
    updateButtonStates();

    // Manejar cambio de tamaño de ventana
    window.addEventListener('resize', () => {
        const newIsMobile = window.innerWidth <= 768;
        if (newIsMobile !== isMobile) {
            // Recargar la página si cambia el tipo de dispositivo
            location.reload();
        }
    });
}