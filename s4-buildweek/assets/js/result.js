const containerResult = document.querySelector(".container-result");
const buttonResult = containerResult.querySelector("button");
const myChart = containerResult.querySelector('.my-chart');
const slotEsatte=containerResult.querySelector(`.correct`);
const slotErrate=containerResult.querySelector(`.wrong`);
const resultText=containerResult.querySelector(`.result-text`);
const containerFb = document.querySelector(".container-fb-result");


/*VARIABILE DA CANCELLARE*/ let risposteEsatte=6;   let domande=[12,12,12,12,12,12,12,1,212,1];




result(domande);
function result(myArray) {
    let percentualeEsatta=(risposteEsatte*100)/myArray.length;
    let risposteErrate=myArray.length-risposteEsatte;
    let percentualeErrata=100-percentualeEsatta;
    let slotPercentualeEsatto=document.createElement(`h5`);
    let slotFrazioneEsatto=document.createElement(`h6`);
    let slotPercentualeErrato=document.createElement(`h5`);
    let slotFrazioneErrato=document.createElement(`h6`);
    let titoloResultText=document.createElement(`h6`);
    let spanResultText=document.createElement(`span`);
    let pResultText=document.createElement(`p`);
    
    const risultati = [percentualeErrata, percentualeEsatta];

    //Inizio Donut
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
    //fine Donut



    slotPercentualeEsatto.innerText=`${percentualeEsatta} %`
    slotFrazioneEsatto.innerText=`${risposteEsatte}/${myArray.length} questions`;
    
    slotPercentualeErrato.innerText=`${percentualeErrata} %`
    slotFrazioneErrato.innerText=`${risposteErrate}/${myArray.length} questions`;

    slotEsatte.append(slotPercentualeEsatto,slotFrazioneEsatto);
    slotErrate.append(slotPercentualeErrato,slotFrazioneErrato);

    console.log(percentualeEsatta);
    console.log(percentualeErrata);

    if(risposteEsatte>=6){
        titoloResultText.innerText=`Congratulations!`
        spanResultText.innerText=`You passed the exam!`
        pResultText.innerText=`We'll send you the certificate in few minutes. Check your email (including promotions/spam folder)`
    }else{
        titoloResultText.innerText=`BOCCIATO!`
        spanResultText.innerText=`You not passed the exam!`
        pResultText.innerText=`We'll send you the certificate in few minutes. Check your email (including promotions/spam folder)`
    }

    resultText.append(titoloResultText, spanResultText, pResultText);


}









buttonResult.addEventListener('click',() =>{
containerResult.remove();
containerFb.classList.remove("hidden");
return;
});












































































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
 