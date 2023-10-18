
const checkbox = document.querySelector('.checkbox');
const button = document.querySelector('.button');

checkbox.addEventListener('change', function() {
    if (checkbox.checked) {button.disabled = false; 
        button.classList.remove ('disabled');
    }else {button.disabled=true;
        button.classList.add ('disabled')};
});

