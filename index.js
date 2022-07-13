"use strict"

const clockHandHour = document.querySelector(".clock-hand-hour");
const clockHandMinute = document.querySelector(".clock-hand-minute");
const clockHandSecond = document.querySelector(".clock-hand-second");

const date = new Date()
let seconds = date.getSeconds()
let minutes = date.getMinutes()
let hours = date.getHours()
let turnsSeconds = 0
let turnsMinutes = 0
let turnsHours = 0

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
        seconds = 0
        minutes += 1
        if (minutes === 60) {
            minutes = 0;
            hours += 1
            if (hours === 12) {
                hours = 0
            }
        }
    }
    if (seconds === 1) {
        turnsHours = updateHand(clockHandHour, 360 / 12 * hours + 360 / 12 / 60 * minutes, turnsHours)
        turnsMinutes = updateHand(clockHandMinute, 360 / 60 * minutes, turnsMinutes)
    }
    turnsSeconds = updateHand(clockHandSecond, 360 / 60 * seconds, turnsSeconds);
    seconds += 1
}

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