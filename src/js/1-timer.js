
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import iconLink from '../img/alert-icon.svg';

const startBtn = document.querySelector("[data-start]");
    const dateTimePicker = document.querySelector("#datetime-picker");
    const daysValue = document.querySelector("[data-days]");
    const hoursValue = document.querySelector("[data-hours]");
    const minutesValue = document.querySelector("[data-minutes]");
    const secondsValue = document.querySelector("[data-seconds]");

    let intervalID;
let userSelectedDate;
startBtn.disabled = true;
    const options = {
      enableTime: true,
      time_24hr: true,
      defaultDate: new Date(),
      minuteIncrement: 1,
      onClose(selectedDates) {
        userSelectedDate = selectedDates[0];
        if (userSelectedDate < new Date()) {
          iziToast.error({
              message: 'Please choose a date in the future',
              messageSize: '16px',
              messageColor: '#fff',
              backgroundColor: '#ef4040',
              position: "topRight",
              close: true,
              iconUrl: iconLink,
              iconColor: '#FAFAFB',


});
          startBtn.disabled = true;
        } else {
          startBtn.disabled = false;
        }
      },
    };

    flatpickr(dateTimePicker, options);

    startBtn.addEventListener('click', () => {
      if (intervalID) {
        clearInterval(intervalID);
      }

      intervalID = setInterval(() => {
        const currentTime = Date.now();
        const ms = userSelectedDate - currentTime;
        
        if (ms <= 0) {
          clearInterval(intervalID);
          startBtn.disabled = true;
          dateTimePicker.disabled = false;
          return;
        }

        const timeLeft = convertMs(ms);
        updateTimerDisplay(timeLeft);
      }, 1000);

      startBtn.disabled = true;
      dateTimePicker.disabled = true;
    });

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
    
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimerDisplay({ days, hours, minutes, seconds }) {
  daysValue.textContent = addLeadingZero(days);
  hoursValue.textContent = addLeadingZero(hours);
  minutesValue.textContent = addLeadingZero(minutes);
  secondsValue.textContent = addLeadingZero(seconds);
}
