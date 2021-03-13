import { instance, ResponseType } from './api'


type MeResponseDataType = {
    resultCode: number
    messages: Array<string>
}

type LoginMeResponseDataType = {
    userId: number
}

export const authAPI = {
    me() {
        return instance.get<ResponseType<MeResponseDataType>>('auth/me').then(res => res.data);
    },
    login(email: string, password: string, rememberMe = false) {
        return instance.post<ResponseType<LoginMeResponseDataType>>('auth/login', { email, password, rememberMe })
        .then(res => res.data);
    },
    logout() {
        return instance.delete('auth/login');
    }
}