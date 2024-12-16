const switchToStopwatchBtn = document.querySelector("#switchToStopwatch");
const switchToTimerBtn = document.querySelector("#switchToTimer");
const stopWatchDisplay = document.querySelector("#stopwatch");
const timerDisplay = document.querySelector("#timer");
const startStopBtn = document.querySelector("#startStop");
const resetBtn = document.querySelector("#reset");

const minutesDisplay = document.querySelector("#minutes");
const secondsDisplay = document.querySelector("#seconds");
const millisecondsDisplay = document.querySelector("#milliseconds");
const timerMinutes = document.querySelector("#timerMinutes");
const timerSeconds = document.querySelector("#timerSeconds");

let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let isRunning = false;
let interval;
let isStopwatchMode = true;

startStopBtn.addEventListener("click", toggleTimer);
resetBtn.addEventListener("click", resetTimer);

switchToTimerBtn.addEventListener("click", () => switchMode(false));
switchToStopwatchBtn.addEventListener("click", () => switchMode(true));

timerMinutes.addEventListener("blur", ()=> formatInputValue(timerMinutes));
timerSeconds.addEventListener("blur", ()=> formatInputValue(timerSeconds));



function startStopwatch(){
    interval = setInterval(()=>{
        milliseconds += 10;

        if(milliseconds == 1000){
            milliseconds = 0;
            seconds++;

            if(seconds == 60){
                seconds = 0;
                minutes++;
            }
        }

        updateDisplay();
    }, 10)
}

function updateDisplay(){
    minutesDisplay.textContent = padNumber(minutes);
    secondsDisplay.textContent = padNumber(seconds);
    millisecondsDisplay.textContent = padNumber(Math.floor(milliseconds / 10));
}

function padNumber(number){
    return number.toString().padStart(2, "0");
}

function stopStopWatch(){
    clearInterval(interval);
}

function toggleTimer(){
    if(isRunning == false){
        if(isStopwatchMode == true){
            startStopwatch();
        }   
        else{
            startTimer();
        }
        startStopBtn.textContent = "Стоп";
    }

    else{
        stopStopWatch();
        startStopBtn.textContent = "Старт";
    }

    isRunning = !isRunning;
}

function resetTimer(){
    if(isStopwatchMode == true){
        stopStopWatch();
        minutes = 0;
        seconds = 0;
        milliseconds = 0;
        updateDisplay(); 
    }
else{
    stopStopWatch();
    timerSeconds.value = '00'
    timerMinutes.value = '00'
}

    isRunning = false;
    startStopBtn.textContent = "Старт";
}

function switchMode(isStopwatch){
    isStopwatchMode = isStopwatch;
    resetTimer();

    if(isStopwatch == true){
        stopWatchDisplay.classList.replace("invisible", "visible");
        timerDisplay.classList.replace("visible", "invisible");
        switchToStopwatchBtn.classList.add("active");
        switchToTimerBtn.classList.remove("active");
    }
    else{
        timerDisplay.classList.replace("invisible", "visible");
        stopWatchDisplay.classList.replace("visible", "invisible");
        switchToTimerBtn.classList.add("active");
        switchToStopwatchBtn.classList.remove("active");
    }
}

function formatInputValue(inputField){
    let value = parseInt(inputField.value) || 0;

    if(value > 59){
        value = 59;
    }
    if(value < 0){
        value = 0;
    }

    value = padNumber(value);
    inputField.value = value;
}

function startTimer(){
    let totalSeconds = parseInt(timerMinutes.value) * 60 + parseInt(timerSeconds.value);

    if(totalSeconds <= 0){
        return;
    }

    interval = setInterval(()=> {
        totalSeconds--;
        timerMinutes.value = padNumber(Math.floor(totalSeconds / 60));
        timerSeconds.value = padNumber(totalSeconds % 60);
    } ,1000);
}