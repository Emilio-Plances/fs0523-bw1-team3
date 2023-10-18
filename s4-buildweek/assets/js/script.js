//donut

const risultati = []
risultati[0]= 20
risultati[1]=80

const myChart = document.querySelector('.my-chart');
new Chart(myChart, {
        type : 'doughnut',
        data : {
            labels : ['Wrong', 'Correct'],
            datasets : [
                {
                data : risultati,
                backgroundColor: ['rgb(194 18 141)' , 'rgb(0 255 255)'],
                borderColor: 'transparent',
                }
            ]
        },
        options:{
            plugins:{
                legend: {
                    display: false
                }
            },
            cutout: 135
        },

 });

const checkbox = document.querySelector('.checkbox');
const button = document.querySelector('.button');

checkbox.addEventListener('change', function() {
    if (checkbox.checked) {button.disabled = false; 
        button.classList.remove ('disabled');
    }else {button.disabled=true;
        button.classList.add ('disabled')};
});

