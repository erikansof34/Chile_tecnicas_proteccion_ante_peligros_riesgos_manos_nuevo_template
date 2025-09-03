export function init() {
  // Configuración de la actividad
  const items = [
    {
      image: "./momento1_3/img/fisicas_correccion_sin_ruido_visual.webp",
      audio: "./momento1_3/audio/fisicas-m1-slide-8-audio.mp3",
      dropId: "drop1",
      correctOption: "Físicas",
      audioId: "fisicas"
    },
    {
      image: "./momento1_3/img/economicas_correccion-sin_flecha.webp",
      audio: "./momento1_3/audio/economicas-m1-slide-8-audio.mp3",
      dropId: "drop2",
      correctOption: "Económicas",
      audioId: "economicas"
    },
    {
      image: "./momento1_3/img/laborales_con_fondo_sld5.webp",
      audio: "./momento1_3/audio/LABORALES.mp3",
      dropId: "drop3",
      correctOption: "Laborales",
      audioId: "laborales"
    },
  ];

  const transcripciones = {
    fisicas: [
      { start: 0, end: 5, text: "FÍSICAS: Las lesiones en las manos pueden variar desde cortes leves hasta fracturas, " },
      { start: 5, end: 12, text: "quemaduras graves o amputaciones, lo que en casos extremos puede llevar a una discapacidad parcial" },
      { start: 12, end: 17, text: "o total que limite al trabajador en sus actividades diarias o profesionales " }
    ],
    economicas: [
      { start: 0, end: 6, text: "ECONÓMICAS: Las lesiones en las manos generan importantes consecuencias económicas." },
      { start: 7, end: 15, text: "Los gastos médicos, como hospitalización, cirugías y rehabilitación, suelen ser altos y cubiertos por seguros de la empresa." },
      { start: 16, end: 20, text: "Además, el trabajador puede experimentar una pérdida de ingresos," },
      { start: 20, end: 26, text: "ya que el seguro de incapacidad temporal no siempre cubre el salario completo " },
    ],
    laborales: [
      { start: 0, end: 5, text: "LABORALES: Las lesiones en las manos pueden causar licencias prolongadas, " },
      { start: 5, end: 10, text: "afectando la productividad y los plazos en el cumplimiento de las entregas." },
      { start: 10, end: 15, text: "Dependiendo de la gravedad, el trabajador podría no recuperar su capacidad plena," },
      { start: 15, end: 17, text: "lo que podría resultar en reasignaciones de tareas," },
      { start: 17, end: 22, text: "reducción de responsabilidades o la imposibilidad de seguir en su profesión " },
    ]
  };

  // Estado de la actividad
  let selections = {
    drop1: "",
    drop2: "",
    drop3: "",
  };

  let isVerified = {
    drop1: false,
    drop2: false,
    drop3: false,
  };

  let isResetEnabled = false;
  let correctCount = 0;
  let currentAudio = null;

  // Elementos DOM
  const selects = document.querySelectorAll('.lesion-select');
  const resetButton = document.getElementById('reset-button');
  const feedbackMessage = document.getElementById('feedback-message');
  const resultsContainer = document.querySelector('.results-container-chileDAD');
  const resultsText = document.getElementById('results-text');
  const audioContainer = document.getElementById('audio-container');
  const globalAudio = document.getElementById('global-audio');
  const transcripcionGlobal = document.getElementById('transcripcion-global');

  // Iconos de validación (creados como elementos en lugar de imágenes)
  const checkIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="60" height="40" fill="#4CAF50"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>`;
  const xmarkIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="60" height="40" fill="#F44336"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>`;

  // Inicializar opciones en los selects
  function updateSelectOptions() {
    const selectedValues = Object.values(selections);

    selects.forEach(select => {
      const currentValue = select.value;
      Array.from(select.options).forEach(option => {
        if (option.value && option.value !== currentValue && selectedValues.includes(option.value)) {
          option.style.display = 'none';
        } else {
          option.style.display = 'block';
        }
      });
    });
  }

  // Manejar cambios en los selects
  function handleSelectChange(e) {
    const dropId = e.target.id;
    const value = e.target.value;

    // Actualizar selección
    selections[dropId] = value;

    // Actualizar opciones disponibles
    updateSelectOptions();

    // Verificar si la respuesta es correcta
    const currentItem = items.find(item => item.dropId === dropId);
    const isCorrect = value === currentItem.correctOption;

    isVerified[dropId] = isCorrect;

    // Actualizar interfaz
    const card = document.getElementById(`card-${dropId}`);
    const validationIcon = card.querySelector('.validation-icon-container-chileDAD');
    const feedbackText = card.querySelector('.feedback-text-chileDAD');
    const select = card.querySelector('select');

    if (isCorrect) {
      card.classList.add('correct');
      card.classList.remove('incorrect');
      select.classList.add('correct-select');
      select.classList.remove('incorrect-select');
      validationIcon.innerHTML = checkIcon;
      validationIcon.style.display = 'block';
      feedbackText.textContent = '¡Correcto!';
      feedbackText.classList.add('correct-text');
      feedbackText.classList.remove('incorrect-text');
      feedbackText.style.display = 'block';

      feedbackMessage.textContent = '¡Correcto! Ahora, escucha el siguiente audio que complementa esta información';
      feedbackMessage.className = 'feedback-message-chileDAD success-message';

      // Configurar y reproducir audio
      currentAudio = {
        src: currentItem.audio,
        transcripcion: transcripciones[currentItem.audioId]
      };

      globalAudio.src = currentAudio.src;
      audioContainer.style.display = 'flex';

      // Intentar reproducir automáticamente
      const playAudio = async () => {
        try {
          await globalAudio.play();
        } catch (error) {
          console.log("Autoplay prevented:", error);
          feedbackMessage.textContent += ' Haz clic en el botón de play para escuchar el audio.';
        }
      };
      playAudio();

    } else {
      card.classList.add('incorrect');
      card.classList.remove('correct');
      select.classList.add('incorrect-select');
      select.classList.remove('correct-select');
      validationIcon.innerHTML = xmarkIcon;
      validationIcon.style.display = 'block';
      feedbackText.textContent = '¡Incorrecto!';
      feedbackText.classList.add('incorrect-text');
      feedbackText.classList.remove('correct-text');
      feedbackText.style.display = 'block';

      feedbackMessage.textContent = 'No has seleccionado correctamente';
      feedbackMessage.className = 'feedback-message-chileDAD error-message';

      // Detener audio si está reproduciendo
      globalAudio.pause();
      globalAudio.currentTime = 0;
      audioContainer.style.display = 'none';
      currentAudio = null;
    }

    // Habilitar botón de reinicio
    isResetEnabled = true;
    resetButton.disabled = false;

    // Calcular respuestas correctas
    correctCount = items.filter(item => selections[item.dropId] === item.correctOption).length;

    // Mostrar resultados si todas están respondidas
    const allAnswered = Object.values(selections).every(val => val !== "");
    if (allAnswered) {
      resultsContainer.style.display = 'flex';
      resultsText.textContent = `Tus respuestas correctas son: ${correctCount} de ${items.length} (${Math.round((correctCount / items.length) * 100)}%)`;
    }
  }

  // Reiniciar actividad
  function handleReset() {
    // Reiniciar estado
    selections = {
      drop1: "",
      drop2: "",
      drop3: "",
    };

    isVerified = {
      drop1: false,
      drop2: false,
      drop3: false,
    };

    isResetEnabled = false;
    correctCount = 0;
    currentAudio = null;

    // Reiniciar interfaz
    selects.forEach(select => {
      select.value = "";
      select.classList.remove('correct-select', 'incorrect-select');
      select.disabled = false;
    });

    document.querySelectorAll('.card-container-chileDAD').forEach(card => {
      card.classList.remove('correct', 'incorrect');
    });

    document.querySelectorAll('.validation-icon-container-chileDAD').forEach(icon => {
      icon.style.display = 'none';
      icon.innerHTML = '';
    });

    document.querySelectorAll('.feedback-text-chileDAD').forEach(text => {
      text.style.display = 'none';
      text.textContent = '';
    });

    feedbackMessage.textContent = '';
    feedbackMessage.className = 'feedback-message-chileDAD';
    resultsContainer.style.display = 'none';
    audioContainer.style.display = 'none';
    globalAudio.pause();
    globalAudio.currentTime = 0;
    resetButton.disabled = true;

    // Restablecer opciones en los selects
    updateSelectOptions();
  }

  // Configurar event listeners
  selects.forEach(select => {
    select.addEventListener('change', handleSelectChange);
  });

  resetButton.addEventListener('click', handleReset);

  // Inicializar opciones
  updateSelectOptions();
}