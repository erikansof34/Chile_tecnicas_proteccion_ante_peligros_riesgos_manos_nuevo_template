// JavaScript para tooltips Momento 3 Slide 11
let tarjetasMostradasTooltipMom3Sld11 = [];
let contenedorImagen = document.querySelector('.imagen-botones-tooltips-mom3-11');
let contenedorTarjetas = document.querySelector('.tarjetas-tooltips-mom3-11');
let contenedorPrincipal = document.querySelector('.contenido-tooltips-mom3-11');

function mostrarCardTooltipMom3Sld11(numero) {
    let card = document.getElementById(`card-${numero}-tooltips-mom3-11`);

    // Si ya está mostrada, no hacer nada
    if (tarjetasMostradasTooltipMom3Sld11.includes(numero)) {
        return;
    }

    // Mostrar la tarjeta
    card.classList.add('mostrado');
    tarjetasMostradasTooltipMom3Sld11.push(numero);

    // Si es la primera tarjeta que se muestra, contraer la imagen y mostrar el contenedor de tarjetas
    if (tarjetasMostradasTooltipMom3Sld11.length === 1) {
        contenedorImagen.classList.add('contraido');
        contenedorTarjetas.classList.add('mostrado');
        contenedorPrincipal.style.justifyContent = 'space-between';
    }

    // Aplicar color según el número
    switch (numero) {
        case 1:
            card.style.backgroundColor = "#6e3cd2";
            break;
        case 2:
            card.style.backgroundColor = "#6e3cd2";
            break;
        case 3:
            card.style.backgroundColor = "#6e3cd2";
            break;
    }
}

// Inicialización
export function init() {
    // Hacer las funciones disponibles globalmente
    window.mostrarCardTooltipMom3Sld11 = mostrarCardTooltipMom3Sld11;

    // Restablecer el estado si es necesario
    tarjetasMostradasTooltipMom3Sld11 = [];
}