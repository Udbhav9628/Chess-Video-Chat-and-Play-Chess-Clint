import { Grid, Typography, Paper, makeStyles } from "@material-ui/core";
import { Chess } from "chess.js";
import Chessboard from "chessboardjsx";
import { useEffect, useState } from "react";

function VideoPlayer({ name, Video, call, userVideo, Streams, callEnded, callAccepted, sendChessMove, NewMove }: { name: string; Video: any; call: any; userVideo: any; Streams: any; callAccepted: Boolean; callEnded: Boolean; sendChessMove: Function; NewMove: any }) {
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

    return (
        <Grid container className={classes.gridContainer}>
            {/* our Video */}
            {Streams && (<Paper className={classes.paper}>
                <Grid item xs={2} md={1}>
                    <Typography variant="h5" gutterBottom>{name || "Name"}</Typography>
                    <video playsInline muted autoPlay className={classes.video} ref={Video} />
                </Grid>
            </Paper>)}
            {/* Chess Board */}
            <Chessboard width={600} position={fen} onDrop={(move) => {
                handleMove({
                    from: move.sourceSquare,
                    to: move.targetSquare,
                    promotion: "q",
                })
            }}
            />
            {/* User Video */}
            {callAccepted && !callEnded && (<Paper className={classes.paper}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" gutterBottom>{call.name || "User Video"}</Typography>
                    <video playsInline autoPlay className={classes.video} ref={userVideo} />
                </Grid>
            </Paper>)}
        </Grid>
    )
}

export default VideoPlayer;

const useStyles = makeStyles((theme) => ({
    video: {
        width: '700px',
        [theme.breakpoints.down('xs')]: {
            width: '300px',
        },
    },
    gridContainer: {
        justifyContent: 'center',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
        },
    },
    paper: {
        padding: '10px',
        border: '2px solid black',
        margin: '10px',
    },
}));