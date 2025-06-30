
import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import Peer from 'simple-peer';

const socket = io('http://localhost:5000');

function App() {
  const [myStream, setMyStream] = useState(null);
  const myVideo = useRef();
  const friendVideo = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        setMyStream(stream);
        myVideo.current.srcObject = stream;
      });

    socket.on('matched', ({ peerId }) => {
      const peer = new Peer({ initiator: true, trickle: false, stream: myStream });
      peer.on('signal', data => {
        socket.emit('signal', { room: peerId, signal: data });
      });
      peer.on('stream', remoteStream => {
        friendVideo.current.srcObject = remoteStream;
      });

      socket.on('signal', data => peer.signal(data.signal));
    });
  }, [myStream]);

  const start = () => {
    const peerId = Math.random().toString(36).slice(2);
    socket.emit('join', { gender: 'any', peerId });
  };

  return (
    <div>
      <h1>Omegle Clone 🚀</h1>
      <video ref={myVideo} autoPlay muted style={{ width: 300 }} />
      <video ref={friendVideo} autoPlay style={{ width: 300 }} />
      <button onClick={start}>Start Chat</button>
    </div>
  );
}

export default App;
