// import React from "react";
import Messages from "./Messages";
import { updateNewMessageBody, sendMessageCreator } from '../../redux/messagesPage-reducer'
import {connect} from "react-redux";

// const MessagesContainer = () => {
//     return (
//         <StoreContext.Consumer>
//             {
//                 (store) => {
//                     let state = store.getState().messagesPage

//                     let textInner = () => {
//                         store.dispatch(sendMessageCreator())
//                     }
//                     let onNewMessageChange = (body) => {
//                         store.dispatch(updateNewMessageBody(body))
//                     }

//                     return <Messages
//                         updateNewPost={onNewMessageChange}
//                         sendMessage={textInner}
//                         messagesPage={state}
//                     />
//                 }
//             }
//         </StoreContext.Consumer>
//     )
// }

let mapStateToProps = (state) => {
    return {
        messagesPage: state.messagesPage
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        updateNewPost: (body) => {
            dispatch(updateNewMessageBody(body))
        },
        sendMessage: () => {
            dispatch(sendMessageCreator())
        },
    }
}

const MessagesContainer = connect(mapStateToProps, mapDispatchToProps)(Messages);


export default MessagesContainer;