import React, { useRef, useState } from "react";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";
import "./styles.css";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJaC7W0W3ciMfgB9qugNTLJ4t9WN4NwB8",
  authDomain: "fetube-58d0f.firebaseapp.com",
  projectId: "fetube-58d0f",
  storageBucket: "fetube-58d0f.appspot.com",
  messagingSenderId: "814031039489",
  appId: "1:814031039489:web:07b35b8bf573e5acc9e400",
  measurementId: "G-6N4BTJZWGW",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const firestore = firebase.firestore();

const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

const pc = new RTCPeerConnection(servers);

const WebRTCDemo: React.FC = () => {
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const callInputRef = useRef<HTMLInputElement | null>(null);

  const [remoteStream] = useState(new MediaStream());
  const [callButtonDisabled, setCallButtonDisabled] = useState(true);
  const [answerButtonDisabled, setAnswerButtonDisabled] = useState(true);
  const [hangupButtonDisabled, setHangupButtonDisabled] = useState(true);

  const startWebcam = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    localStream.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
    });

    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = localStream;
    }
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream;
    }

    setCallButtonDisabled(false);
    setAnswerButtonDisabled(false);
  };

  const createCall = async () => {
    const callDoc = firestore.collection("calls").doc();
    const offerCandidates = callDoc.collection("offerCandidates");
    const answerCandidates = callDoc.collection("answerCandidates");

    if (callInputRef.current) {
      callInputRef.current.value = callDoc.id;
    }

    pc.onicecandidate = (event) => {
      event.candidate && offerCandidates.add(event.candidate.toJSON());
    };

    const offerDescription = await pc.createOffer();
    await pc.setLocalDescription(offerDescription);

    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };

    await callDoc.set({ offer });

    callDoc.onSnapshot((snapshot) => {
      const data = snapshot.data();
      if (data && !pc.currentRemoteDescription && data.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        pc.setRemoteDescription(answerDescription);
      }
    });

    answerCandidates.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.addIceCandidate(candidate);
        }
      });
    });

    setHangupButtonDisabled(false);
  };

  const answerCall = async () => {
    const callId = callInputRef.current!.value;
    const callDoc = firestore.collection("calls").doc(callId);
    const answerCandidates = callDoc.collection("answerCandidates");
    const offerCandidates = callDoc.collection("offerCandidates");

    pc.onicecandidate = (event) => {
      event.candidate && answerCandidates.add(event.candidate.toJSON());
    };

    const callData = (await callDoc.get()).data();
    if (callData) {
      const offerDescription = callData.offer;
      await pc.setRemoteDescription(
        new RTCSessionDescription(offerDescription)
      );

      const answerDescription = await pc.createAnswer();
      await pc.setLocalDescription(answerDescription);

      const answer = {
        type: answerDescription.type,
        sdp: answerDescription.sdp,
      };

      await callDoc.update({ answer });

      offerCandidates.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const data = change.doc.data();
            pc.addIceCandidate(new RTCIceCandidate(data));
          }
        });
      });
    }
  };

  return (
    <div>
      <div className="controllers">
        {/* <h2>1. Start your Webcam</h2> */}
        <button onClick={startWebcam}>Start webcam</button>

        {/* <h2>2. Create a new Call</h2> */}
        <button onClick={createCall} disabled={callButtonDisabled}>
          Create Call (offer)
        </button>

        {/* <h2>3. Join a Call</h2> */}
        {/* <p>Answer the call from a different browser window or device</p> */}
        <span>
          <input ref={callInputRef} placeholder="Join a Call" />
          <button onClick={answerCall} disabled={answerButtonDisabled}>
            Answer
          </button>
        </span>

        <button disabled={hangupButtonDisabled}>Hangup</button>
      </div>
      <div className="videos">
        <span>
          <h3>Local Stream</h3>
          <video ref={localVideoRef} autoPlay playsInline></video>
        </span>
        <span>
          <h3>Remote Stream</h3>
          <video ref={remoteVideoRef} autoPlay playsInline></video>
        </span>
      </div>
    </div>
  );
};

export default WebRTCDemo;
