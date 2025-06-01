const output = document.querySelector('.timeline');

const time = [0, 0, 0];


let init = null;

function timer() {
    time[2] += 1;
    if (time[2] >= 60) {
        time[2] = 0;
        time[1] += 1;
    }
    if (time[1] >= 60) {
        time[1] = 0;
        time[0] += 1;
    }
    
    output.textContent = `${time[0].toString().padStart(2, '0')}:${time[1].toString().padStart(2, '0')}:${time[2].toString().padStart(2, '0')}`;
    
    init = setTimeout(timer, 1000);
}

const startTimer = document.querySelector('#startButton');
startTimer.addEventListener('click', () => {
    time[0] = 0;
    time[1] = 0;
    time[2] = 0;
    output.textContent = '00:00:00';
    setTimeout(() => {
        timer();
    }, 2000);
    output.classList.add('active');
});

const stopTimer = document.querySelector('#stopButton');
stopTimer.addEventListener('click', () => {
    time[0] = 0;
    time[1] = 0;
    time[2] = 0;
    clearTimeout(init);
    output.textContent = '00:00:00';
    output.classList.remove('active');
});

window.electronAPI?.onStart?.(() => {
  startTimer.click();
});

window.electronAPI?.onStop?.(() => {
  stopTimer.click();
});
