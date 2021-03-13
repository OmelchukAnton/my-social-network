import { stopSubmit } from "redux-form"
import { ResultCodeEnum } from "../api/api"
import { authAPI } from '../api/auth-api'
import { BaseThunkType } from "./redux-store"
import { InferActionsTypes } from './redux-store'

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    // isFetching: false
}

const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/auth/SET_USER_DATA':
            return {
                ...state,
                ...action.payload,
                isAuth: true
            }
        default:
            return state;
    }
}

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'SN/auth/SET_USER_DATA', payload: {userId, email, login, isAuth}
    } as const)
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let meData = await authAPI.me()
    if(meData.resultCode === ResultCodeEnum.Success) {
        let { id, login, email } = meData.data
        dispatch(actions.setAuthUserData(id, email, login, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean): ThunkType => async (dispatch) => {
    let loginData = await authAPI.login(email, password, rememberMe)
    if(loginData.resultCode === ResultCodeEnum.Success) {
        dispatch(getAuthUserData());
    } else {
        let message = loginData.messages.length > 0 ? loginData.messages[0] : "Some error"
        dispatch(stopSubmit("login", {_error: message}))
    }
}

export const logout = (): ThunkType => async (dispatch) => {
    let response = await authAPI.logout();
    if(response.data.resultCode === 0) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}

export default authReducer;

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | ReturnType<typeof stopSubmit>> 