export function init() {
    //-------------------------------------//
    //OBS-SEG-MOM3-8
    let audiosObsSegMom38 = document.querySelectorAll(".card_obs-seg-mom3-8 audio");
    let botonesActivos = document.querySelectorAll(".boton_obs-seg-mom3-8");
    let cardsActivas = document.querySelectorAll(".card_obs-seg-mom3-8");

    // Función para detener todos los audios excepto el especificado
    function detenerOtrosAudios(audioActual) {
        audiosObsSegMom38.forEach(audio => {
            if (audio !== audioActual && !audio.paused) {
                audio.pause();
                audio.currentTime = 0;
            }
        });
    }

    // Función para quitar la clase activa de todos los botones
    function quitarActivoBotones() {
        botonesActivos.forEach(boton => {
            boton.classList.remove('activo');
        });
    }

    // Función para quitar la clase activa de todas las cards
    function quitarActivoCards() {
        cardsActivas.forEach(card => {
            card.classList.remove('activo');
        });
    }

    // Configurar event listeners para los controles de audio
    audiosObsSegMom38.forEach(audio => {
        audio.addEventListener('play', function () {
            detenerOtrosAudios(this);
        });

        audio.addEventListener('ended', function () {
            // Cuando el audio termina, quitar las clases activas
            const numero = this.id.split('-')[1];
            document.querySelector(`.boton-${numero}`).classList.remove('activo');
            document.getElementById(`card-${numero}_obs-seg-mom3-8`).classList.remove('activo');
        });
    });

    // Hacer la función accesible globalmente
    window.mostrarCardObsSegMom38 = function (numero) {
        // Quitar clases activas de todos los botones y cards
        quitarActivoBotones();
        quitarActivoCards();

        // Añadir clase activa al botón seleccionado
        const botonSeleccionado = document.querySelector(`.boton-${numero}`);
        if (botonSeleccionado) {
            botonSeleccionado.classList.add('activo');
        }

        // Mostrar la tarjeta seleccionada y añadir clase activa
        let card = document.getElementById(`card-${numero}_obs-seg-mom3-8`);
        if (card) {
            card.style.display = "block";
            card.classList.add('activo');
        }

        // Detener cualquier otro audio en reproducción
        detenerOtrosAudios();

        // Reproducir el audio de la tarjeta seleccionada
        let audio = document.getElementById(`audio-${numero}_obs-seg-mom3-8`);
        if (audio) {
            audio.play();
        }
    };

    // Asegurar que todas las tarjetas estén ocultas inicialmente
    document.querySelectorAll(".card_obs-seg-mom3-8").forEach(card => {
        card.style.display = "none";
    });
}