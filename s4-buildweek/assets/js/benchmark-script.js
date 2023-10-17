let countdownNumber = document.querySelector('.countdown-number span');
let reset=document.querySelector(`button`);
let circle=document.querySelector(`circle`);
let domanda=document.querySelector(`.domanda`);
let nextQuestion=document.querySelector(`.next-question`);
let risposte=document.querySelector(`.risposte`);
let questionCounter=document.querySelector(`.question-counter p`);
let countdown = 60;

countdownNumber.innerText = countdown;
reset.addEventListener(`click`,()=>{
  countdown=61;
  circle.getAnimations().forEach((anim) => {
    anim.cancel();
    anim.play();
  });
})

setInterval(function() {
  countdown = --countdown < 0 ? 60 : countdown;
  countdownNumber.innerText = countdown;
}, 1000);


/**************************************************+
 *  Sezione domande
 * * */

fetch(`https://opentdb.com/api.php?amount=10&category=18&difficulty=easy`)
.then(res=>res.json())
.then(res=>{
  let domande=res.results;
  
  let i=0;
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
    i=next(i,domande);
    console.log(i);
  })
})


function next(i,myArray) {
  let newArray=[...myArray[i].incorrect_answers,myArray[i].correct_answer];

  //controlloRisposta(myArray);

  if(i>=myArray.length)
    return;
  
  questionCounter.innerHTML=`Domanda ${i+1} <span>/${myArray.length}</span>`;

  domanda.innerHTML=myArray[i].question;
  newArray.sort();

  console.dir(risposte);
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
  
  
  return i;
}

function rispostaButton(risposta,risposte) {

  risposta.addEventListener(`click`,()=>{
    risposte.childNodes.forEach(element=>{
      element.style.backgroundColor=``;
    })
    risposta.style.backgroundColor=`#900080`;
  })
  
}

function controlloRisposta(myArray){

  let rispostaData = Array.from(risposte.childNodes).filter(element=>{
    return element.style.backgroundColor==`#900080`;
  })
  
  console.log(rispostaData);
}


