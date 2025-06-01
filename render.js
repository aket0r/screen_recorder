const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const video = document.querySelector('video');



let recordedChunks = [];
let mediaRecorder;

async function startRecording() {


  const stream = await navigator.mediaDevices.getDisplayMedia({
    audio: true,
    video: {
      width: 1920,
      height: 1080,
      frameRate: 60
    }
  });


  video.srcObject = stream;
  video.play();

  recordedChunks = [];

  mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });

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
