

function resetCommentField() {
    const commentField = document.querySelector('input[name="text"]');
    if (commentField) {
        commentField.value = ''; 
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
        resetCommentField(); 
        resetStarRating(); 
        Swal.fire({
            icon: 'success',
            title: 'Grazie per il FeedBack',
            
          })
    });
}

