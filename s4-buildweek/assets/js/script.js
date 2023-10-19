
document.addEventListener("DOMContentLoaded", function () {
    // Dati per il grafico a torta (personalizza questi dati con i tuoi valori)
    var correctPercentage = 66.7;
    var wrongPercentage = 33.3;

    var ctx = document.getElementById('myPieChart').getContext('2d');
    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Correct', 'Wrong'],
            datasets: [{
                data: [correctPercentage, wrongPercentage],
                backgroundColor: ['green', 'red'],
            }]
        },
    });

    // Gestisci l'apertura della finestra
    var modal = document.getElementById('modal');
    var rateButton = document.getElementById('rateButton');

    rateButton.addEventListener('click', function () {
        modal.style.display = 'block';
    });

    // Chiudi la finestra quando si fa clic al di fuori di essa
    window.addEventListener('click', function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
});
