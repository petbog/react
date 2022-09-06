import Messages from "./Messages";
import { updateNewMessageBody, sendMessageCreator } from '../../redux/messagesPage-reducer'
import { connect } from "react-redux";


let mapStateToProps = (state) => {
    return {
        messagesPage: state.messagesPage,
        isAuth:state.auth.isAuth,
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