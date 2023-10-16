// Cambio di pagina quando il timer arriva a 0
let tempo = 60; // Imposta il tempo iniziale del timer
let timer = document.querySelector('.timer'); // Sostituisci '.timer' con la classe o l'ID del tuo timer
let countdown;

function startTimer() {
    countdown = setInterval(function() {
        tempo--;
        if(tempo <= 10) {
            timer.style.color = 'red'; // Cambia il colore del timer in rosso quando rimangono 10 secondi o meno
        }
        if(tempo <= 0) {
            clearInterval(countdown);
            // Inserisci qui il codice per ripristinare il timer a 60
            tempo = 60;
            timer.style.color = ''; // Resetta il colore del timer
            startTimer(); // Avvia il timer nuovamente
        }
    }, 1000);
}

startTimer(); // Avvia il timer all'inizio

// Cambio di colore quando passi con il mouse sulle domande
let domande = document.querySelectorAll('.blocco-domande'); // Sostituisci '.blocco-domande' con la classe o l'ID delle tue domande

domande.forEach(function(domanda) {
    domanda.addEventListener('click', function() {
        this.style.backgroundColor = 'yellow'; // Cambia 'yellow' con il colore desiderato
    });
});

// Aggiungi un pulsante "Prossima domanda" dopo ogni risposta
let risposte = document.querySelectorAll('.risposta'); // Sostituisci '.risposta' con la classe o l'ID delle tue risposte

risposte.forEach(function(risposta) {
    risposta.addEventListener('click', function() {
        this.style.backgroundColor = 'yellow'; // Cambia 'yellow' con il colore desiderato
        showNextButton(this);
    });
});

function showNextButton(risposta) {
    let pulsante = document.createElement('button');
    pulsante.textContent = 'Prossima domanda';
    pulsante.addEventListener('click', function() {
        // Qui inserisci il codice per caricare la prossima domanda
        risposta.style.backgroundColor = ''; // Rimuovi il colore dalla risposta
        pulsante.style.display = 'none'; // Nascondi il pulsante dopo aver risposto
    });
    risposta.appendChild(pulsante);
}

// Evento per resettare il timer quando viene caricata una nuova domanda
document.querySelector('.blocco-domande').addEventListener('nuovaDomanda', function() {
    tempo = 60; // Resetta il timer a 60
    timer.style.color = ''; // Resetta il colore del timer
    startTimer(); // Avvia il timer quando viene caricata una nuova domanda
});


