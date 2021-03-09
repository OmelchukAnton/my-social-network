import { stopSubmit } from "redux-form";
import { authAPI, ResultCodeEnum } from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    // isFetching: false
}

export type InitialStateType = typeof initialState;

const authReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        default:
            return state;
    }
}

type SetAuthUserDataActionPayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean | null
}

type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA, 
    payload: SetAuthUserDataActionPayloadType
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
    type: SET_USER_DATA, 
    payload: 
        {userId, email, login, isAuth}
});

export const getAuthUserData = () => async (dispatch: any) => {
    let meData = await authAPI.me();
    if(meData.resultCode === ResultCodeEnum.Success) {
        let { id, login, email } = meData.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const login = (email: string, password: string, rememberMe: boolean) => async (dispatch: any) => {
    let loginData = await authAPI.login(email, password, rememberMe);
    if(loginData.resultCode === ResultCodeEnum.Success) {
        dispatch(getAuthUserData());
    } else {
        let message = loginData.messages.length > 0 ? loginData.messages[0] : "Some error";
        dispatch(stopSubmit("login", {_error: message}));
    }
}

export const logout = () => async (dispatch: any) => {
    let response = await authAPI.logout();
    if(response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export default authReducer;

