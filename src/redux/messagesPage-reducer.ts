const SEND_MESSAGE = 'SEND-MESSAGE';

type DialogsDataType = {
    id: number
    name: string
}
type MessagesDataType = {
    id: number
    message: string
}
let initialState = {
    DialogsData: [
        { id: 1, name: 'Андрей' },
        { id: 2, name: 'Иван' },
        { id: 3, name: 'Костя' },
        { id: 4, name: 'Настя' },
        { id: 5, name: 'Вероника' },
    ] as Array<DialogsDataType>,
    MessagesData: [
        { id: 1, message: 'Привет' },
        { id: 2, message: 'Как дела?' },
        { id: 3, message: 'Что делаешь?' },
    ] as Array<MessagesDataType>
}

export type initialStateType = typeof initialState

const messagesReducer = (state = initialState, action: actionType): initialStateType => {
    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.NewMessageBody;
            return {
                ...state,
                MessagesData: [...state.MessagesData, { id: 4, message: body }]
            };
        default:
            return state
    }
}

type actionType = sendMessageCreatorActionType

type sendMessageCreatorActionType = {
    type: typeof SEND_MESSAGE
    NewMessageBody: string

}
export const sendMessageCreator = (NewMessageBody: string ): sendMessageCreatorActionType => ({ type: SEND_MESSAGE, NewMessageBody })

export default messagesReducer;