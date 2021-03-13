import { InferActionsTypes } from "./redux-store";

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

const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/DIALOGS/SEND_MESSAGE':
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: body}]
            }
        default:
            return state;
    }
}

export const actions = {
    sendMessageCreator: (newMessageBody: string) => ({type: 'SN/DIALOGS/SEND_MESSAGE', newMessageBody} as const)
}

export default dialogsReducer;

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>