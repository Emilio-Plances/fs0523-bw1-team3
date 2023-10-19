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

setInterval(function() {
  if(i<10 && !containerBenchmark.classList.contains(`hidden`)){
    countdown = --countdown < 0 ? 60 : countdown;
    countdownNumber.innerText = countdown;
  }
}, 1000);

/**************************************************+
 *  Sezione domande
 * * */

fetch(`https://opentdb.com/api.php?amount=10&category=18&difficulty=easy`)
.then(res=>res.json())
.then(res=>{

  let domande=res.results;
  console.log(domande);
  next(i,domande);
  setInterval(function() {
    if(countdown==0){
      i++;
      next(i,domande);
    }
  }, 1000);
  domanda.innerHTML=domande[i].question;

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
    console.log(risposteEsatte);
    if(i==10){
      containerBenchmark.remove();
      //containerResult.classList.remove(`hidden`);
      //RICHIAMO FUNZIONE RESULT
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

  questionCounter.innerHTML=`Domanda ${i+1} <span>/${myArray.length}</span>`;

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