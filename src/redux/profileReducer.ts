import { profileAPI } from '../api/profile-api';
import { PhotosType, PostType, ProfileType } from '../types/types';
import { BaseThunkType, InferActionsTypes } from './redux-store';

let initialState = {
    posts: [
        {id: 1,  message: 'Hi, how are you?', likesCount: 15},
        {id: 2,  message: 'Its my first post', likesCount: 23}
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    newPostText: ''
}

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        case 'SN/PROFILE/ADD-POST': {
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
        case 'SN/PROFILE/SET_USER_PROFILE': {
            return {...state, profile: action.profile}
        }
        case 'SN/PROFILE/SET_STATUS': {
            return {...state, status: action.status}
        }
        case 'SN/PROFILE/DELETE_POST': {
            return {...state, posts: state.posts.filter(p => p.id !== action.postId)}
        }
        case 'SN/PROFILE/SAVE_PHOTO_SUCCESS': {
            return {...state, profile: {...state.profile, photos: action.photos } as ProfileType}
        }
        default: 
            return state;
    }
}

export const actions = {
    addPostActionCreator: (newPostText: string) => ({type: 'SN/PROFILE/ADD-POST', newPostText} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'SN/PROFILE/SET_USER_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'SN/PROFILE/SET_STATUS', status} as const),
    deletePost: (postId: number) => ({type: 'SN/PROFILE/DELETE_POST', postId} as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: 'SN/PROFILE/SAVE_PHOTO_SUCCESS', photos} as const)
}

// thunk
export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    const response = await profileAPI.getProfile(userId);
    dispatch(actions.setUserProfile(response));
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

export const getUserStatus = (userId: number): ThunkType => async (dispatch) => {
    const response = await profileAPI.getUserStatus(userId);
    dispatch(actions.setStatus(response));
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    try {
        const response = await profileAPI.updateStatus(status);
        if(response.resultCode === 0) {
            dispatch(actions.setStatus(status));
        }
    } catch(error) {
        alert('error update status');
    }
    
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    const response = await profileAPI.savePhoto(file);
    if(response.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(response.data.photos));
    }
}

export default profileReducer;

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>