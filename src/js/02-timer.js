import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
startBtn.addEventListener('click', runCountdown);
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      return Notify.failure(`Please choose a date in the future`);
    }
    startBtn.disabled = false;
  },
};

flatpickr(input, options);

function runCountdown() {
  input.disabled = true;
  startBtn.disabled = true;
  let chosenDate = input._flatpickr.selectedDates[0];
  let currentDate = new Date();
  let countdownDate = chosenDate - currentDate;
  const timerId = setInterval(() => {
    console.log('setInterval');
    currentDate = new Date();
    countdownDate = chosenDate - currentDate;
    const { days, hours, minutes, seconds } = convertMs(countdownDate);
    dataDays.textContent = days < 10 ? `0${days}` : days;
    dataHours.textContent = hours < 10 ? `0${hours}` : hours;
    dataMinutes.textContent = minutes < 10 ? `0${minutes}` : minutes;
    dataSeconds.textContent = seconds < 10 ? `0${seconds}` : seconds;
  }, 1000);
  setTimeout(() => {
    console.log('setTimeout');
    input.disabled = false;
    clearInterval(timerId);
  }, countdownDate);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
