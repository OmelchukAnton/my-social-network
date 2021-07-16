import {updateObjectInArray} from '../utils/object-helpers';
import {UserType} from '../types/types';
import {BaseThunkType, InferActionsTypes} from './redux-store';
import {Dispatch} from 'react';
import {usersAPI} from '../api/users-api';
import {APIResponseType} from "../api/api";

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>, //array of users ids,
    filter: {
        term: '',
        friend: null as null | boolean
    }
}

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type) {
        case 'SN/USERS/FOLLOW':
            return {
                ...state, 
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true} )
            }

        case 'SN/USERS/UNFOLLOW': 
            return {
                ...state, 
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false} )
            }

        case 'SN/USERS/SET_USERS':
            return { ...state, users: action.users }
        case 'SN/USERS/SET_CURRENT_PAGE': 
            return { ...state, currentPage: action.currentPage }
        case 'SN/USERS/SET_TOTAL_USERS_COUNT': 
            return { ...state, totalUsersCount: action.count }
        case 'SN/USERS/TOGGLE_IS_FETCHING':
            return { ...state, isFetching: action.isFetching }
        case 'SN/USERS/SET_FILTER':
            return { ...state, filter: action.payload}
        case 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS': 
            return { 
                ...state, 
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
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
    setFilter: (filter: FilterType) => ({ type: 'SN/USERS/SET_FILTER', payload: filter} as const),
    setTotalUsersCount: (totalUsersCount: number) => ({ type: 'SN/USERS/SET_TOTAL_USERS_COUNT', count: totalUsersCount } as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'SN/USERS/TOGGLE_IS_FETCHING', isFetching } as const),
    toggleFollowingProgress: (isFetching: boolean, userId: any) => ({type: 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId } as const)
}


export const getUsersThunkCreator = (page: number, pageSize: number, filter: FilterType): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setCurrentPage(page))
        dispatch(actions.setFilter(filter))

        let data = await usersAPI.getUsers(page, pageSize, filter.term, filter.friend);
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount))
    }
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        let apiMethod = await usersAPI.follow.bind(usersAPI);
        await _followUnfollowFlow(dispatch, userId, apiMethod, actions.followSuccess);
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
                                    apiMethod: (userId: number) => Promise<APIResponseType>,
                                    actionCreator: (userId: number) => ActionsTypes) => {
        dispatch(actions.toggleFollowingProgress(true, userId));
        let data = await apiMethod(userId);
        console.log(data);
        // if(data.resultCode === 0) {
            dispatch(actionCreator(userId)); 
        // }
        dispatch(actions.toggleFollowingProgress(false, userId));
}


export default usersReducer;

export type InitialStateType = typeof initialState;
export type FilterType = typeof initialState.filter;
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes> 
