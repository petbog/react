const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
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
    ]
}
const messagesReducer = (state = initialState, action) => {
    switch (action.type) {

        case SEND_MESSAGE:
            let body = action.newMessageBody;// косяк тут 
            debugger;
            return{ ...state,
                MessagesData: [...state.MessagesData,{ id: 4, message: body }]   
            };
            default:
                return state
            }
        }
export const sendMessageCreator = (NewMessageBody) => ({ type: 'SEND-MESSAGE',NewMessageBody })

export default messagesReducer;