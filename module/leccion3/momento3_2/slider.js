// Función para cargar iframe (existente)
export function init() {
    loadIframe({
        id: 'Slide3-2Web',
        src: 'https://iframe.mediadelivery.net/embed/406826/997d3e1c-faa9-4918-8581-6b6fb53560ed?autoplay=false&loop=false&muted=false&preload=true&responsive=true',
        className: 'iframe-video-horizontal-web',
        style: 'width: 20vw; height: 70vh; min-height: 300px;',
    });

    // Inicializar la actividad
    initChileSeleccioneActivity();
}

// Función para inicializar la actividad
function initChileSeleccioneActivity() {
    const container = document.getElementById('chile-seleccione-activity');
    if (!container) return;

    // Crear la estructura HTML de la actividad
    container.innerHTML = `
        <div class="cards-container-chileSORD"></div>
        <div class="feedback-message-chileSORD" style="display: none;"></div>
        <div class="results-container-chileSORD text-center" style="display: none;">
            <p class=" text-md font-bold text-paragraph-light-color text-monserrat"></p>
        </div>
        <div class="initial-message-chileSORD">
            Cuando realices la actividad correctamente, aquí escucharás un audio que complementará las opciones
        </div>
        <div class="audio-global-container" style="display: none;">
            <div class="audio-wrapper" style="position: relative; width: 100%;">
                <audio controls class=" audio-con-transcripcion" style="height: 40px;"></audio>
                <i class="fas fa-closed-captioning transcription-toggle" 
                   style="color: #666; position: absolute; right: 0%; top: 60%; transform: translateY(-50%); cursor: pointer; font-size: 1.2rem;" 
                   title="Activar subtítulos"></i>
            </div>
            <div id="transcripcion-global" style="position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); background-color: rgba(0, 0, 0, 0.85); color: white; padding: 15px 25px; border-radius: 8px; font-family: 'Montserrat', sans-serif; font-size: 16px; z-index: 10000; display: none; max-width: 80%; text-align: center; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);"></div>
        </div>
        <div class="reset-button-container-chileSORD">
            <button class="sf-btn sf-btn-purple btn btn-primary rounded-pill" disabled>
                <i class="fas fa-repeat me-2"></i>Reiniciar
            </button>
        </div>
    `;

    // Inicializar variables de estado
    const state = {
        selections: {
            drop1: "",
            drop2: "",
            drop3: "",
            drop4: "",
            drop5: "",
            drop6: ""
        },
        isVerified: {
            drop1: false,
            drop2: false,
            drop3: false,
            drop4: false,
            drop5: false,
            drop6: false
        },
        isResetEnabled: false,
        correctCount: 0,
        showValidationMessage: false,
        feedbackMessage: "",
        currentAudio: null,
        showInitialMessage: true,
        isTranscriptionActive: false
    };

    // Variable global para controlar el audio activo
    let activeTranscriptionAudio = null;

    // Definir los elementos de la actividad
    const items = [
        {
            image: "./momento3_2/img/atencion_inmediata_trabajador.webp",
            audio: "./momento3_2/audio/atencion-inmediata-al-trabajador-m3-slide-23-audio.mp3",
            dropId: "drop1",
            correctOption: "Paso 1",
            audioId: "paso1",
            title: "Atención inmediata al trabajador",
            order: 4
        },
        {
            image: "./momento3_2/img/notificacion_accidente.webp",
            audio: "./momento3_2/audio/notificacion-del-accidente-m3-slide-23-audio.mp3",
            dropId: "drop2",
            correctOption: "Paso 2",
            audioId: "paso2",
            title: "Notificación del accidente",
            order: 1
        },
        {
            image: "./momento3_2/img/reporte_mutualidad.webp",
            audio: "./momento3_2/audio/reporte-a-la-mutualidad-m3-slide-23-audio.mp3",
            dropId: "drop3",
            correctOption: "Paso 3",
            audioId: "paso3",
            title: "Reporte a la mutualidad correspondiente",
            order: 6
        },
        {
            image: "./momento3_2/img/evaluacion_atencion_medica.webp",
            audio: "./momento3_2/audio/evaluacion-y-atencion-médica-m3-slide-23-audio.mp3",
            dropId: "drop4",
            correctOption: "Paso 4",
            audioId: "paso4",
            title: "Evaluación y atención médica",
            order: 3
        },
        {
            image: "./momento3_2/img/investigacion_interna.webp",
            audio: "./momento3_2/audio/investigacion-interna-y-medidas-correctivas-m3-slide-23-audio.mp3",
            dropId: "drop5",
            correctOption: "Paso 5",
            audioId: "paso5",
            title: "Investigación interna y medidas correctivas",
            order: 2
        },
        {
            image: "./momento3_2/img/seguimiento_reincorporacion.webp",
            audio: "./momento3_2/audio/seguimiento-y-reincorporacion-m3-slide-23-audio.mp3",
            dropId: "drop6",
            correctOption: "Paso 6",
            audioId: "paso6",
            title: "Seguimiento y reincorporación",
            order: 5
        }
    ].sort((a, b) => a.order - b.order);

    // Opciones para los selects
    const options = ["Paso 1", "Paso 2", "Paso 3", "Paso 4", "Paso 5", "Paso 6"];

    // Transcripciones de audio
    const transcripciones = {
        paso1: [{ start: 0, end: 3, text: "1: Atención inmediata al trabajador" }],
        paso2: [{ start: 0, end: 3, text: "2: Notificación del accidente" }],
        paso3: [{ start: 0, end: 3, text: "3: Reporte a la mutualidad correspondiente" }],
        paso4: [{ start: 0, end: 3, text: "4: Evaluación y atención médica" }],
        paso5: [{ start: 0, end: 4, text: "5: Investigación interna y medidas correctivas" }],
        paso6: [{ start: 0, end: 3, text: "6: Seguimiento y reincorporación" }]
    };

    // Renderizar las cards
    renderCards();

    // Configurar eventos de transcripción
    setupTranscriptionEvents();

    // Función para renderizar las cards
    function renderCards() {
        const cardsContainer = container.querySelector('.cards-container-chileSORD');
        cardsContainer.innerHTML = '';

        items.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = `card-container-chileSORD ${state.selections[item.dropId]
                ? state.isVerified[item.dropId]
                    ? "correct"
                    : "incorrect"
                : ""
                }`;

            card.innerHTML = `
                <div class="image-select-container-chileSORD">
                    <div class="image-validation-container-chileSORD">
                        <img src="${item.image}" alt="${item.title}" class="step-image-chileSORD" />
                        ${state.selections[item.dropId] ? `
                            <div class="validation-icon-container-chileSORD">
                                <img src="${state.isVerified[item.dropId] ? '../../assets/img/btn_validacion/checkAct.png' : '../../assets/img/btn_validacion/xmarkAct.png'}" 
                                     alt="Validation Icon" class="validation-icon-chileSORD" />
                            </div>
                        ` : ''}
                    </div>
                    
                    ${state.selections[item.dropId] ? `
                        <div class="feedback-text-chileSORD ${state.isVerified[item.dropId] ? 'correct-text' : 'incorrect-text'}">
                            ${state.isVerified[item.dropId] ? "¡Correcto!" : "¡Incorrecto!"}
                        </div>
                    ` : ''}
                    
                    <div class="card-title-chileSORD">${item.title}</div>
                    
                    <div class="select-container-chileSORD">
                        <select id="${item.dropId}" ${state.isVerified[item.dropId] ? 'disabled' : ''} 
                                class="${state.selections[item.dropId] ? state.isVerified[item.dropId] ? 'correct-select' : 'incorrect-select' : ''}">
                            <option value="">Seleccione...</option>
                            ${getAvailableOptions(item.dropId).map(option => `
                                <option value="${option}" ${state.selections[item.dropId] === option ? 'selected' : ''}>${option}</option>
                            `).join('')}
                        </select>
                    </div>
                </div>
            `;

            // Añadir event listener al select
            const select = card.querySelector('select');
            select.addEventListener('change', (e) => handleChange(item.dropId, e.target.value));

            cardsContainer.appendChild(card);
        });
    }

    // Función para obtener las opciones disponibles para un select
    function getAvailableOptions(dropId) {
        const selectedValues = Object.values(state.selections).filter(val => val !== "");
        return options.filter(option =>
            !selectedValues.includes(option) || state.selections[dropId] === option
        );
    }

    // Configurar eventos de transcripción
    function setupTranscriptionEvents() {
        const audioElement = container.querySelector('audio');
        const transcriptionToggle = container.querySelector('.transcription-toggle');
        const transcriptionGlobal = document.getElementById('transcripcion-global');

        if (!audioElement || !transcriptionToggle) return;

        // Evento para el botón de transcripción
        transcriptionToggle.addEventListener('click', () => {
            const newState = !state.isTranscriptionActive;

            // Desactivar el audio anterior si existe
            if (activeTranscriptionAudio && activeTranscriptionAudio !== audioElement) {
                activeTranscriptionAudio._transcriptionSetter(false);
                if (transcriptionGlobal) {
                    transcriptionGlobal.style.display = "none";
                }
            }

            // Actualizar el audio activo
            if (newState) {
                activeTranscriptionAudio = audioElement;
                activeTranscriptionAudio._transcriptionSetter = (value) => {
                    state.isTranscriptionActive = value;
                    updateTranscriptionToggle();
                };
            } else {
                activeTranscriptionAudio = null;
            }

            state.isTranscriptionActive = newState;
            updateTranscriptionToggle();

            if (transcriptionGlobal) {
                if (newState && !audioElement.paused) {
                    updateTranscription();
                } else {
                    transcriptionGlobal.style.display = "none";
                }
            }
        });

        // Eventos para el audio
        audioElement.addEventListener('play', () => {
            if (state.isTranscriptionActive) {
                updateTranscription();
            }
        });

        audioElement.addEventListener('timeupdate', () => {
            if (state.isTranscriptionActive && !audioElement.paused) {
                updateTranscription();
            }
        });

        audioElement.addEventListener('pause', () => {
            if (transcriptionGlobal) {
                transcriptionGlobal.style.display = "none";
            }
        });

        audioElement.addEventListener('ended', () => {
            if (transcriptionGlobal) {
                transcriptionGlobal.style.display = "none";
            }
        });

        // Función para actualizar la transcripción
        function updateTranscription() {
            if (!audioElement || !transcriptionGlobal || !state.currentAudio) return;

            const tiempoActual = audioElement.currentTime;
            const textoActual = transcripciones[state.currentAudio.audioId].find(
                (item) => tiempoActual >= item.start && tiempoActual <= item.end
            );

            if (textoActual) {
                transcriptionGlobal.textContent = textoActual.text;
                transcriptionGlobal.style.display = "block";
            } else {
                transcriptionGlobal.style.display = "none";
            }
        }

        // Función para actualizar el botón de transcripción
        function updateTranscriptionToggle() {
            if (state.isTranscriptionActive) {
                transcriptionToggle.style.color = "#2a7fba";
                transcriptionToggle.title = "Desactivar subtítulos";
            } else {
                transcriptionToggle.style.color = "#666";
                transcriptionToggle.title = "Activar subtítulos";
            }
        }
    }

    // Manejar cambios en los selects
    function handleChange(dropId, value) {
        // Actualizar selección
        state.selections[dropId] = value;

        // Encontrar el item correspondiente
        const currentItem = items.find(item => item.dropId === dropId);
        const isCorrect = value === currentItem.correctOption;

        // Actualizar estado de verificación
        state.isVerified[dropId] = isCorrect;
        state.showInitialMessage = false;

        // Actualizar mensaje de feedback
        const feedbackElement = container.querySelector('.feedback-message-chileSORD');
        if (isCorrect) {
            state.feedbackMessage = "¡Correcto! Ahora, escucha el siguiente audio que complementa esta información";
            feedbackElement.className = 'feedback-message-chileSORD success-message';

            // Configurar y reproducir audio
            setupAudio(currentItem);
        } else {
            state.feedbackMessage = "No has seleccionado correctamente";
            feedbackElement.className = 'feedback-message-chileSORD error-message';

            // Detener audio si está reproduciéndose
            const audioElement = container.querySelector('audio');
            if (audioElement) {
                audioElement.pause();
                audioElement.currentTime = 0;
            }
            container.querySelector('.audio-global-container').style.display = 'none';
            state.currentAudio = null;
        }

        feedbackElement.textContent = state.feedbackMessage;
        feedbackElement.style.display = 'block';

        // Habilitar botón de reinicio
        state.isResetEnabled = true;
        container.querySelector('.reset-button-container-chileSORD button').disabled = false;

        // Calcular número de respuestas correctas
        state.correctCount = items.filter(item => state.selections[item.dropId] === item.correctOption).length;

        // Mostrar mensaje de validación si todas las selecciones están completas
        state.showValidationMessage = Object.values(state.selections).every(val => val !== "");
        if (state.showValidationMessage) {
            const resultsElement = container.querySelector('.results-container-chileSORD');
            resultsElement.style.display = 'block';
            resultsElement.querySelector('p').textContent =
                `Tus respuestas correctas son: ${state.correctCount} de ${items.length} (${Math.round((state.correctCount / items.length) * 100)}%)`;
        }

        // Ocultar mensaje inicial si es necesario
        if (!state.showInitialMessage) {
            container.querySelector('.initial-message-chileSORD').style.display = 'none';
        }

        // Volver a renderizar las cards para actualizar los selects
        renderCards();
    }

    // Configurar audio
    function setupAudio(item) {
        const audioContainer = container.querySelector('.audio-global-container');
        const audioElement = audioContainer.querySelector('audio');

        // Configurar fuente de audio
        audioElement.src = item.audio;

        // Mostrar contenedor de audio
        audioContainer.style.display = 'block';
        state.currentAudio = item;

        // Reiniciar estado de transcripción
        state.isTranscriptionActive = false;
        const transcriptionToggle = container.querySelector('.transcription-toggle');
        if (transcriptionToggle) {
            transcriptionToggle.style.color = "#666";
            transcriptionToggle.title = "Activar subtítulos";
        }

        // Ocultar transcripción global
        const transcriptionGlobal = document.getElementById('transcripcion-global');
        if (transcriptionGlobal) {
            transcriptionGlobal.style.display = 'none';
        }

        // Intentar reproducir automáticamente
        const playAudio = async () => {
            try {
                await audioElement.play();
            } catch (error) {
                console.log("Autoplay prevented:", error);
                state.feedbackMessage += " Haz clic en el botón de play para escuchar el audio.";
                container.querySelector('.feedback-message-chileSORD').textContent = state.feedbackMessage;
            }
        };

        playAudio();
    }

    // Configurar botón de reinicio
    const resetButton = container.querySelector('.reset-button-container-chileSORD button');
    resetButton.addEventListener('click', handleReset);

    // Manejar reinicio
    function handleReset() {
        // Reiniciar estado
        state.selections = {
            drop1: "",
            drop2: "",
            drop3: "",
            drop4: "",
            drop5: "",
            drop6: ""
        };
        state.isVerified = {
            drop1: false,
            drop2: false,
            drop3: false,
            drop4: false,
            drop5: false,
            drop6: false
        };
        state.isResetEnabled = false;
        state.correctCount = 0;
        state.showValidationMessage = false;
        state.feedbackMessage = "";
        state.showInitialMessage = true;
        state.currentAudio = null;
        state.isTranscriptionActive = false;

        // Ocultar elementos de feedback
        container.querySelector('.feedback-message-chileSORD').style.display = 'none';
        container.querySelector('.results-container-chileSORD').style.display = 'none';
        container.querySelector('.audio-global-container').style.display = 'none';
        container.querySelector('.initial-message-chileSORD').style.display = 'block';

        // Deshabilitar botón de reinicio
        resetButton.disabled = true;

        // Detener audio si está reproduciéndose
        const audioElement = container.querySelector('audio');
        if (audioElement) {
            audioElement.pause();
            audioElement.currentTime = 0;
        }

        // Reiniciar botón de transcripción
        const transcriptionToggle = container.querySelector('.transcription-toggle');
        if (transcriptionToggle) {
            transcriptionToggle.style.color = "#666";
            transcriptionToggle.title = "Activar subtítulos";
        }

        // Ocultar transcripción global
        const transcriptionGlobal = document.getElementById('transcripcion-global');
        if (transcriptionGlobal) {
            transcriptionGlobal.style.display = 'none';
        }

        // Volver a renderizar las cards
        renderCards();
    }
}