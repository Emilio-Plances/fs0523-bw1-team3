const Epiquestion=document.querySelector(`#Epiquestion`)
const welcomeSection=Epiquestion.querySelector(`.welcomeSection`);
const checkbox = welcomeSection.querySelector('#checkbox');
const button = welcomeSection.querySelector('.button');
const containerBenchmark=Epiquestion.querySelector(`.container-benchmark`)
const countdownNumber = containerBenchmark.querySelector('.countdown-number span');
const circle=containerBenchmark.querySelector(`circle`);
const domanda=containerBenchmark.querySelector(`.domanda`);
const nextQuestion=containerBenchmark.querySelector(`.button`);
const risposte=containerBenchmark.querySelector(`.risposte`);
const questionCounter=containerBenchmark.querySelector(`.question-counter p`);
const containerResult = document.querySelector(".container-result");
const buttonResult = containerResult.querySelector("button");
const myChart = containerResult.querySelector('.my-chart');
const slotEsatte=containerResult.querySelector(`.correct`);
const slotErrate=containerResult.querySelector(`.wrong`);
const resultText=containerResult.querySelector(`.result-text`);
const containerFb = Epiquestion.querySelector(".container-fb-result");
const resetButton = containerFb.querySelector('.button-fb');
const fbStar=containerFb.querySelector('.fb-star');
const fbTextInput=containerFb.querySelector(`.fd-foo-text input`)
let risposteEsatte=0;
let countdown = 60;
let i=0;


/***********************************************
 *  WELCOME
 * * */

checkbox.addEventListener('change', function() {
    if(checkbox.checked){
        button.classList.add ('able');
    }else{ 
        button.classList.remove ('able')};
});

button.addEventListener(`click`,()=>{
    if(!button.classList.contains(`able`)){
        return;
    }
    welcomeSection.remove()
    containerBenchmark.classList.remove(`hidden`);
})

/**************************************************
 *  BENCHMARK
 */
countdownNumber.innerText = countdown;



/**************************************************+
 *  Sezione domande
 * * */

fetch(`https://opentdb.com/api.php?amount=10&category=18&difficulty=easy`)
.then(res=>res.json())
.then(res=>{

  let domande=res.results;
  
  next(i,domande);
  domanda.innerHTML=domande[i].question;

  setInterval(function() {
    if(i<10 && !containerBenchmark.classList.contains(`hidden`)){
      if(countdown==0){
        countdown=61;
        let sceltaFatta=getRisposta();
        i++;
        next(i,domande,sceltaFatta); 
      }
      countdown--
      countdownNumber.innerText = countdown;
      
    }
  }, 1000);

  nextQuestion.addEventListener(`click`,()=>{
    let sceltaFatta=getRisposta();

    if(sceltaFatta==''){
      return;
    }
    circle.getAnimations().forEach((anim) => {
    anim.cancel();
    anim.play();
    });
    i++; 
    countdown=61;
    next(i,domande,sceltaFatta);
    if(i==10){
      containerBenchmark.remove();
      containerResult.classList.remove(`hidden`);
      result(domande);
      return;
    } 
  })
})

function next(i,myArray,sceltaFatta) {
  let newArray=[];
  controlloRisposta(myArray,i,sceltaFatta);
  if(i>=myArray.length)
    return;
  if(i<=myArray.length){
    newArray=[...myArray[i].incorrect_answers,myArray[i].correct_answer];
  }

  questionCounter.innerHTML=`Question ${i+1} <span>/${myArray.length}</span>`;

  domanda.innerHTML=myArray[i].question;
  newArray.sort();

  while(risposte.firstChild){
    risposte.removeChild(risposte.firstChild);
  }
  nextQuestion.classList.remove(`able`);
  newArray.forEach(element=>{
    let risposta=document.createElement(`div`);
    risposta.classList.add(`risposta`);
    risposta.innerHTML=element;
    risposte.append(risposta);
    rispostaButton(risposta,risposte);
  })
}

function rispostaButton(risposta,risposte) {

  risposta.addEventListener(`click`,()=>{
    risposte.childNodes.forEach(element=>{
      element.style.backgroundColor=``;
    })
    risposta.style.backgroundColor=`#900080`;
    nextQuestion.classList.add(`able`);
  })
  
}

function controlloRisposta(myArray,i,sceltaFatta){

  if(i>0 && i<=10){
    if(myArray[i-1].correct_answer == sceltaFatta.innerText){
      risposteEsatte++;
    }
  }
}

function getRisposta() {
  let rispostaData=``;
  Array.from(risposte.childNodes).forEach(element=>{
     if(element.style.backgroundColor==`rgb(144, 0, 128)`){
      rispostaData=element;
     }
  })
  return rispostaData;
}
/*********************************
 *    Inizio Results
 * * */

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

  if(risposteEsatte>=6){
      titoloResultText.innerText=`CONGRATULATIONS!`
      spanResultText.innerText=`You passed the exam!`
      pResultText.innerText=`We'll send you the certificate in few minutes. Check your email (including promotions/spam folder)`
  }else{
      titoloResultText.innerText=`FAILED!`
      spanResultText.innerText=`You didn't pass the exam!`
      pResultText.innerText=`We'll send you the failure certificate in few minutes. Check your email (including promotions/spam folder)`
  }

  resultText.append(titoloResultText, spanResultText, pResultText);
}

buttonResult.addEventListener('click',() =>{
  containerResult.remove();
  containerFb.classList.remove("hidden");
  return;
});

/*********************************
 *    Fine Results
 * * */

/*********************************
 *    Inizio Feedback
 * * */
fbStar.addEventListener(`change`,()=>{
  resetButton.classList.add(`able`);
})

resetButton.addEventListener('click', function () {
  if(!resetButton.classList.contains(`able`)){
    Swal.fire({
      icon: 'error',
      title: 'Please leave a feedback',
    })
    return;
  }

  console.log(fbTextInput.value);

  resetCommento(); 
  resetStarRating(); 
  resetButton.classList.remove(`able`)
  Swal.fire({
    icon: 'success',
    title: 'Thank for FeedBack',
  })
});

function resetCommento() {
  const commento = containerFb.querySelector('input[name="text"]');
  if (commento) {
      commento.value = ''; 
  }
}

function resetStarRating() {
  const starInputs = containerFb.querySelectorAll('input[name="star"]');
  if (starInputs) {
      starInputs.forEach(input => {
          input.checked = false; 
      });
  }
}

/*********************************
 *    Fine Feedback
 * * */

/*********************************
 *    FINE JS
 * * */
