import React from "react";
import Messages from "./Messages";
import {updateNewMessageBody,sendMessageCreator} from '../../redux/messagesPage-reducer'

const MessagesContainer = (props) => {
    let state = props.store.getState().messagesPage
   
    let textInner = () => {
        props.store.dispatch(sendMessageCreator())
    }
    let onNewMessageChange = (body) => {
        props.store.dispatch(updateNewMessageBody(body))
    }

    return (
        <Messages
        updateNewPost={onNewMessageChange}
        sendMessage = {textInner}
        messagesPage={state}
        />
    )
}

export default MessagesContainer;