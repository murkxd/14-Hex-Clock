let hexClockInterval;
let timerInterval;

function updateHexClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const hexColor = `#${hours}${minutes}${seconds}`;

    document.body.style.backgroundColor = hexColor;
    document.getElementById('hex-clock').textContent = hexColor;
}

function startTimer() {
    const timerInput = document.getElementById('timer-input').value;
    if (timerInput && !isNaN(timerInput) && timerInput > 0) {
        const endTime = new Date().getTime() + timerInput * 1000;

        timerInterval = setInterval(function () {
            const now = new Date().getTime();
            const remainingTime = Math.floor((endTime - now) / 1000);

            if (remainingTime >= 0) {
                const hours = Math.floor(remainingTime / 3600).toString().padStart(2, '0');
                const minutes = Math.floor((remainingTime % 3600) / 60).toString().padStart(2, '0');
                const seconds = (remainingTime % 60).toString().padStart(2, '0');

                const hexColor = `#${hours}${minutes}${seconds}`;
                document.body.style.backgroundColor = hexColor;
                document.getElementById('hex-clock').textContent = hexColor;
            } else {
                clearInterval(timerInterval);
                document.getElementById('timer-input-container').style.display = 'none';
                resetHexClock();
            }
        }, 1000);
    }
}

function resetHexClock() {
    clearInterval(hexClockInterval);
    hexClockInterval = setInterval(updateHexClock, 1000);
}

function showTimerInput() {
    clearInterval(hexClockInterval);
    document.getElementById('timer-input-container').style.display = 'flex';
}

function cancelTimer() {
    clearInterval(timerInterval);
    document.getElementById('timer-input-container').style.display = 'none';
    resetHexClock();
}

updateHexClock();