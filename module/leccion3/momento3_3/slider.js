export function init() {
    const btnAmbiental = document.getElementById('btn-ambiental');
    const btnSalud = document.getElementById('btn-salud');
    const contentAmbiental = document.getElementById('ambiental-content');
    const contentSalud = document.getElementById('salud-content');
    const contentTitle = document.getElementById('content-title');

    // Variable para almacenar el audio que se está reproduciendo actualmente
    let currentPlayingAudio = null;

    function switchContent(target) {
        if (target === 'ambiental') {
            btnAmbiental.classList.add('active');
            btnSalud.classList.remove('active');
            contentAmbiental.style.display = 'block';
            contentSalud.style.display = 'none';
            contentTitle.textContent = 'La vigilancia ambiental';

            const ambientalCarousel = document.getElementById('ambientalCarousel');
            if (ambientalCarousel) {
                const carousel = new bootstrap.Carousel(ambientalCarousel);
                carousel.to(0);
            }
        } else {
            btnAmbiental.classList.remove('active');
            btnSalud.classList.add('active');
            contentAmbiental.style.display = 'none';
            contentSalud.style.display = 'block';
            contentTitle.textContent = 'La vigilancia de salud';

            const saludCarousel = document.getElementById('saludCarousel');
            if (saludCarousel) {
                const carousel = new bootstrap.Carousel(saludCarousel);
                carousel.to(0);
            }
        }

        // Detener cualquier audio que esté reproduciéndose al cambiar de pestaña
        if (currentPlayingAudio) {
            currentPlayingAudio.pause();
            currentPlayingAudio.currentTime = 0;
            currentPlayingAudio = null;
        }
    }

    btnAmbiental.addEventListener('click', function () {
        switchContent('ambiental');
    });

    btnSalud.addEventListener('click', function () {
        switchContent('salud');
    });

    // Función para manejar el evento de mostrar un acordeón
    function handleAccordionShow(event) {
        // Detener el audio que se esté reproduciendo actualmente
        if (currentPlayingAudio) {
            currentPlayingAudio.pause();
            currentPlayingAudio.currentTime = 0;
        }

        // Obtener el elemento de audio dentro del acordeón que se está mostrando
        const audioElement = event.target.querySelector('audio');
        if (audioElement) {
            currentPlayingAudio = audioElement;
            // Reproducir automáticamente el nuevo audio
            audioElement.play();
        }
    }

    // Agregar event listeners a todos los acordeones
    document.querySelectorAll('.accordion-collapse').forEach(collapse => {
        collapse.addEventListener('show.bs.collapse', handleAccordionShow);
    });

    // Manejar el audio del primer acordeón que está abierto inicialmente
    const firstAccordionAudio = document.querySelector('.accordion-collapse.show audio');
    if (firstAccordionAudio) {
        firstAccordionAudio.addEventListener('play', function () {
            // Cuando se reproduce el audio del primer acordeón, lo asignamos como currentPlayingAudio
            if (currentPlayingAudio && currentPlayingAudio !== this) {
                currentPlayingAudio.pause();
                currentPlayingAudio.currentTime = 0;
            }
            currentPlayingAudio = this;
        });
    }

    // Inicializar con la pestaña ambiental
    switchContent('ambiental');
}