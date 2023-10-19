let containerResult = document.querySelector(".container-result");
let buttonResult = containerResult.querySelector("button");
let containerFb = document.querySelector(".container-fb-result");


//Inizio Donut
const risultati = []
risultati[0]= 20
risultati[1]=80

const myChart = document.querySelector('.my-chart');
new Chart(myChart, {
        type : 'doughnut',
        data : {
            labels : ['Wrong', 'Correct'],
            datasets : [
                {
                data : risultati,
                backgroundColor: ['rgb(194 18 141)' , 'rgb(0 255 255)'],
                borderColor: 'transparent',
                }
            ]
        },
        options:{
            plugins:{
                legend: {
                    display: false
                }
            },
            cutout: 135
        },

 });


 buttonResult.addEventListener('click',() =>{
    containerResult.remove();
    containerFb.classList.remove("hidden");
    return;
 });
//fine Donut

//Inizio Feedback

function resetCommento() {
    const commento = document.querySelector('input[name="text"]');
    if (commento) {
        commento.value = ''; 
    }
}

function resetStarRating() {
    const starInputs = document.querySelectorAll('input[name="star"]');
    if (starInputs) {
        starInputs.forEach(input => {
            input.checked = false; 
        });
    }
}

const resetButton = document.querySelector('.button-fb');
if (resetButton) {
    resetButton.addEventListener('click', function () {
        resetCommento(); 
        resetStarRating(); 
        Swal.fire({
            icon: 'success',
            title: 'Grazie per il FeedBack',
            
          })
    });
}
//Fine Feedback
 