import profileReducer from './profileReducer';
import dialogsReducer from './dialogsReducer';
import sidebarReducer from './sidebarReducer';

let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1,  message: 'Hi, how are you?', likesCount: '15'},
                {id: 2,  message: 'Its my first post', likesCount: '23'}
            ],
            newPostText: 'it-kama',
        },
        dialogsPage: {
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
        },
        sidebar: {
            
        }
    },
    _callSubscriber() {
        console.log('state changed');
    }, 

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer; // pattern observer
    },
    
    dispatch(action) { // action - object
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._callSubscriber(this._state);
    }
}


export default store;
window.store = store;

// store - OOP
