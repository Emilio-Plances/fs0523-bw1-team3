const welcomeSection=document.querySelector(`.welcomeSection`);
const checkbox = welcomeSection.querySelector('.checkbox');
const button = welcomeSection.querySelector('.button');

checkbox.addEventListener('change', function() {
    if(checkbox.checked){
        button.classList.add ('abled');
    }else{ 
        button.classList.remove ('abled')};
});

button.addEventListener(`click`,()=>{
    if(!button.classList.contains(`abled`)){
        return;
    }
    welcomeSection.remove()
})