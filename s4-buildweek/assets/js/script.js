const checkbox = document.querySelector('.checkbox');
const button = document.querySelector('.button');

checkbox.addEventListener('change', function() {
    if(checkbox.checked){
        button.classList.add ('abled');
    }else{ 
        button.classList.remove ('abled')};
});

