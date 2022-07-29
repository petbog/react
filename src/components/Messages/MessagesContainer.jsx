import React from "react";
import Messages from "./Messages";
import { updateNewMessageBody, sendMessageCreator } from '../../redux/messagesPage-reducer'
import StoreContext from "../../StoreContext";

const MessagesContainer = () => {
    return (
        <StoreContext.Consumer>
            {
                (store) => {
                    let state = store.getState().messagesPage

                    let textInner = () => {
                        store.dispatch(sendMessageCreator())
                    }
                    let onNewMessageChange = (body) => {
                        store.dispatch(updateNewMessageBody(body))
                    }

                    return <Messages
                        updateNewPost={onNewMessageChange}
                        sendMessage={textInner}
                        messagesPage={state}
                    />
                }
            }
        </StoreContext.Consumer>
    )
}

export default MessagesContainer;