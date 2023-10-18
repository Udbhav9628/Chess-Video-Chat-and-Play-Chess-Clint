import { Grid, Paper, makeStyles } from "@material-ui/core";
import { Chess } from "chess.js";
import Chessboard from "chessboardjsx";
import { useEffect, useRef, useState } from "react";

function VideoPlayer({ name, Webcam, call, userVideo, Streams, callEnded, callAccepted, sendChessMove, NewMove }: { name: string; Webcam: any; call: any; userVideo: any; Streams: any; callAccepted: Boolean; callEnded: Boolean; sendChessMove: Function; NewMove: any }) {
    const classes = useStyles();

    const [chess] = useState<any>(new Chess());

    const [fen, setFen] = useState(chess.fen());

    useEffect(() => {
        if (NewMove !== null) {
            const move = {
                from: NewMove.from,
                to: NewMove.to,
                promotion: "q",
            }
            try {
                if (chess.move(move)) {
                    setFen(chess.fen());
                }
            } catch (error) {
                alert("Invalid Move")
            }
        }
        // eslint-disable-next-line
    }, [NewMove])


    const handleMove = (move: object) => {
        try {
            if (chess.move(move)) {
                setFen(chess.fen());
                sendChessMove(move)
            }
        } catch (error) {
            alert("Invalid Move")
        }
    };
    const video = useRef(null)


    const handleVideoError = () => {
        alert('Error In Video')
    }

    return (
        <Grid container className={classes.gridContainer}>
            {/* our Video */}
            {Streams && (<Paper className={classes.paper}>
                <Grid>
                    <Webcam ref={video} width={200} height={200} />
                </Grid>
            </Paper>)}
            {/* Chess Board */}
            <Chessboard width={300} position={fen} onDrop={(move) => {
                handleMove({
                    from: move.sourceSquare,
                    to: move.targetSquare,
                    promotion: "q",
                })
            }}
            />
            {/* User Video */}
            <Paper className={classes.paper2}>
                <Grid>
                    {callAccepted && !callEnded ? (<video playsInline autoPlay className={classes.video} ref={userVideo} onError={handleVideoError} />) : (<div>
                        <h5>
                            Waithing For Opponent To Connect
                        </h5>
                    </div>)}
                </Grid>
            </Paper>
        </Grid>
    )
}

export default VideoPlayer;

const useStyles = makeStyles((theme) => ({
    video: {
        width: '200px',
        height: '180px',
        [theme.breakpoints.down('xs')]: {
            width: '150px',
            height: '150px',
        },
    },
    gridContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
        },
    },
    paper: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',
        border: '2px solid black',
        margin: '10px',
        width: '200px',
        height: '180px',
    },
    paper2: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',
        border: '2px solid black',
        margin: '10px',
        width: '200px',
        height: '180px',
        [theme.breakpoints.down('xs')]: {
            width: '150px',
            height: '150px',
        },
    },
}));