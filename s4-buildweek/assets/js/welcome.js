/*function validaCheckBox() {
    let checkbox= document.querySelector(".checkbox");
    if (checkbox.checked) {console.log("checked");}
    else {console.log("devi prima spuntare");} 
} */

const checkbox = document.querySelector('.checkbox'); // Seleziona l'elemento con la classe "checkbox"
const button = document.querySelector('.myButton'); // Seleziona l'elemento con la classe "myButton"

//  ascoltatore di eventi alla checkbox
checkbox.addEventListener('change', function() {
    button.disabled = !checkbox.checked;   // Abilita o disabilita il pulsante in base allo stato della checkbox
    
});

