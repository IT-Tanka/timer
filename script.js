
const timerInputs = document.querySelectorAll('.timer__input');
const timerStr = document.querySelector('.timer__str');
const startBtn = document.querySelector('#start');
const resetBtn = document.querySelector('#reset');
const stopBtn = document.querySelector('#stop');
let myTimer = { hour: 0, minute: 0, second: 0 };

const toggleDisableOfInputs = function (disable) {
  timerInputs.forEach((input) => {
    input.disabled = disable;
  });
};

const getTimerDataFromInputs = function () {
  myTimer = { hour: +timerInputs[0].value, minute: +timerInputs[1].value, second: +timerInputs[2].value };
};

const putTimerData = function () {
  timerStr.textContent = `${myTimer.hour.toString().padStart(2, 0)}:${myTimer.minute.toString().padStart(2, 0)}:${myTimer.second.toString().padStart(2, 0)}`;
};

const timerTick = function () {
  if (myTimer.second <= 58) myTimer.second = myTimer.second + 1;
  else {
    myTimer.second = 0;
    if (myTimer.minute <= 58) myTimer.minute = myTimer.minute + 1;

    else if (myTimer.hour < 24) {
      if (myTimer.minute === 59) myTimer.minute = 0;
      myTimer.hour = myTimer.hour + 1;
      if (myTimer.hour === 24) resetTimer();
    } else resetTimer();
  }
  putTimerData();
};

const stopTimer = function () {
  timerInputs[0].value = myTimer.hour.toString();
  timerInputs[1].value = myTimer.minute.toString();
  timerInputs[2].value = myTimer.second.toString();
  toggleDisableOfInputs(false);
};

const resetTimer = function () {
  myTimer = { hour: 0, minute: 0, second: 0 };
  timerInputs.forEach((input) => input.value = '');
};

const checkInputValue = function (input, index) {
  if (index === 0) {
    if (input.value >= 23) input.value = 23;
    if (input.value <= 0) input.value = 0;

  } else {
    if (input.value >= 59) input.value = 59;
    if (input.value <= 0) input.value = 0;
  }
};

resetTimer();
putTimerData();
toggleDisableOfInputs(true);

timerInputs.forEach((timer_input, index) =>
  timer_input.addEventListener('change', () => {
    checkInputValue(timer_input, index);
  }));

resetBtn.addEventListener('click', () => {
  toggleDisableOfInputs(true);
  resetTimer();
  putTimerData();
});

stopBtn.addEventListener('click', () => {
  startBtn.disabled=false;
  clearInterval(nIntervId);
  nIntervId = null; 
  stopTimer();
});

startBtn.addEventListener('click', () => {
  toggleDisableOfInputs(true);
  getTimerDataFromInputs();
  putTimerData();
  nIntervId = setInterval(timerTick, 1000);
  startBtn.disabled=true;
});





