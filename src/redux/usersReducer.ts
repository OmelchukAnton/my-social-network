import { updateObjectInArray } from '../utils/object-helpers';
import { UserType } from '../types/types';
import { BaseThunkType, InferActionsTypes } from './redux-store';
import { Dispatch } from 'react';
import { usersAPI } from '../api/users-api';

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>, //array of users ids,
}

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type) {
        case 'SN/USERS/FOLLOW':
            return {
                ...state, 
                // users: updateObjectInArray(state.users, action.userId, "id", {followed: true} )
            }

        case 'SN/USERS/UNFOLLOW': 
            return {
                ...state, 
                // users: updateObjectInArray(state.users, action.userId, "id", {followed: false} )
                // users: state.users.map( u => {
                //     if(u.id === action.userId) {
                //         return {...u, followed: false}
                //     }
                //     return u;
                // })
            }

        case 'SN/USERS/SET_USERS':
            return { ...state, users: action.users }
        case 'SN/USERS/SET_CURRENT_PAGE': 
            return { ...state, currentPage: action.currentPage }
        case 'SN/USERS/SET_TOTAL_USERS_COUNT': 
            return { ...state, totalUsersCount: action.count }
        case 'SN/USERS/TOGGLE_IS_FETCHING':
            return { ...state, isFetching: action.isFetching }
        case 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS': 
            return { 
                ...state, 
                // followingInProgress: action.isFetching 
                // ? [...state.followingInProgress, action.userId] 
                // : state.followingInProgress.filter(id => id !== action.userId) 
            }
        default:
            return state; 
    }
}


export const actions = {
    followSuccess: (userId: number) => ({ type: 'SN/USERS/FOLLOW', userId } as const),
    unfollowSuccess: (userId: number) => ({ type: 'SN/USERS/UNFOLLOW', userId } as const),
    setUsers: (users: Array<UserType>)=> ({ type: 'SN/USERS/SET_USERS', users } as const),
    setCurrentPage: (currentPage: number) => ({ type: 'SN/USERS/SET_CURRENT_PAGE', currentPage } as const),
    setTotalUsersCount: (totalUsersCount: number) => ({ type: 'SN/USERS/SET_TOTAL_USERS_COUNT', count: totalUsersCount } as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'SN/USERS/TOGGLE_IS_FETCHING', isFetching } as const),
    toggleFollowingProgress: (isFetching: boolean, userId: any) => ({type: 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId } as const)
}


export const getUsersThunkCreator = (page: number, pageSize: number): ThunkType => {
    return async (dispatch) => {
        // dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setCurrentPage(page))

        let data = await usersAPI.getUsers(page, pageSize);
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount))
    }
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        let apiMethod = await usersAPI.follow.bind(usersAPI);
        _followUnfollowFlow(dispatch, userId, apiMethod, actions.followSuccess);
    }
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        let apiMethod = await usersAPI.unfollow.bind(usersAPI);
        _followUnfollowFlow(dispatch, userId, apiMethod, actions.unfollowSuccess);
    }
}

const _followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>, 
                                    userId: number, 
                                    apiMethod: any, 
                                    actionCreator: (userId: number) => ActionsTypes) => {
        dispatch(actions.toggleFollowingProgress(true, userId));
        let data = await apiMethod(userId);
        if(data.resultCode === 0) {
            dispatch(actionCreator(userId)); 
        }
        dispatch(actions.toggleFollowingProgress(false, userId));
}


export default usersReducer;

type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes> 
