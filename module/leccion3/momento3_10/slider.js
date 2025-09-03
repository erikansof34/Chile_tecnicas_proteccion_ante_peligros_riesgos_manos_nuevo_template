export function init() {
    const sfCardData = [
        {
            icon: "fa-user-tie",
            title: "Responsabilidades",
            description: "Ej: Supervisores, operadores, equipo de seguridad.",
            audio: "responsabilidades-m3-ppt-36.mp3"
        },
        {
            icon: "fa-clipboard-check",
            title: "Condiciones previas",
            description: "Ej: Permisos, inspecciones, análisis de riesgo.",
            audio: "condiciones-previas-m3-ppt-36.mp3"
        },
        {
            icon: "fa-hard-hat",
            title: "Equipamiento",
            description: "Ej: EPP, herramientas, equipos de medición.",
            audio: "equipamiento-necesario-m3-ppt-36.mp3"
        },
        {
            icon: "fa-list-check",
            title: "Instrucciones",
            description: "Ej: Pasos, secuencia, puntos críticos.",
            audio: "instucciones-detalladas-m3-ppt-36.mp3"
        },
        {
            icon: "fa-stamp",
            title: "Revisión",
            description: "Ej: Check-list, firmas, validaciones.",
            audio: "revision-m3-ppt-36.mp3"
        },
        {
            icon: "fa-chalkboard-teacher",
            title: "Capacitación",
            description: "Ej: Cursos, demostraciones, evaluaciones.",
            audio: "capacitacion-a-trabajadores-m3-ppt-36.mp3"
        },
        {
            icon: "fa-chart-line",
            title: "Mejora continua",
            description: "Ej: Feedback, actualizaciones, lecciones.",
            audio: "mejora-continua-m3-ppt-36.mp3"
        },
        {
            icon: "fa-flag-checkered",
            title: "Conclusiones",
            description: "Ej: Resumen, compromisos, cierre.",
            audio: "conclusiones-m3-ppt-36.mp3"
        }
    ];

    const container = document.getElementById("sfCardsContainerMom3Sld10");
    if (!container) return;

    // Limpiar contenido anterior si existe
    container.innerHTML = "";

    // Renderizar las tarjetas
    sfCardData.forEach((item, index) => {
        const col = document.createElement("div");

        // Ajuste para las últimas 2 tarjetas (índices 6 y 7)
        if (index === 6) { // Penúltima tarjeta
            col.className = "col-6 col-md-4 ms-md-auto"; // Margen derecho automático
        } else if (index === 7) { // Última tarjeta
            col.className = "col-6 col-md-4 me-md-auto"; // Margen izquierdo automático
        } else {
            col.className = "col-6 col-md-4"; // Layout normal para las primeras 6
        }

        col.innerHTML = `
      <div class="card-mom3-10" data-audio="../../assets/momento3_10/audio/${item.audio}">
        <div class="card-mom3-10-inner">
          <div class="card-mom3-10-front">
            <i class="fa-solid ${item.icon} fa-2x"></i>
            <p class=" mt-2 text-white">${item.title}</p>
          </div>
          <div class="card-mom3-10-back">
            <p class="mb-2 text-white">${item.description}</p>
            <audio controls class="sf-audio-player">
              <source src="../../assets/audio/momento3_10/${item.audio}" type="audio/mp3">
            </audio>
          </div>
        </div>
      </div>
    `;
        container.appendChild(col);
    });

    // Resto del código (lógica de flip y audio) se mantiene igual
    const cards = document.querySelectorAll('.card-mom3-10');
    let currentAudio = null;
    let currentCard = null;

    cards.forEach(card => {
        const audio = card.querySelector('audio');

        card.addEventListener('click', () => {
            if (currentCard === card) return;
            closeAllExcept(card);

            if (audio) {
                currentAudio = audio;
                currentCard = card;
                card.classList.add('flipped');
                audio.play();
            }
        });

        if (audio) {
            audio.onended = () => {
                card.classList.remove('flipped');
                currentAudio = null;
                currentCard = null;
            };
        }
    });

    function closeAllExcept(exceptCard) {
        cards.forEach(c => {
            if (c !== exceptCard) {
                c.classList.remove('flipped');
                const audio = c.querySelector('audio');
                if (audio) {
                    audio.pause();
                    audio.currentTime = 0;
                }
            }
        });
    }
}