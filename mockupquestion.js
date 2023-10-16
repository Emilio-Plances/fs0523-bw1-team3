// Cambio di pagina quando il timer arriva a 0
let tempo = 60; // Imposta il tempo iniziale del timer
let timer = document.querySelector('.timer'); // Sostituisci '.timer' con la classe o l'ID del tuo timer

let countdown = setInterval(function() {
    tempo--;
    if(tempo <= 10) {
        timer.style.color = 'red'; // Cambia il colore del timer in rosso quando rimangono 10 secondi o meno
    }
    if(tempo <= 0) {
        clearInterval(countdown);
        location.href = "http://www.nuovapagina.it"; // Inserisci l'URL della nuova pagina
    }
}, 1000);
// Cambio di colore quando passi con il mouse sulle domande
let domande = document.querySelectorAll('.domanda'); // Sostituisci '.domanda' con la classe o l'ID delle tue domande

domande.forEach(function(domanda) {
    domanda.addEventListener('mouseover', function() {
        this.style.backgroundColor = 'yellow'; // Cambia 'yellow' con il colore desiderato
    });
    domanda.addEventListener('mouseout', function() {
        this.style.backgroundColor = ''; // Rimuove il colore quando il mouse non è più sulla domanda
    });
});
