import './App.css';
import { Typography, AppBar } from "@material-ui/core";
import VideoPlayer from './components/VideoPlayer';
import Options from './components/Options';
import Notifications from './components/Notifications';
import { makeStyles } from "@material-ui/core";
import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
const socket = io("http://13.127.223.172:8000");

const App = () => {
  //***********App*************/
  const classes = useStyles()

  const [IdToCall, setIdToCall] = useState('')

  const [Streams, setStreams] = useState<MediaStream>();
  const [Me, setMe] = useState();
  const [name, setname] = useState("");
  const [call, setcall] = useState({ isRecivingCall: false, from: "", name: "", signalData: "", });
  const [callAccepted, setcallAccepted] = useState(false);
  const [callEnded, setcallEnded] = useState(false);
  const [NewMove, setNewMove] = useState(null)

  const Video: any = useRef("");
  const userVideo: any = useRef("");
  const currentPeerConn: any = useRef("");

  useEffect(() => {
    console.log("Loging Call");
    console.log(call);
  }, [call])



  useEffect(() => {

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStreams(currentStream);
        Video.current.srcObject = currentStream;
      });

    socket.on("me", (id) => setMe(id));

    socket.on("callUser", ({ from, name: callerName, signalData }) => {
      setcall({ isRecivingCall: true, from, name: callerName, signalData });
    });

    socket.on('chessMove', (moveObj) => {
      console.log('In Socket');
      console.log(moveObj);
      setNewMove(moveObj);
    })

  }, []);

  const CallUser = (id: string) => {
    const peer = new Peer({ initiator: true, trickle: false, stream: Streams });

    peer.on("signal", (data) => {
      socket.emit("callUser", { userTocall: id, signalData: data, from: Me, name });
    });

    socket.on("callAccepted", (signal) => {
      setcallAccepted(true);
      peer.signal(signal);
    });

    peer.on("stream", (currentStram) => {
      userVideo.current.srcObject = currentStram;
    });

    currentPeerConn.current = peer;
  };

  const AnswerCall = () => {
    setcallAccepted(true);
    const peer = new Peer({ initiator: false, trickle: false, stream: Streams });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from });
    });

    peer.signal(call.signalData);

    peer.on("stream", (currentStram) => {
      userVideo.current.srcObject = currentStram;
    });

    currentPeerConn.current = peer;
  };

  const LeaveCall = () => {
    setcallEnded(true);
    currentPeerConn.current.destroy();
    window.location.reload();
  };

  //Sending ChessMoves
  function sendChessMove(moveObj: Object) {
    const opponentPlayer = call.isRecivingCall ? call.from : IdToCall;
    console.log(opponentPlayer);
    socket.emit("chessMove", { moveObj, towhom: opponentPlayer })
  }

  return (
    <div className={classes.wrapper}>
      <AppBar className={classes.appBar} position='static' color='inherit'>
        <Typography variant='h3' align='center'>
          Chess
        </Typography>
      </AppBar>
      <VideoPlayer name={name} Video={Video} call={call} userVideo={userVideo} Streams={Streams} callAccepted={callAccepted} callEnded={callEnded} sendChessMove={sendChessMove} NewMove={NewMove} />
      <Options Me={Me} callAccepted={callAccepted} name={name} setname={setname} LeaveCall={LeaveCall} callUser={CallUser} callEnded={callEnded} IdToCall={IdToCall} setIdToCall={setIdToCall}>
        <Notifications AnswerCall={AnswerCall} call={call} callAccepted={callAccepted} />
      </Options>
    </div>
  )
}

export default App;

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 100px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '600px',
    border: '2px solid black',

    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  image: {
    marginLeft: '15px',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
}))