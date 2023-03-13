import sleep from "./sleep";

const audioCtx = new window.AudioContext();
const BASE_FREQUENCY = 250;
const wave = audioCtx.createPeriodicWave([0, 1, 1], [2, 0, 1]);

export default async function createAudio({ duration = 200, coinSize = 1 }) {
  const frequency =
    (BASE_FREQUENCY * Math.pow(3, 1 / 4)) / Math.pow(coinSize, 1 / 4);
  const oscillator = audioCtx.createOscillator();
  oscillator.setPeriodicWave(wave);
  oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime); // value in hertz
  oscillator.connect(audioCtx.destination);
  oscillator.start();
  await sleep(duration);
  oscillator.stop();
}
