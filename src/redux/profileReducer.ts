import { profileAPI, usersAPI } from '../api/api';
import { PhotosType, PostType, ProfileType } from '../types/Types';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

let initialState = {
    posts: [
        {id: 1,  message: 'Hi, how are you?', likesCount: 15},
        {id: 2,  message: 'Its my first post', likesCount: 23}
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    newPostText: ''
}

export type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action: any): InitialStateType => {
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
        case DELETE_POST: {
            return {...state, posts: state.posts.filter(p => p.id !== action.postId)}
        }
        case SAVE_PHOTO_SUCCESS: {
            return {...state, profile: {...state.profile, photos: action.photos } as ProfileType}
        }
        default: 
            return state;
    }
}

type AddPostActionCreatorActionType = {
    type: typeof ADD_POST
    newPostText: string
}

export const addPostActionCreator = (newPostText: string): AddPostActionCreatorActionType => ({type: ADD_POST, newPostText});

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({type: SET_USER_PROFILE, profile});

type SetStatusActionType = {
    type: typeof SET_STATUS,
    status: string
}
export const setStatus = (status: string): SetStatusActionType => ({type: SET_STATUS, status});
type DeletePostActionType = {
    type: typeof DELETE_POST,
    postId: number
}
export const deletePost = (postId: number): DeletePostActionType => ({type: DELETE_POST, postId});
type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS,
    photos: PhotosType
}
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({type: SAVE_PHOTO_SUCCESS, photos});

// thunk
export const getUserProfile = (userId: number) => async (dispatch: any) => {
    const response = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(response));
}

// export const getUserStatus = (userId) => (dispatch) => {
//     profileAPI.getUserStatus(userId)
//         .then(response => {
//             dispatch(setStatus(response))
//         })
// }

// export const updateStatus = (status) => (dispatch) => {
//     profileAPI.updateStatus(status)
//         .then(response => {
//             if(response.resultCode === 0) {
//                 dispatch(setStatus(response.status));
//             }
//         })
// }

export const getUserStatus = (userId: number) => async (dispatch: any) => {
    const response = await profileAPI.getUserStatus(userId);
    dispatch(setStatus(response));
}

export const updateStatus = (status: string) => async (dispatch: any) => {
    try {
        const response = await profileAPI.updateStatus(status);
        if(response.resultCode === 0) {
            dispatch(setStatus(response.status));
        }
    } catch(error) {
        alert('error update status');
    }
    
}

export const savePhoto = (file: any) => async (dispatch: any) => {
    const response = await profileAPI.savePhoto(file);
    if(response.resultCode === 0) {
        dispatch(savePhotoSuccess(response.photos));
    }
}

export default profileReducer;