const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';
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
    ],
    newMessageBody: ""
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            state.newMessageBody = action.body;
            return state;
        case SEND_MESSAGE:
            let body = state.newMessageBody;
            state.newMessageBody = '';
            state.messages.push({id: 6, message: body});
            return state;
        default:
            return state;
    }
}

export const sendMessageCreator = () => ({type: SEND_MESSAGE});
export const updateNewMessageBodyCreator = (text) => 
    ({type: UPDATE_NEW_MESSAGE_BODY, body: text})

export default dialogsReducer;