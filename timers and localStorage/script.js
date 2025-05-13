const timer = document.querySelector('#time');;
const msg = document.querySelector('#message');
const startBtn = document.querySelector('#start');
const resetBtn = document.querySelector('#reset');

let defaultTime = 600;
let time = defaultTime;

let timerId;

let mins;
let secs;

const saveTime = () => {
    console.log(time, defaultTime)
    if (time !== defaultTime) {
        const timerData = {
            time: time,
            minutes: mins,
            seconds: secs
        };

        console.table(timerData)

        localStorage.setItem('timerData', JSON.stringify(timerData))
    };
};

const setTime = () => {
    if (localStorage.getItem('timerData')) {
        timerData = JSON.parse(localStorage.getItem('timerData'))
        console.table(timerData)

        if (time > 60) {
            time = timerData.time
            mins = timerData.minutes;
            secs = timerData.seconds

            if (secs === 0) {
                secs = '00';
            };

            timer.textContent = `${mins}: ${secs}`;
        } else {
            timer.textContent = `00: ${defaultTime}`;
        };
    } else {
        if (defaultTime > 59) {
            mins = Math.floor(defaultTime / 60);
            secs = defaultTime - mins * 60;

            if (secs === 0) {
                secs = '00';
            };

            timer.textContent = `${mins}: ${secs}`;
        } else {
            timer.textContent = `00: ${defaultTime}`;
        };
    };
};

const handleStartTimer = () => {
    startBtn.disabled = true;

    const id = setInterval(() => {
        if (mins) {
            time -= 1;
            secs -= 1;

            if (secs === 0 || secs < 0) {
                mins -= 1;
                secs = 59;
            };

            timer.textContent = `${mins}: ${secs}`;
        } else {
            time -= 1;
            timer.textContent = time;
        };

        if (time === 0) {
            clearInterval(timerId);

            msg.textContent = 'Your time is up!'
            startBtn.disabled = false;
        };
    }, 1000);

    timerId = id;
};

const handleResetTimer = () => {
    clearInterval(timerId);

    timer.textContent = defaultTime;

    startBtn.disabled = false;

    localStorage.removeItem('timerData');

    setTime();
};

startBtn.addEventListener('click', handleStartTimer);
resetBtn.addEventListener('click', handleResetTimer);

window.addEventListener('DOMContentLoaded', setTime);
window.addEventListener('beforeunload', saveTime);