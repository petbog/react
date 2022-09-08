import Messages from "./Messages";
import { updateNewMessageBody, sendMessageCreator } from '../../redux/messagesPage-reducer'
import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";


let mapStateToProps = (state) => {
    return {
        messagesPage: state.messagesPage,
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
export default compose(
    
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Messages);