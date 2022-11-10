import axios from "axios"
import { profileType } from "../types/types";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '898044f8-949b-4aa5-a231-76970fe607f7'
    }
});


export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => {
            return response.data
        });
    },
    followed(userId: number) {
        return instance.delete(`follow/${userId}`)
    },
    unfollow(userId: number) {
        return instance.post(`follow/${userId}`)
    },
    getProfile(userId: number) {
        console.warn('Obsolete method.Please ProfileAPI object')
        return profileAPI.getProfile(userId)
    },
}
export const profileAPI = {
    getProfile(userId: number) {
        return instance.get(`profile/${userId} `)
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, { status: status })
    },
    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append("image", photoFile)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile: profileType) {
        return instance.put(`profile`, profile)
    }

}



type AuthApiTypes = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodesEnum | ResultCodesCaptcha
    messages: Array<string>
}
//перебирает варианты отета
export enum ResultCodesEnum {
    success = 0,
    error = 1,
}
export enum ResultCodesCaptcha {
    error = 10
}
//типизация что должен вернуть api 
//then(res => res.data) позволяет нам в thunk сократить синтаксис и перейти к сразу data с api
type LoginApiType = {
    resultCode: ResultCodesEnum | ResultCodesCaptcha
    messages: Array<string>
    data: {
        userId: number
    }
}
type LogoutApiType = {
    resultCode: ResultCodesEnum
    messages: Array<string>
    data: {}
}

export const authAPI = {
    me() {
        return instance.get<AuthApiTypes>(`auth/me`).then(res => res.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<LoginApiType>(`auth/login`, { email, password, rememberMe, captcha }).then(res => res.data)
    },
    logout() {
        return instance.delete<LogoutApiType>(`auth/login`).then(res => res.data)
    },
}


// type CaptchaApiType = {
//     Properties:string
// }

export const securityAPI = {
    getCaptchaApi() {
        return instance.get(`security/get-captcha-url`)
    }
}
