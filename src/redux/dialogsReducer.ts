const SEND_MESSAGE = 'SEND_MESSAGE';

type DialogType = {
    id: number
    name: string
}

type MessageType = {
    id: number
    message: string
}

let initialState = {
    dialogs: [
        {id: 1, name: 'Anton'},
        {id: 2, name: 'Ihar'},
        {id: 3, name: 'Aleha'}
    ] as Array<DialogType>,
    messages: [
        {id: 1, message: 'hi'},
        {id: 2, message: 'mes'},
        {id: 3, message: 'yo'}
    ] as Array<MessageType>
}

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: body}]
            }
        default:
            return state;
    }
}

type sendMessageCreatorActionType = {
    type: typeof SEND_MESSAGE
    newMessageBody: string
}
export const sendMessageCreator = (newMessageBody: string): sendMessageCreatorActionType => ({type: SEND_MESSAGE, newMessageBody});

export default dialogsReducer;