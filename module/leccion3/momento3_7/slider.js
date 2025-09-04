// JavaScript para la actividad
export function init() {
    // Datos de la actividad
    const itemsData = [
        {
            image: "./momento3_7/img/metodo_5_porque_sldM3.webp",
            description: `Este método se centra en indagar en las causas raíz de un incidente haciendo repetidamente (5 veces) la pregunta "¿por qué?" hasta llegar a la causa raíz.​`,
            correctAnswer: "1",
            selectedAnswer: "",
            isCorrect: false,
        },
        {
            image: "./momento3_7/img/metodo_arbol_fallas_sldM3.webp",
            description: "Mediante diagramas gráficos tipo árbol, este método visualiza las relaciones causa-efecto en incidentes complejos​",
            correctAnswer: "2",
            selectedAnswer: "",
            isCorrect: false,
        },
        {
            image: "./momento3_7/img/metodo_espina_pescado_sldm3.webp",
            description: "Este diagrama clasifica las causas de un problema en categorías como personas, máquinas, materiales, métodos, medio ambiente y medición​",
            correctAnswer: "3",
            selectedAnswer: "",
            isCorrect: false,
        },
    ];

    const availableOptions = [
        { value: "3", label: "Método Espina de pescado​" },
        { value: "1", label: "Método de los 5 porqués​" },
        { value: "2", label: "Método Árbol de fallas" },
    ];

    let isVerified = false;
    let correctCount = 0;
    let percentage = 0;

    // Elementos DOM
    const itemsGrid = document.getElementById("items-grid");
    const errorMessage = document.getElementById("error-message");
    const scoreText = document.getElementById("score-text");
    const validateBtn = document.getElementById("validate-btn");
    const resetBtn = document.getElementById("reset-btn");

    // Inicializar la actividad
    function initializeActivity() {
        renderItems();
        setupEventListeners();
    }

    // Renderizar los elementos de la actividad
    function renderItems() {
        itemsGrid.innerHTML = "";

        itemsData.forEach((item, index) => {
            const itemElement = document.createElement("div");
            itemElement.className = `item-box ${item.selectedAnswer !== "" && !isVerified ? "selected" : ""} ${isVerified ? (item.isCorrect ? "correct" : "incorrect") : ""}`;

            // Filtrar opciones disponibles (excluyendo las ya seleccionadas en otros items)
            const filteredOptions = availableOptions.filter(option => {
                return !itemsData.some((itemData, i) => i !== index && itemData.selectedAnswer === option.value);
            });

            // Opciones para el select
            const optionsHTML = filteredOptions.map(option =>
                `<option value="${option.value}" ${item.selectedAnswer === option.value ? "selected" : ""}>${option.label}</option>`
            ).join("");

            itemElement.innerHTML = `
        <div class="image-containerALD">
          <img src="${item.image}" alt="Método ${index + 1}" class="item-image" />
          ${isVerified ? `<img src="${item.isCorrect ? '../../assets/img/btn_validacion/checkAct.png' : '../../assets/img/btn_validacion/xmarkAct.png'}" class="feedback-iconALD" />` : ''}
        </div>
        <p class="item-description ${isVerified ? 'text-white' : ''}">${item.description}</p>
        <select class="item-select ${item.selectedAnswer !== "" && !isVerified ? "selected" : ""}" 
                data-index="${index}" ${isVerified ? "disabled" : ""}>
          <option value="" disabled ${!item.selectedAnswer ? "selected" : ""}>Seleccione...</option>
          ${optionsHTML}
        </select>
        ${isVerified ? `<p class="feedback-text">${item.isCorrect ? "¡Correcto!" : "¡Incorrecto!"}</p>` : ''}
      `;

            itemsGrid.appendChild(itemElement);
        });

        updateResetButton();
    }

    // Configurar event listeners
    function setupEventListeners() {
        // Event delegation para los selects
        itemsGrid.addEventListener("change", function (e) {
            if (e.target.classList.contains("item-select")) {
                const index = parseInt(e.target.dataset.index);
                const value = e.target.value;
                handleSelect(index, value);
            }
        });

        validateBtn.addEventListener("click", handleValidate);
        resetBtn.addEventListener("click", handleReset);
    }

    // Manejar selección de opción
    function handleSelect(index, value) {
        itemsData[index].selectedAnswer = value;
        renderItems();
    }

    // Validar respuestas
    function handleValidate() {
        // Verificar que todas las opciones estén seleccionadas
        if (itemsData.some(item => item.selectedAnswer === "")) {
            errorMessage.textContent = "Debe seleccionar todas las opciones antes de validar.";
            errorMessage.style.display = "block";
            return;
        }

        errorMessage.style.display = "none";

        // Calcular respuestas correctas
        correctCount = 0;
        itemsData.forEach(item => {
            item.isCorrect = item.selectedAnswer === item.correctAnswer;
            if (item.isCorrect) correctCount++;
        });

        percentage = Math.round((correctCount / itemsData.length) * 100);
        isVerified = true;

        // Mostrar resultados
        scoreText.textContent = `${correctCount} de ${itemsData.length} respuestas correctas (${percentage}%)`;
        scoreText.style.display = "block";

        renderItems();
    }

    // Reiniciar actividad
    function handleReset() {
        itemsData.forEach(item => {
            item.selectedAnswer = "";
            item.isCorrect = false;
        });

        isVerified = false;
        correctCount = 0;
        percentage = 0;

        errorMessage.style.display = "none";
        scoreText.style.display = "none";

        renderItems();
    }

    // Actualizar estado del botón de reinicio
    function updateResetButton() {
        const anySelected = itemsData.some(item => item.selectedAnswer !== "");
        resetBtn.disabled = !anySelected;
    }

    // Inicializar la actividad
    initializeActivity();
}