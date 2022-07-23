const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState =  {
    DialogsData: [
        { id: 1, name: 'Андрей' },
        { id: 2, name: 'Иван' },
        { id: 3, name: 'Костя' },
        { id: 4, name: 'Настя' },
        { id: 5, name: 'Вероника' },
    ],
    MessagesData: [
        { id: 1, message: 'Привет' },
        { id: 2, message: 'Как дела?' },
        { id: 3, message: 'Что делаешь?' },
    ],
    newMessageBody: "",
}
const messagesReducer = (state = initialState, action) => {
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