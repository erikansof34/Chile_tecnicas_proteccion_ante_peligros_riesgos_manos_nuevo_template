export function init() {
    loadIframe({
        id: 'Slide3-3Web',
        src: 'https://iframe.mediadelivery.net/embed/406826/b851e339-b5e5-49e3-b68f-2f7c5f6a1316?autoplay=false&loop=false&muted=false&preload=true&responsive=true',
        className: 'iframe-video-horizontal-web',
        style: 'width: 20vw; height: 70vh; min-height: 300px;',
    });

    // Añadir evento para marcar la tarjeta activa cuando se abre un modal
    document.querySelectorAll('.protocol-card button').forEach(button => {
        button.addEventListener('click', function () {
            // Remover la clase active de todas las tarjetas
            document.querySelectorAll('.protocol-card').forEach(card => {
                card.classList.remove('active');
            });

            // Añadir la clase active a la tarjeta padre del botón clickeado
            this.closest('.protocol-card').classList.add('active');
        });
    });

    // Remover la clase active cuando se cierra un modal
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('hidden.bs.modal', function () {
            // Mantener la tarjeta activa con borde para indicar que fue la última abierta
            // No remover la clase active aquí para mantener el indicador visual
        });
    });
}