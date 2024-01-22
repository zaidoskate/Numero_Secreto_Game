let secret = 0;
let attempts = 0;
let generatedNumbers = [];
const MAX = 10;

function asignarTextoElemento(elemento, texto) {
    let elementoDOM = document.querySelector(elemento);//returns an object
    elementoDOM.innerHTML = texto;
    return;
}

function verificarIntento() {
    let userTry = parseInt(document.getElementById('numberInput').value);
    if(userTry === secret){
        asignarTextoElemento('p',`You won in ${attempts} ${attempts === 1 ? 'attempt' : 'attempts'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        //User failed
        if(userTry > secret){
            asignarTextoElemento('p','Secret number is lower');
        } else {
            asignarTextoElemento('p','Secret number is higher');
        }
        attempts++;
        clearNumberField();
    }
    return;
}

function clearNumberField(){
    document.querySelector('#numberInput').value = '';
}

function generarNumeroSecreto() {
    let generatedNumber = Math.floor(Math.random() * MAX) + 1;

    // Si todos los números han sido seleccionados
    if (generatedNumbers.length === MAX) {
        asignarTextoElemento('p', '¡Todos los números ya han sido seleccionados! :D');
    } else {
        // Si el número generado ya está en el array
        if (!generatedNumbers.includes(generatedNumber)) {
            generatedNumbers.push(generatedNumber);
            secret = generatedNumber; // Actualizamos la variable secret correctamente
        } else {
            return generarNumeroSecreto(); // Retorna el valor en el caso base
        }
    }

    return secret; // Retorna el valor en el caso base
}


function initialConditions(){
    asignarTextoElemento('h1', 'Guess the secret number');
    asignarTextoElemento('p',`Select a number between 1-${MAX}`);
    secret = generarNumeroSecreto();
    attempts = 1;
}

function reiniciarJuego() {
    //Clear field
    clearNumberField();
    //Reset initial text and attempts
    initialConditions();
    //Disable 'Nuevo juego' again
    document.querySelector('#reiniciar').setAttribute('disabled','true');
}

initialConditions();