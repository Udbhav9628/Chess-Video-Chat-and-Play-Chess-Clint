import '../App.css';
import Peer from 'simple-peer';
import Options from './Options';
import Webcam from 'react-webcam';
import io from 'socket.io-client';
import VideoPlayer from './VideoPlayer';
import Notifications from './Notifications';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect, useRef, SetStateAction } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {
	Typography,
	AppBar,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	makeStyles,
} from '@material-ui/core';

const ChessPage = () => {
	const classes = useStyles();

	const [IdToCall, setIdToCall] = useState('');

	const [Streams, setStreams] = useState<MediaStream>();
	const [Me, setMe] = useState('');
	const [name, setname] = useState('');
	const [call, setcall] = useState({
		isRecivingCall: false,
		from: '',
		name: '',
		signalData: '',
	});
	const [callAccepted, setcallAccepted] = useState(false);
	const [callEnded, setcallEnded] = useState(false);
	const [NewMove, setNewMove] = useState(null);
	const [callingUser, setcallingUser] = useState(false);
	const [connectionError, setconnectionError] = useState(false);

	// const Video: any = useRef({});
	const userVideo: any = useRef('');
	const currentPeerConn: any = useRef(null);

	const [socket, setSocket] = useState<any>(null); // State to hold the socket instance

	useEffect(() => {
		const socketInstance = io('http://10.10.0.67:8000');
		setSocket(socketInstance);
		return () => {
			if (socketInstance) {
				socketInstance.disconnect();
			}
		};
	}, []);

	useEffect(() => {
		navigator.mediaDevices
			.getUserMedia({ video: true, audio: true })
			.then((currentStream) => {
				setStreams(currentStream);
			})
			.catch((error) => {
				toast.error('Unable to access webcam. Please check your settings.');
			});
	}, []);

	useEffect(() => {
		if (socket) {
			socket.on('connect_error', (error: any) => {
				console.error('Socket.IO connection error:', error);
				if (!connectionError) {
					setconnectionError(true);
				}
			});

			socket.on('me', (id: SetStateAction<string>) => {
				setMe(id);
			});

			socket.on(
				'callUser',
				({
					from,
					name: callerName,
					signalData,
				}: {
					from: any;
					name: any;
					callerName: any;
					signalData: any;
				}) => {
					setcall({ isRecivingCall: true, from, name: callerName, signalData });
				}
			);

			socket.on('chessMove', (moveObj: SetStateAction<null>) => {
				console.log('In Socket');
				console.log(moveObj);
				setNewMove(moveObj);
			});
		}
	}, [socket]);

	const CallUser = (id: string) => {
		setcallingUser(true);
		const peer = new Peer({ initiator: true, trickle: false, stream: Streams });

		peer.on('signal', (data) => {
			socket.emit('callUser', {
				userTocall: id,
				signalData: data,
				from: Me,
				name,
			});
			setTimeout(() => {
				if (callAccepted === false) {
					setcallingUser(false);
				}
			}, 40000);
		});

		socket.on('callAccepted', (signal: string | Peer.SignalData) => {
			setcallAccepted(true);
			setcallingUser(false);
			peer.signal(signal);
		});

		peer.on('stream', (currentStram) => {
			userVideo.current.srcObject = currentStram;
			// currentStram.getVideoTracks()[0].addEventListener('ended', () => {
			//     console.log('Video stream has ended.');
			//     // Handle the event here
			// });
		});

		currentPeerConn.current = peer;
	};

	useEffect(() => {
		if (currentPeerConn?.current) {
			currentPeerConn?.current?.on('close', () => {
				console.log('Peer connection has been closed');
			});
		}
	}, [currentPeerConn]);

	const AnswerCall = () => {
		setcallAccepted(true);
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream: Streams,
		});

		peer.on('signal', (data) => {
			socket.emit('answerCall', { signal: data, to: call.from });
		});

		peer.signal(call.signalData);

		peer.on('stream', (currentStram) => {
			userVideo.current.srcObject = currentStram;
		});

		currentPeerConn.current = peer;
	};

	const LeaveCall = () => {
		setcallEnded(true);
		currentPeerConn.current.destroy();
	};

	//Sending ChessMoves
	function sendChessMove(moveObj: Object) {
		const opponentPlayer = call.isRecivingCall ? call.from : IdToCall;
		console.log(opponentPlayer);
		socket.emit('chessMove', { moveObj, towhom: opponentPlayer });
	}

	return (
		<div className='Container'>
			<div className={classes.wrapper}>
				<AppBar className={classes.appBar} position='static' color='inherit'>
					<Typography variant='h3' align='center'>
						TeleChess
					</Typography>
				</AppBar>
				<VideoPlayer
					name={name}
					Webcam={Webcam}
					call={call}
					userVideo={userVideo}
					Streams={Streams}
					callAccepted={callAccepted}
					callEnded={callEnded}
					sendChessMove={sendChessMove}
					NewMove={NewMove}
				/>
				<Options
					Me={Me}
					callAccepted={callAccepted}
					name={name}
					setname={setname}
					LeaveCall={LeaveCall}
					callUser={CallUser}
					callEnded={callEnded}
					IdToCall={IdToCall}
					setIdToCall={setIdToCall}
					callingUser={callingUser}
				>
					<Notifications
						AnswerCall={AnswerCall}
						call={call}
						callAccepted={callAccepted}
					/>
				</Options>
			</div>
			<ToastContainer />
			<Dialog open={connectionError}>
				<DialogTitle>Error</DialogTitle>
				<DialogContent>
					<div>
						Sorry, we couldn't establish a connection to the server. Please
						check your internet connection or try again later.
					</div>
				</DialogContent>
				<DialogActions>
					<a href='/'>
						<Button onClick={() => console.log('hfffhf')}>OK</Button>
					</a>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default ChessPage;

const useStyles = makeStyles((theme) => ({
	appBar: {
		borderRadius: 15,
		margin: '30px 100px',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: '400px',
		border: '2px solid black',

		[theme.breakpoints.down('xs')]: {
			display: 'none',
		},
	},
	image: {
		marginLeft: '15px',
	},
	wrapper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
	},
}));
