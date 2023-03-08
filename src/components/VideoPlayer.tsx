import { Grid, Typography, Paper, makeStyles } from "@material-ui/core";

function VideoPlayer({ name, Video, call, userVideo, Streams, callEnded, callAccepted }: { name: string; Video: any; call: any; userVideo: any; Streams: any; callAccepted: Boolean; callEnded: Boolean }) {
    const classes = useStyles();
    return (
        <Grid container className={classes.gridContainer}>
            {/* our Video */}
            {Streams && (<Paper className={classes.paper}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" gutterBottom>{name || "Name"}</Typography>
                    <video playsInline muted autoPlay className={classes.video} ref={Video} />
                </Grid>
            </Paper>)}
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
        width: '550px',
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