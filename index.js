"use strict"

const clockHandHour = document.querySelector(".clock-hand-hour");
const clockHandMinute = document.querySelector(".clock-hand-minute");
const clockHandSecond = document.querySelector(".clock-hand-second");

let rotationSecond = 0
let rotationMinute = 0
let rotationHour = 0
let secondCount = 0
setInterval(() => {
    if (secondCount === 60) {
        secondCount = 0
        rotationMinute += 360 / 60
        clockHandMinute.setAttribute("style", "transform: translate(-50%, -50%) rotate(" + rotationMinute + "deg)");
        rotationHour += 360 / 12 / 60
        clockHandHour.setAttribute("style", "transform: translate(-50%, -50%) rotate(" + rotationHour + "deg)");
    }
    rotationSecond += 360 / 60
    clockHandSecond.setAttribute("style", "transform: translate(-50%, -50%) rotate(" + rotationSecond + "deg)");
    secondCount += 1
}, 1000 * 155 / 249 );