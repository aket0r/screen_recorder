const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const video = document.querySelector('video');



let recordedChunks = [];
let mediaRecorder;



async function startRecording() {
  const stream = await navigator.mediaDevices.getDisplayMedia({
    video: {
      width: 1920,
      height: 1080,
      frameRate: 120
    },
    audio: {
      deviceId: 'default',
      autoGainControl: false,
      echoCancellation: false,
      noiseSuppression: false,
      sampleRate: 48000,
      sampleSize: 16,
      channelCount: 2,
      volume: 1.0
    }
  });


  video.srcObject = stream;
  video.play();

  recordedChunks = [];

  mediaRecorder = new MediaRecorder(stream, 
    { 
      mimeType: 'video/webm;codecs=vp9,opus', 
      audioBitsPerSecond: 320000, 
      videoBitsPerSecond: 4000000 
    });

  mediaRecorder.ondataavailable = (e) => {
    if (e.data.size > 0) {
      recordedChunks.push(e.data);
    }
  };

  mediaRecorder.onstop = async () => {
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const arrayBuffer = await blob.arrayBuffer();
    window.electronAPI.saveVideo(arrayBuffer);
  };

  mediaRecorder.start();
}

startButton.addEventListener('click', startRecording);
stopButton.addEventListener('click', () => {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
    video.pause();
  }
});

window.electronAPI.onStart(() => {
  console.log('[IPC] start-recording received');
  startRecording();
});

window.electronAPI.onStop(() => {
  console.log('[IPC] stop-recording received');
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
    video.pause();
  }
});