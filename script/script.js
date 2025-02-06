let digitalClockInterval;
let stopwatchInterval;

let hours = 0;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let running = false;

const months = ['JAN', 'FEV', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

function updateClock() {
    const now = new Date();
    const hoursUTC = String(now.getUTCHours()).padStart(2, '0');
    const minutesUTC = String(now.getUTCMinutes()).padStart(2, '0');
    const secondsUTC = String(now.getUTCSeconds()).padStart(2, '0');

    document.getElementById('hours').textContent = `${hoursUTC}:${minutesUTC}:${secondsUTC} UTC`;
}

function listMonth() {
    const monthIndex = new Date().getMonth();
    document.querySelector('.month').textContent = months[monthIndex];
}

function getYear() {
    const year = new Date().getFullYear();
    document.querySelector('.year').textContent = year;
}

function showDigitalClock() {
    clearInterval(stopwatchInterval);

    document.getElementById('startStopBtn').style.display = 'none';
    
    listMonth();
    getYear();
    
    updateClock();
    if (digitalClockInterval) {
        clearInterval(digitalClockInterval);
    }
    digitalClockInterval = setInterval(updateClock, 1000);
}

function showStopwatch() {
    clearInterval(digitalClockInterval);

    document.getElementById('startStopBtn').style.display = 'block';
    document.getElementById('startStopBtn').textContent = 'Start';

    document.getElementById('hours').textContent = '00:00:00:00';
    hours = 0;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
}

function startStopwatch() {
    if (!running) {
        stopwatchInterval = setInterval(updateStopwatchTime, 10); 
        document.getElementById('startStopBtn').textContent = 'Stop';
        running = true;
    } else {
        clearInterval(stopwatchInterval);
        document.getElementById('startStopBtn').textContent = 'Start'; 
        running = false;
    }
}

function updateStopwatchTime() {
    milliseconds++; 

    if (milliseconds === 100) { 
        milliseconds = 0;
        seconds++;
    }

    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }

    if (minutes === 60) { 
        minutes = 0;
        hours++;
    }

    document.getElementById('hours').textContent = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}:${padZeroMilliseconds(milliseconds)}`;
}

function padZero(num) {
    return num < 10 ? `0${num}` : num;
}

function padZeroMilliseconds(num) {
    return num < 10 ? `0${num}` : num;
}

document.addEventListener('DOMContentLoaded', function() {
    showDigitalClock();
});