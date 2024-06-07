let currentTime = document.querySelector("h1"),
sect = document.querySelector("section"),
select = document.querySelectorAll("select"),
setAlarmbtn = document.querySelector("button")

let alarmTime,
isAlarmSet = false
ringtone = new Audio("alarm-sound.mp3")

for (let i = 12; i > 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value ="${i}">${i}</option>`
    select[0].firstElementChild.insertAdjacentHTML("afterend", option)
}

for (let i = 59; i > 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value ="${i}">${i}</option>`
    select[1].firstElementChild.insertAdjacentHTML("afterend", option)
}

for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM"
    let option = `<option value ="${ampm}">${ampm}</option>`
    select[2].firstElementChild.insertAdjacentHTML("afterend", option)
}

setInterval(() => {
    let date = new Date()
    let h = date.getHours()
    let m = date.getMinutes()
    let s = date.getSeconds()
    let ampm = "AM"

    if (h >= 12) {
        h = h - 12
        ampm = "PM"
    }

    h = h == 0 ? h = 12 : h
    h = h < 10 ? "0" + h : h
    m = m < 10 ? "0" + m : m
    s = s < 10 ? "0" + s : s

    currentTime.innerText = `${h}:${m}:${s} ${ampm}`; 

    if (alarmTime == `${h}:${m} ${ampm}`) {
        ringtone.play()
        ringtone.loop = true
        console.log("Alarm ringing.....");
    }
}, 1000);

let setAlarm = () => {
    if (isAlarmSet) {
        alarmTime = ""
        ringtone.pause()
        sect.classList.remove("disable")
        setAlarmbtn.innerHTML = "Set alarm"
        return isAlarmSet = false
    }

    let time = `${select[0].value}:${select[1].value} ${select[2].value}`

    if (time.includes("Hour") || time.includes("Hour") || time.includes("AM/PM")){
        return alert("Please, select a valid to set alarm")
    }
    isAlarmSet = true
    alarmTime = time
    sect.classList.add("disable")
    setAlarmbtn.innerHTML = "Clear Alarm"
}

setAlarmbtn.addEventListener("click", setAlarm)