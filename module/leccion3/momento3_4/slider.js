export function init() {
    const container = document.querySelector('.ordenar-mom3-4-items');
    const items = document.querySelectorAll('.ordenar-mom3-4-item');
    const validateBtn = document.querySelector('.ordenar-mom3-4-validate');
    const resetBtn = document.querySelector('.ordenar-mom3-4-reset');
    const feedbackDiv = document.querySelector('.ordenar-mom3-4-feedback');
    const resultText = document.querySelector('.ordenar-mom3-4-result');
    const staticNumbers = document.querySelectorAll('.static-number');

    let draggedItem = null;
    let hasInteracted = false;
    const correctOrder = ['1', '2', '3', '4', '5']; // Orden correcto esperado

    // Función para actualizar estado de botones
    function updateButtonsState() {
        validateBtn.disabled = !hasInteracted;
        resetBtn.disabled = !hasInteracted;
    }

    // Función para verificar y actualizar colores de números durante el arrastre
    function updateNumberColors() {
        const currentItems = container.querySelectorAll('.ordenar-mom3-4-item');

        currentItems.forEach((item, index) => {
            const value = item.getAttribute('data-value');

            // Limpiar clases previas
            staticNumbers[index].classList.remove('correct-position', 'incorrect-position');

            // Verificar si está en la posición correcta
            if (value === correctOrder[index]) {
                staticNumbers[index].classList.add('correct-position');
            } else {
                staticNumbers[index].classList.add('incorrect-position');
            }
        });
    }

    // Inicializar estado de botones
    updateButtonsState();

    // Eventos para drag and drop
    items.forEach(item => {
        item.addEventListener('dragstart', function (e) {
            draggedItem = this;
            setTimeout(() => {
                this.classList.add('dragging');
            }, 0);

            // Crear un clon para el feedback visual
            const clone = this.cloneNode(true);
            clone.classList.add('clone');
            document.body.appendChild(clone);
            clone.style.position = 'absolute';
            clone.style.opacity = '0.8';
            clone.style.pointerEvents = 'none';
            clone.style.zIndex = '10000';
            clone.style.backgroundColor = 'rgba(110, 60, 210, 0.8)'; // Morado claro opaco
            clone.style.color = '#fff'; // Texto blanco
            e.dataTransfer.setDragImage(clone, 20, 20);

            // Actualizar colores de números al iniciar el arrastre
            updateNumberColors();

            // Eliminar el clon después de un tiempo
            setTimeout(() => {
                if (document.body.contains(clone)) {
                    document.body.removeChild(clone);
                }
            }, 100);
        });

        item.addEventListener('dragend', function () {
            this.classList.remove('dragging');
            hasInteracted = true;
            updateButtonsState();

            // Eliminar cualquier clon residual
            const clones = document.querySelectorAll('.ordenar-mom3-4-item.clone');
            clones.forEach(clone => {
                if (document.body.contains(clone)) {
                    document.body.removeChild(clone);
                }
            });

            // Actualizar colores de números al finalizar el arrastre
            updateNumberColors();
        });

        item.addEventListener('dragenter', function (e) {
            e.preventDefault();
            this.classList.add('drag-over');
        });

        item.addEventListener('dragleave', function () {
            this.classList.remove('drag-over');
        });
    });

    container.addEventListener('dragover', function (e) {
        e.preventDefault();
        const afterElement = getDragAfterElement(container, e.clientY);
        const currentItem = document.querySelector('.dragging');

        if (afterElement == null) {
            container.appendChild(currentItem);
        } else {
            container.insertBefore(currentItem, afterElement);
        }

        // Actualizar colores de números durante el arrastre
        updateNumberColors();
    });

    container.addEventListener('drop', function (e) {
        e.preventDefault();
        const items = container.querySelectorAll('.ordenar-mom3-4-item');
        items.forEach(item => {
            item.classList.remove('drag-over');
        });

        // Actualizar colores de números al soltar
        updateNumberColors();
    });

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.ordenar-mom3-4-item:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;

            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    // Validar orden
    validateBtn.addEventListener('click', function () {
        const orderedItems = [...container.querySelectorAll('.ordenar-mom3-4-item')];

        // Resetear clases de validación previa
        orderedItems.forEach(item => {
            item.classList.remove('correct', 'incorrect');
        });

        feedbackDiv.classList.remove('d-none', 'success-feedback', 'error-feedback');

        // Limpiar iconos anteriores
        const oldIcons = feedbackDiv.querySelectorAll('i');
        oldIcons.forEach(icon => icon.remove());

        let correctCount = 0;

        orderedItems.forEach((item, index) => {
            if (item.getAttribute('data-value') === correctOrder[index]) {
                item.classList.add('correct');
                correctCount++;
            } else {
                item.classList.add('incorrect');
            }
        });

        // Actualizar números estáticos con colores de validación
        orderedItems.forEach((item, index) => {
            const value = item.getAttribute('data-value');

            // Limpiar clases previas
            staticNumbers[index].classList.remove('correct-position', 'incorrect-position');

            // Marcar si está en la posición correcta
            if (parseInt(value) === index + 1) {
                staticNumbers[index].classList.add('correct-position');
            } else {
                staticNumbers[index].classList.add('incorrect-position');
            }
        });

        const percentage = Math.round((correctCount / correctOrder.length) * 100);
        resultText.textContent = `Tus respuestas correctas son: ${correctCount} de ${correctOrder.length} (${percentage}%)`;

        // Crear elemento de icono
        const icon = document.createElement('i');
        icon.style.marginRight = '10px'; // Espacio entre icono y texto

        if (correctCount === correctOrder.length) {
            feedbackDiv.classList.add('success-feedback');
            icon.className = 'fas fa-check-circle icon-success'; // Icono de check
        } else {
            feedbackDiv.classList.add('error-feedback');
            icon.className = 'fas fa-times-circle icon-error'; // Icono de error
        }

        // Insertar icono al principio del feedbackDiv
        feedbackDiv.insertBefore(icon, feedbackDiv.firstChild);
    });

    // Reiniciar actividad
    resetBtn.addEventListener('click', function () {
        // Resetear a orden inicial (5, 3, 1, 2, 4)
        const itemsArray = Array.from(items);
        const initialOrder = ['5', '3', '1', '2', '4'];

        // Ordenar los items según el orden inicial
        initialOrder.forEach(value => {
            const item = itemsArray.find(item => item.getAttribute('data-value') === value);
            if (item) {
                container.appendChild(item);
                item.classList.remove('correct', 'incorrect', 'drag-over');
            }
        });

        // Restablecer números estáticos (solo números, sin colores de validación)
        staticNumbers.forEach((number, index) => {
            number.textContent = `${index + 1}.`;
            number.classList.remove('correct-position', 'incorrect-position');
            number.style.color = '#4b5563';
            number.style.fontWeight = 'bold';
        });

        // Ocultar feedback y limpiar
        feedbackDiv.classList.add('d-none');
        feedbackDiv.classList.remove('success-feedback', 'error-feedback');
        feedbackDiv.innerHTML = ''; // Limpiar todo el contenido
        feedbackDiv.appendChild(resultText); // Volver a agregar el elemento de texto
        resultText.textContent = '';

        // Reiniciar estado de interacción
        hasInteracted = false;
        updateButtonsState();
    });
}