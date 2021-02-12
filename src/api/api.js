import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "3b85e32e-dbc0-4caf-b682-3c4c0b872910"
    }
});

export const usersAPI = {
    getUsers(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => {
            return response.data;
        })
    },
    follow(userId) {
        return instance.post(`follow/${userId}`).then(response => {
            return response.data;
        });
    },
    unfollow(userId) {
        return instance.delete(`follow/${userId}`).then(response => {
            return response.data;
        });
    }
} 

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/${userId}`).then(response => {
            return response.data;
        });
    },
    getUserStatus(userId) {
        return instance.get(`profile/status/${userId}`).then(response => {
            return response.data;
        });
    },
    updateStatus(status) {
        return instance.put(`profile/status`, { status: status}).then(response => {
            return response.data;
        });
    }
}

export const authAPI = {
    getAuthUserData() {
        return instance.get(`auth/me`).then(response => {
            return response.data;
        });
    },
    // login(email, password, rememberMe = false) {
    //     return instance.post(`auth/login`, { email, password, rememberMe })
    // }
}
    