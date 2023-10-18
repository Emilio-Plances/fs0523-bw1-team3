let containerBenchmark=document.querySelector(`.container-benchmark`)
let countdownNumber = document.querySelector('.countdown-number span');
let reset=document.querySelector(`button`);
let circle=document.querySelector(`circle`);
let domanda=document.querySelector(`.domanda`);
let nextQuestion=document.querySelector(`.next-question`);
let risposte=document.querySelector(`.risposte`);
let questionCounter=document.querySelector(`.question-counter p`);
let risposteEsatte=0;
let countdown = 60;

countdownNumber.innerText = countdown;
reset.addEventListener(`click`,()=>{
  countdown=60;
  circle.getAnimations().forEach((anim) => {
    anim.cancel();
    anim.play();
  });
})

/**************************************************+
 *  Sezione domande
 * * */

fetch(`https://opentdb.com/api.php?amount=10&category=18&difficulty=easy`)
.then(res=>res.json())
.then(res=>{
  let domande=res.results;
  let i=0;

  if(i<10){
    setInterval(function() {
      countdown = --countdown < 0 ? 60 : countdown;
      countdownNumber.innerText = countdown;
    }, 1000);
  }
 

  
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
    i++; 
    
    countdown=61;
    next(i,domande);
    console.log(risposteEsatte);
    if(i==10){
      containerBenchmark.remove();
      return;
    } 
  })
})

function next(i,myArray) {
  let newArray=[];
  controlloRisposta(myArray,i);
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
  })
  
}

function controlloRisposta(myArray,i){
  
  let rispostaData=`     `;
  Array.from(risposte.childNodes).forEach(element=>{
     if(element.style.backgroundColor==`rgb(144, 0, 128)`){
      rispostaData=element;
     }
  })
  
  if(i>0 && i<=10){
    if(myArray[i-1].correct_answer == rispostaData.innerText){
      risposteEsatte++
    }
  }
}

