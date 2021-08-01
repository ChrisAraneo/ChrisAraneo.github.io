const button = document.getElementById("play");

window.AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

button.addEventListener("click", () => {
    const start = Number(document.getElementById("input").value);
    const array = [];
    let x = start;
    while(x != 1) {
        array.push(x);
        if(x % 2 == 0) {
            x = x / 2;
        } else {
            x = 3 * x + 1;
        }
    }
    console.log(array);

    let index = 0;
    setInterval(() => {
        sine(array[index]);
        index++;
    }, 600);
});

function sine(frequency) {
    var osc = audioContext.createOscillator();
    var gainOsc = audioContext.createGain();
    osc.type = "sine";
    gainOsc.gain.setValueAtTime(1, audioContext.currentTime);
    gainOsc.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);
    osc.frequency.setValueAtTime(40 + frequency, audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);
    osc.connect(gainOsc);
    gainOsc.connect(audioContext.destination);
    osc.start(audioContext.currentTime);
    osc.stop(audioContext.currentTime + 0.5);
};