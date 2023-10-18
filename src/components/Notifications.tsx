import { Button, Dialog, DialogTitle, DialogActions, makeStyles } from "@material-ui/core";

const Notifications = ({ AnswerCall, call, callAccepted }: { AnswerCall: any; call: any; callAccepted: any }) => {
    const classes = useStyles();
    return (
        <>
            {call.isRecivingCall && !callAccepted && (
                <Dialog className={classes.container} open={true}>
                    <DialogTitle className={classes.container}>Incomming Call</DialogTitle>
                    <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBlock: '10px',
                    }}>
                        <h1 style={{
                            padding: '10px',
                            textAlign: 'center'
                        }}>{call.name} is Calling</h1>
                    </div>
                    <DialogActions style={{
                        marginBottom: 10,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',

                    }}>
                        <Button onClick={AnswerCall} variant='contained' color='primary'>Answer</Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    )
}

export default Notifications

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
}))