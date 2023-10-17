

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

const resetButton = document.getElementById('button');
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

