import '../App.css';
import { Button, TextField, Typography, Grid, Container, Paper, makeStyles } from "@material-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Assignment, Phone, PhoneDisabled } from "@material-ui/icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Options = ({ children, Me, callAccepted, name, setname, LeaveCall, callUser, callEnded, IdToCall, setIdToCall, callingUser }: { children: JSX.Element; Me: any; callAccepted: Boolean; name: String, setname: Function; LeaveCall: any; callUser: any; callEnded: any; IdToCall: string; setIdToCall: Function; callingUser: Boolean }) => {
    const classes = useStyles();
    return (
        <div>
            {
                callingUser || Me?.length === 0 ? (<div style={{
                    margin: '50px'
                }} className="loader">
                    <span></span>
                </div>) : (<div>
                    {callAccepted && !callEnded ? (
                        <Container className={classes.container}>
                            <Paper elevation={10} className={classes.paper}>
                                <a href='/'> <Button onClick={LeaveCall} variant='contained' color='secondary' fullWidth startIcon={<PhoneDisabled fontSize='large' />}>Hand Up</Button> </a>
                            </Paper>
                        </Container>
                    ) : (<Container className={classes.container}>
                        <Paper elevation={10} className={classes.paper}>
                            <form className={classes.root} noValidate autoComplete='off'>
                                <Grid container className={classes.gridContainer}>
                                    <Grid item xs={12} md={6} className={classes.padding}>
                                        <Typography gutterBottom variant='h6'>
                                            Account Info
                                        </Typography>
                                        <TextField className={classes.margin} fullWidth label='Name' value={name} onChange={(e) => { setname(e.target.value) }} />
                                        <CopyToClipboard text={Me}
                                            onCopy={() => {
                                                if (Me?.length > 0) {
                                                    toast('Id Coppied! share it with the other user to establish a connection')
                                                } else {
                                                    toast('SomeThing Went Wrong , Reload and try again please')
                                                }
                                            }}>
                                            <Button className={classes.margin} variant='contained' color='primary' fullWidth startIcon={<Assignment fontSize='large' />}>Copy Your Id</Button>
                                        </CopyToClipboard>
                                    </Grid>
                                    {/* ******************** */}
                                    <Grid item xs={12} md={6} className={classes.padding}>
                                        <Typography gutterBottom variant='h6'>
                                            Enter Conncection Id
                                        </Typography>
                                        <TextField className={classes.margin} fullWidth label='Id_To_Connect' value={IdToCall} onChange={(e) => { setIdToCall(e.target.value) }} />
                                        <Button className={classes.margin} onClick={() => {
                                            if (name.length < 2) {
                                                toast('Please Enter Your Name')
                                            } else {
                                                if (IdToCall.length > 0) {
                                                    callUser(IdToCall)
                                                } else {
                                                    toast('Please Enter Conncection Id of User You Want To connect')
                                                }
                                            }
                                        }} variant='contained' color='primary' fullWidth startIcon={<Phone fontSize='large' />}>Connect</Button>
                                    </Grid>
                                </Grid>
                            </form>
                            {children}
                        </Paper>
                    </Container>)}
                </div>)
            }
            <ToastContainer />
        </div>
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
            width: '100%',
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