// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

const startBtn = document.querySelector("[data-start]");
    const dateTimePicker = document.querySelector("#datetime-picker");
    const daysValue = document.querySelector("[data-days]");
    const hoursValue = document.querySelector("[data-hours]");
    const minutesValue = document.querySelector("[data-minutes]");
    const secondsValue = document.querySelector("[data-seconds]");

    let intervalID;
    let userSelectedDate;

    const options = {
      enableTime: true,
      time_24hr: true,
      defaultDate: new Date(),
      minuteIncrement: 1,
      onClose(selectedDates) {
        userSelectedDate = selectedDates[0];
        if (userSelectedDate < new Date()) {
          window.alert("Please choose a date in the future");
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
function updateTimerDisplay({ days, hours, minutes, seconds }) {
    const timeLeft = convertMs(userSelectedDate);
    daysValue.textContent = timeLeft.days.toString().padStart(2, '0');
    hoursValue.textContent = timeLeft.hours.toString().padStart(2, '0');
    minutesValue.textContent = timeLeft.minutes.toString().padStart(2, '0');
    secondsValue.textContent = timeLeft.seconds.toString().padStart(2, '0');

}