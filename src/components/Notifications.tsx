import React from 'react'
import { Button } from "@material-ui/core";

const Notifications = ({ AnswerCall, call, callAccepted }: { AnswerCall: any; call: any; callAccepted: any }) => {
    return (
        <>
            {call.isRecivingCall && !callAccepted && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <h1>{call.name} is Calling :</h1>
                    <Button onClick={AnswerCall} variant='contained' color='primary'>Answer</Button>
                </div>
            )}
        </>
    )
}

export default Notifications