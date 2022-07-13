"use strict"

const clockHandHour = document.querySelector(".clock-hand-hour");
const clockHandMinute = document.querySelector(".clock-hand-minute");
const clockHandSecond = document.querySelector(".clock-hand-second");

const startDate = new Date(2022, 6, 13, 7, 15) // the real time we're waking up on the first day (note that January is 0, not 1)
const fakeStartDate = new Date(2022, 6, 13, 7, 45) // the time we pretend to wake up on the first day (note that January is 0, not 1)
const endDate = new Date(2022, 6, 14, 22, 0) // the real time we end the last day (note that January is 0, not 1)
const fakeEndDate = new Date(2022, 6, 14, 22, 0) // the time we pretend to end the last day (note that January is 0, not 1)
const fakeDays = 1 // days we add (if we put 3 days in 2 actual ones, we add 1 day)
const rate = (endDate.getTime() - startDate.getTime()) / ((fakeEndDate.getTime() - fakeStartDate.getTime()) + fakeDays * 24 * 60 * 60 * 1000)

let seconds = 0
let minutes = 0
let hours = 0
let turnsSeconds = 0
let turnsMinutes = 0
let turnsHours = 0
let tickSpeed = 1000

function updateTime() {
    const date = new Date()
    if (startDate < date && date < endDate) {
        tickSpeed = rate * 1000
        const delta = date.getTime() - startDate.getTime()
        const fakeTime = fakeStartDate.getTime() + (delta / rate)
        const fakeDate = new Date(fakeTime)
        seconds = fakeDate.getSeconds()
        minutes = fakeDate.getMinutes()
        hours = fakeDate.getHours()
    } else {
        seconds = date.getSeconds()
        minutes = date.getMinutes()
        hours = date.getHours()
        tickSpeed = 1000
    }
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
}, tickSpeed)