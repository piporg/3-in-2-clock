"use strict"

const clockHandHour = document.querySelector(".clock-hand-hour");
const clockHandMinute = document.querySelector(".clock-hand-minute");
const clockHandSecond = document.querySelector(".clock-hand-second");

const startDate = new Date(2022, 6, 15, 7, 15) // the real time we're waking up on the first day (note that January is 0, not 1)
const fakeStartDate = new Date(2022, 6, 15, 7, 45) // the time we pretend to wake up on the first day (note that January is 0, not 1)
const endDate = new Date(2022, 6, 16, 22, 0) // the real time we end the last day (note that January is 0, not 1)
const fakeEndDate = new Date(2022, 6, 16, 22, 0) // the time we pretend to end the last day (note that January is 0, not 1)
const fakeDays = 1 // days we add (if we put 3 days in 2 actual ones, we add 1 day)

const rate = (endDate.getTime() - startDate.getTime()) / ((fakeEndDate.getTime() - fakeStartDate.getTime()) + fakeDays * 24 * 60 * 60 * 1000)
let seconds = 0
let minutes = 0
let hours = 0
let angleSeconds = 0
let angleMinutes = 0
let angleHours = 0
let tickSpeed = null;
let timer = null;

function updateTime() {
    const date = new Date()
    if (startDate.getTime() < date.getTime() && date.getTime() < endDate.getTime()) {
        if (tickSpeed != rate * 1000) {
            if (tickSpeed) {
                stopTimer()
                tickSpeed = rate * 1000
                startTimer()
            }
            else {
                tickSpeed = rate * 1000
            }
        }
        const delta = date.getTime() - startDate.getTime()
        const fakeTime = fakeStartDate.getTime() + (delta / rate)
        const fakeDate = new Date(fakeTime)
        seconds = fakeDate.getSeconds()
        minutes = fakeDate.getMinutes()
        hours = fakeDate.getHours()
    } else {
        if (tickSpeed != 1000) {
            if (tickSpeed) {
                stopTimer()
                tickSpeed = 1000
                startTimer()
            }
            else {
                tickSpeed = 1000
            }
        }
        seconds = date.getSeconds()
        minutes = date.getMinutes()
        hours = date.getHours()
    }
    if (!timer) {
        setHandPositions()
        startTimer()
    }
}

function updateHand(hand, tickNo, tickCnt, angleTotal) {
    const turns = Math.floor((angleTotal + 360 / tickCnt) / 360)
    const newAngle = (turns * 360) + (tickNo * 360 / tickCnt)
    hand.style.transform = "translate(-50%, -50%) rotate(" + newAngle + "deg)";
    return newAngle
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
    seconds += 1
    if (seconds === 60) {
        seconds = 0
    }
    else if (seconds === 1) {
        updateTime()
        angleHours = updateHand(clockHandHour, 60 * hours + minutes, 12 * 60, angleHours)
        angleMinutes = updateHand(clockHandMinute, minutes, 60, angleMinutes)
    }
    angleSeconds = updateHand(clockHandSecond, seconds, 60, angleSeconds);
}

function stopTimer() {
    if (timer) {
        clearInterval(timer)
        timer = null
    }
}

function startTimer() {
    timer = setInterval(() => {
        tick()
    }, tickSpeed)
}

function setHandPositions() {
    setTransition(false);
    angleHours = updateHand(clockHandHour, 60 * hours + minutes, 12 * 60, angleHours)
    angleMinutes = updateHand(clockHandMinute, minutes, 60, angleMinutes)
    angleSeconds = updateHand(clockHandSecond, seconds, 60, angleSeconds);
    setTimeout(() => {
        setTransition(true);
    }, 10);
}

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopTimer()
    } else {
        updateTime()
    }
})

updateTime()
