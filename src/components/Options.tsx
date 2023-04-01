import { Button, TextField, Typography, Grid, Container, Paper, makeStyles } from "@material-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Assignment, Phone, PhoneDisabled } from "@material-ui/icons";

const Options = ({ children, Me, callAccepted, name, setname, LeaveCall, callUser, callEnded, IdToCall, setIdToCall }: { children: JSX.Element; Me: any; callAccepted: Boolean; name: String, setname: Function; LeaveCall: any; callUser: any; callEnded: any; IdToCall: string; setIdToCall: Function }) => {
    const classes = useStyles();
    return (
        <Container className={classes.container}>
            <Paper elevation={10} className={classes.paper}>
                <form className={classes.root} noValidate autoComplete='off'>
                    <Grid container className={classes.gridContainer}>
                        <Grid item xs={12} md={6} className={classes.padding}>
                            <Typography gutterBottom variant='h6'>
                                Account Info
                            </Typography>
                            <TextField className={classes.margin} fullWidth label='Name' value={name} onChange={(e) => { setname(e.target.value) }} />
                            <CopyToClipboard text={Me}>
                                <Button className={classes.margin} variant='contained' color='primary' fullWidth startIcon={<Assignment fontSize='large' />}>Copy Your Id</Button>
                            </CopyToClipboard>
                        </Grid>
                        {/* ******************** */}
                        <Grid item xs={12} md={6} className={classes.padding}>
                            <Typography gutterBottom variant='h6'>
                                Make a Call
                            </Typography>
                            <TextField className={classes.margin} fullWidth label='Id_To_Call' value={IdToCall} onChange={(e) => { setIdToCall(e.target.value) }} />
                            {callAccepted && !callEnded ? (
                                <Button className={classes.margin} onClick={LeaveCall} variant='contained' color='secondary' fullWidth startIcon={<PhoneDisabled fontSize='large' />}>Hand Up</Button>
                            ) : (<Button className={classes.margin} onClick={() => {
                                callUser(IdToCall)
                            }} variant='contained' color='primary' fullWidth startIcon={<Phone fontSize='large' />}>Call</Button>)}
                        </Grid>
                    </Grid>
                </form>
                {children}
            </Paper>
        </Container>
    )
}

export default Options

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    gridContainer: {
        width: '100%',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
        },
    },
    container: {
        width: '600px',
        margin: '35px 0',
        padding: 0,
        [theme.breakpoints.down('xs')]: {
            width: '80%',
        },
    },
    margin: {
        marginTop: 20,
    },
    padding: {
        padding: 20,
    },
    paper: {
        padding: '10px 20px',
        border: '2px solid black',
    },
}));