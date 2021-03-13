import axios from 'axios';
import { UserType } from '../types/Types';

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "3b85e32e-dbc0-4caf-b682-3c4c0b872910"
    }
});


export enum ResultCodeEnum {
    Success = 0,
    Error = 1
}

export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

export type APIResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D // generic 
    messages: Array<string>
    resultCode: RC // generic
}

    