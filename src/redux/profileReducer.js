import { profileAPI } from './../../src/api/api';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

let initialState = {
    posts: [
        {id: 1,  message: 'Hi, how are you?', likesCount: '15'},
        {id: 2,  message: 'Its my first post', likesCount: '23'}
    ],
    profile: null
}

const profileReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            }
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case SET_STATUS: {
            return {...state, status: action.status}
        }
        default: 
            return state;
    }
}

export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setStatus = (status) => ({type: SET_STATUS, status});


export const getProfileThunkCreator = (userId) => {
    return (dispatch) => {
        profileAPI.getProfile(userId).then(data => {
            dispatch(setUserProfile(data));
        })
    }
}

export const getUserStatus = (userId) => {
    return (dispatch) => {
        profileAPI.getUserStatus(userId).then(data => {
            dispatch(setStatus(data));
        })
    }
}

export const updateStatus = (status) => {
    return (dispatch) => {
        profileAPI.updateStatus(status).then(data => {
            if(data.resultCode === 0) {
                dispatch(setStatus(data.status));
            }
        })
    }
}

export default profileReducer;