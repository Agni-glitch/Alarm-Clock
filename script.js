let audio = new Audio("music.mp3");
function play() {
  audio.play();
}
function pause() {
  audio.pause();
}

setInterval(function () {
  const d = new Date();
  let hour = d.getHours();
  let min = d.getMinutes();
  let sec = d.getSeconds();
  let month = d.getMonth() + 1; // Fix month display
  let day = d.getUTCDate();
  let year = d.getFullYear();
  document.getElementsByClassName(
    "date"
  )[0].innerHTML = `Date: ${day}/${month}/${year}`;
  document.getElementById("hour").innerHTML = hour;
  document.getElementById("min").innerHTML = min;
  document.getElementById("sec").innerHTML = sec;
}, 1000);

function timeOut(alarmTime) {
  const now = new Date();
  let currentMinutes = now.getHours() * 60 + now.getMinutes();
  let alarmMinutes =
    Number.parseInt(alarmTime.slice(0, 2)) * 60 +
    Number.parseInt(alarmTime.slice(3, 5));

  let diffMinutes =
    alarmMinutes > currentMinutes
      ? alarmMinutes - currentMinutes
      : 24 * 60 + alarmMinutes - currentMinutes;

  setTimeout(() => {
    play();
  }, diffMinutes * 60000);
}

const submit = document.getElementById("submit");
const time = document.getElementById("alarm");

function isValueInLocalStorage(value) {
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.getItem(localStorage.key(i)) === value) {
      return true;
    }
  }
  return false;
}

function createAlarmElement(alarmTime, key) {
  const div = document.createElement("div");
  const deleteAlrm = document.createElement("button");
  const textNode = document.createTextNode("clear");
  deleteAlrm.append(textNode);
  deleteAlrm.onclick = () => {
    localStorage.removeItem(key);
    div.remove();
  };

  div.append(alarmTime);
  div.append(deleteAlrm);
  document.getElementsByClassName("alarm")[0].append(div);
}

for (let i = 0; i < localStorage.length; i++) {
  const alarmTime = localStorage.getItem(localStorage.key(i));
  createAlarmElement(alarmTime, localStorage.key(i));
  timeOut(alarmTime);
}

submit.addEventListener("click", () => {
  if (!isValueInLocalStorage(time.value)) {
    localStorage.setItem(localStorage.length, time.value);
    createAlarmElement(time.value, localStorage.length - 1);
    timeOut(time.value);
  }
  time.value = "00:00";
});

document.getElementById("clearAll").addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});
