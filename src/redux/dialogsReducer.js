const SEND_MESSAGE = 'SEND_MESSAGE';

let initialState = {
    dialogs: [
        {id: 1, name: 'Anton'},
        {id: 2, name: 'Ihar'},
        {id: 3, name: 'Aleha'}
    ],
    messages: [
        {id: 1, message: 'hi'},
        {id: 2, message: 'mes'},
        {id: 3, message: 'yo'}
    ]
}

const dialogsReducer = (state = initialState, action) => {
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

export const sendMessageCreator = (newMessageBody) => ({type: SEND_MESSAGE, newMessageBody});

export default dialogsReducer;