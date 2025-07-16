

let timerInput = document.getElementById("time").innerHTML;

let timerShow = document.getElementById("timer");


timeMinut = parseInt(timerInput) * 60


timer = setInterval(function () {
    seconds = timeMinut % 60
    minutes = timeMinut / 60 % 60
    hour = timeMinut / 60 / 60 % 60
    if (timeMinut <= 0) {
        clearInterval(timer);
        alert("Тест тапсыру уақыты бітті!")
        setInterval(function () { document.location.reload(); }, 1000);
    } else {
        let strTimer = `${Math.trunc(hour)}:${Math.trunc(minutes)}:${seconds}`;
        timerShow.innerHTML = strTimer;
    }
    --timeMinut;
}, 1000)

