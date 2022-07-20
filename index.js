"use strict"

const clockHandHour = document.querySelector(".clock-hand-hour");
const clockHandMinute = document.querySelector(".clock-hand-minute");
const clockHandSecond = document.querySelector(".clock-hand-second");

const startDate = new Date(2022, 7, 1, 7, 15) // the real time we're waking up on the first day (note that January is 0, not 1)
const fakeStartDate = new Date(2022, 7, 1, 7, 45) // the time we pretend to wake up on the first day (note that January is 0, not 1)
const endDate = new Date(2022, 7, 2, 22, 0) // the real time we end the last day (note that January is 0, not 1)
const fakeEndDate = new Date(2022, 7, 2, 22, 0) // the time we pretend to end the last day (note that January is 0, not 1)
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
        const delta = date.getTime() - startDate.getTime()
        const fakeTime = fakeStartDate.getTime() + (delta / rate)
        const fakeDate = new Date(fakeTime)
        seconds = fakeDate.getSeconds()
        minutes = fakeDate.getMinutes()
        hours = fakeDate.getHours() % 12
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
    } else {
        seconds = date.getSeconds()
        minutes = date.getMinutes()
        hours = date.getHours() % 12
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
    }
    if (!timer) {
        setHandPositions()
        startTimer()
    }
}

function updateHand(hand, angle360, currentAngle) {
    const turns = Math.floor(currentAngle / 360)
    let newAngle = turns * 360 + angle360
    while (newAngle < currentAngle) {
        newAngle += 360
    }
    hand.style.transform = "translate(-50%, -50%) rotate(" + newAngle + "deg)";
    return newAngle
}

function updateSecondHand() {
    angleSeconds = updateHand(clockHandSecond, 360 / 60 * seconds, angleSeconds);
}

function updateMinuteHand() {
    angleMinutes = updateHand(clockHandMinute, 360 / 60 * minutes, angleMinutes)
}

function updateHourHand() {
    angleHours = updateHand(clockHandHour, (360 / 12 * hours) + (360 / 12 / 60) * minutes, angleHours)
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
        updateHourHand()
        updateMinuteHand()
    }
    updateSecondHand()
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
    updateHourHand()
    updateMinuteHand()
    updateSecondHand()
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
