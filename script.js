
let localStream;
const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');

async function startCall() {
  try {
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideo.srcObject = localStream;

    // Demo purpose only (no real signaling/remote stream)
    alert("This is a UI demo. For real video chat, backend signaling server is needed.");
  } catch (err) {
    console.error("Error accessing camera:", err);
  }
}
