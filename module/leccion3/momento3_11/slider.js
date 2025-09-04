export function init() {
    // Seleccionar todos los elementos del acordeón
    const accordionItems = document.querySelectorAll('.accordion-item');

    // Inicializar todos cerrados
    accordionItems.forEach(item => {
        item.classList.remove('active');
    });

    // Añadir event listeners a cada header del acordeón
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');

        header.addEventListener('click', () => {
            // Cerrar otros acordeones abiertos (comportamiento de acordeón)
            if (!item.classList.contains('active')) {
                accordionItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });
            }

            // Alternar el estado del acordeón clickeado
            item.classList.toggle('active');
        });
    });
}