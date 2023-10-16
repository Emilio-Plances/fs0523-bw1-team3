var countdownNumber = document.querySelector('.countdown-number span');
var countdown = 60;

countdownNumber.textContent = countdown;

setInterval(function() {
  countdown = --countdown <= 0 ? 60 : countdown;

  countdownNumber.textContent = countdown;
}, 1000);