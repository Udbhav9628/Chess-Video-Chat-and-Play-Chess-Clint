import { useState, createContext, useEffect, useRef } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext({});

const socket = io("http://192.168.240.232:8080");

const ContextProvider = ({ children }: { children: any }) => {

  const [Streams, setStreams] = useState<MediaStream>();
  const [Me, setMe] = useState();
  const [name, setname] = useState("");
  const [call, setcall] = useState({ isRecivingCall: false, from: "", name: "", signal: "", });
  const [callAccepted, setcallAccepted] = useState(false);
  const [callEnded, setcallEnded] = useState(false);

  const Video: any = useRef("");
  const userVideo: any = useRef("");
  const currentPeerConn: any = useRef("");

  useEffect(() => {

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStreams(currentStream);
        Video.current.srcObject = currentStream;
      });

    socket.on("me", (id) => setMe(id));

    socket.on("callUser", ({ from, name: callerName, signal }) => {
      setcall({ isRecivingCall: true, from, name: callerName, signal });
    });

  }, []);

  const AnswerCall = () => {
    setcallAccepted(true);
    const peer = new Peer({ initiator: false, trickle: false, stream: Streams });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStram) => {
      userVideo.current.srcObject = currentStram;
    });

    peer.signal(call.signal);

    currentPeerConn.current = peer;
  };

  const CallUser = (id: string) => {
    const peer = new Peer({ initiator: true, trickle: false, stream: Streams });

    peer.on("signal", (data) => {
      socket.emit("callUser", { userTocall: id, signalData: data, from: Me, name });
    });

    peer.on("stream", (currentStram) => {
      userVideo.current.srcObject = currentStram;
    });

    socket.on("callAccepted", (signal) => {
      setcallAccepted(true);
      peer.signal(signal);
    });

    currentPeerConn.current = peer;
  };

  const LeaveCall = () => {
    setcallEnded(true);
    currentPeerConn.current.destroy();
    window.location.reload();
  };

  return (<SocketContext.Provider value={{
    Streams, Me, name, setname, call, callAccepted, callEnded, Video, userVideo, currentPeerConn, AnswerCall, CallUser, LeaveCall
  }}>
    {children}
  </SocketContext.Provider>);
};

export { ContextProvider, SocketContext };
