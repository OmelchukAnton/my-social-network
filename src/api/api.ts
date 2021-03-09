import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "3b85e32e-dbc0-4caf-b682-3c4c0b872910"
    }
});

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => {
            return response.data;
        })
    },
    follow(userId: number) {
        return instance.post(`follow/${userId}`).then(response => {
            return response.data;
        });
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`).then(response => {
            return response.data;
        });
    }
} 

export const profileAPI = {
    getProfile(userId: number) {
        console.log('HERE')
        return instance.get(`profile/${userId}`).then(response => {
            return response.data;
        });
    },
    getUserStatus(userId: number) {
        return instance.get(`profile/status/${userId}`).then(response => {
            return response.data;
        });
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, { status: status}).then(response => {
            return response.data;
        });
    },
    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append("image", photoFile )
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            return response.data;
        });
    }
}

export enum ResultCodeEnum {
    Success = 0,
    Error = 1
}

type MeResponseData = {
    data: { 
        id: number
        email: string
        login: string 
    }
    resultCode: number
    messages: Array<string>
}

type LoginMeResponseType = {
    data: { 
        userId: number
    }
    resultCode: ResultCodeEnum
    messages: Array<string>
}

export const authAPI = {
    me() {
        return instance.get<MeResponseData>('auth/me').then(res => res.data);
    },
    login(email: string, password: string, rememberMe = false) {
        return instance.post<LoginMeResponseType>('auth/login', { email, password, rememberMe })
        .then(res => res.data);
    },
    logout() {
        return instance.delete('auth/login');
    }
}
    