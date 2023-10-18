let target = document.querySelector('.target');
let templates = document.querySelectorAll('template');
let firstTemplate = templates[0].content.cloneNode(true);
let secondTemplate = templates[1].content.cloneNode(true);
let thirdTemplate = templates[2].content.cloneNode(true);
let fourthTemplate = templates[3].content.cloneNode(true);

let startButton = document.querySelector('.startButton');
startButton.addEventListener('click', function() {
    target.innerHTML = '';
    target.append(firstTemplate);
});


