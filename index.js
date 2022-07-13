"use strict"

const clockHandHour = document.querySelector(".clock-hand-hour");
const clockHandMinute = document.querySelector(".clock-hand-minute");
const clockHandSecond = document.querySelector(".clock-hand-second");

const date = new Date()
console.log(date.getTime());
console.log(date.getSeconds())
console.log(date.getMinutes())
console.log(date.getHours())

let rotationSecond = 0
let rotationMinute = 0
let rotationHour = 0
let seconds = date.getSeconds()
let minutes = date.getMinutes()
let hours = date.getHours()

function updateClockHM() {
    rotationMinute = 360 / 60 * minutes;
    clockHandMinute.style.transform = "translate(-50%, -50%) rotate(" + rotationMinute + "deg)"
    rotationHour = 360 / 12 * hours + 360 / 12 / 60 * minutes;
    clockHandHour.style.transform = "translate(-50%, -50%) rotate(" + rotationHour + "deg)"
}

function updateClockS() {
    rotationSecond = 360 / 60 * seconds
    clockHandSecond.style.transform = "translate(-50%, -50%) rotate(" + rotationSecond + "deg)";
}

function setTransition(flag) {
    if (flag === true) {
        clockHandSecond.style.transitionDuration = "600ms"
        clockHandMinute.style.transitionDuration = "600ms"
        clockHandHour.style.transitionDuration = "600ms"
    }
    else {
        clockHandSecond.style.transitionDuration = "0ms"
        clockHandMinute.style.transitionDuration = "0ms"
        clockHandHour.style.transitionDuration = "0ms"
    }
}

setTransition(false);
updateClockHM();
updateClockS();
setTimeout(() => {
    setTransition(true);
}, 10);

setInterval(() => {
    if (seconds === 60) {
        seconds = 0
        minutes += 1
        if (minutes === 60) {
            minutes = 0;
        }
        updateClockHM();
    }
    seconds += 1
    updateClockS();
}, 1000)// * 155 / 249);