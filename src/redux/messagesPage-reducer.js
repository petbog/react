const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';

const messagesReducer = (state, action) => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            state.newMessageBody = action.body;
            return state
        case SEND_MESSAGE:
            let body = state.newMessageBody;
            state.newMessageBody = "";
            state.MessagesData.push({ id: 4, message: body })
            return state
        default:
            return state
    }
}
export const sendMessageCreator = () => ({ type: 'SEND-MESSAGE' })
export const updateNewMessageBody = (body) => ({ type: 'UPDATE-NEW-MESSAGE-BODY', body: body })

export default messagesReducer;