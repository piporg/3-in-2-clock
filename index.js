"use strict"

const clockHandHour = document.querySelector(".clock-hand-hour");
const clockHandMinute = document.querySelector(".clock-hand-minute");
const clockHandSecond = document.querySelector(".clock-hand-second");

let seconds = 0
let minutes = 0
let hours = 0
let turnsSeconds = 0
let turnsMinutes = 0
let turnsHours = 0

function updateTime() {
    const date = new Date()
    seconds = date.getSeconds()
    minutes = date.getMinutes()
    hours = date.getHours()
}

function updateHand(hand, angle, turns) {
    if (angle === 0) {
        turns += 1
    }
    const newAngle = (turns * 360) + angle
    hand.style.transform = "translate(-50%, -50%) rotate(" + newAngle + "deg)";
    return turns
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

function tick() {
    if (seconds === 60) {
        updateTime()
    }
    if (seconds === 1) {
        turnsHours = updateHand(clockHandHour, 360 / 12 * hours + 360 / 12 / 60 * minutes, turnsHours)
        turnsMinutes = updateHand(clockHandMinute, 360 / 60 * minutes, turnsMinutes)
    }
    turnsSeconds = updateHand(clockHandSecond, 360 / 60 * seconds, turnsSeconds);
    seconds += 1
}

updateTime()
setTransition(false);
turnsHours = updateHand(clockHandHour, 360 / 12 * hours + 360 / 12 / 60 * minutes, turnsHours)
turnsMinutes = updateHand(clockHandMinute, 360 / 60 * minutes, turnsMinutes)
tick()
setTimeout(() => {
    setTransition(true);
}, 10);

setInterval(() => {
    tick()
}, 1000)// * 155 / 249);