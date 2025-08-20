const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photo = document.getElementById('photo');
const captureBtn = document.getElementById('captureBtn');
const downloadBtn = document.getElementById('downloadBtn');
const switchBtn = document.getElementById('switchBtn');

let currentStream;
let usingFrontCamera = true;

async function startCamera() {
  if (currentStream) {
    currentStream.getTracks().forEach(track => track.stop());
  }

  const constraints = {
    video: {
      facingMode: usingFrontCamera ? "user" : "environment"
    }
  };

  try {
    currentStream = await navigator.mediaDevices.getUserMedia(constraints);
    video.srcObject = currentStream;
  } catch (err) {
    alert('Error accessing camera: ' + err);
  }
}

captureBtn.addEventListener('click', () => {
  const context = canvas.getContext('2d');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  const dataUrl = canvas.toDataURL('image/png');
  photo.src = dataUrl;
  downloadBtn.removeAttribute('disabled');
  downloadBtn.setAttribute('href', dataUrl);
  downloadBtn.setAttribute('download', 'photo.png');
});

switchBtn.addEventListener('click', () => {
  usingFrontCamera = !usingFrontCamera;
  startCamera();
});

// Initialize camera on load
startCamera();
