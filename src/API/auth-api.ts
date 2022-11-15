import { instance, ResultCodesCaptcha, ResultCodesEnum } from "./api"


export type ApiResponseType<D = {}, RC = ResultCodesEnum | ResultCodesCaptcha> = {
    data: D
    messages: Array<string>
    resultCode: RC
}


type MeResponseDataType = {
    id: number
    email: string
    login: string
}

//типизация что должен вернуть api 
//then(res => res.data) позволяет нам в thunk сократить синтаксис и перейти к сразу data с api
type LoginApiType = {
    userId: number
}

export const authAPI = {
    me() {
        return instance.get<ApiResponseType<MeResponseDataType>>(`auth/me`).then(res => res.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<ApiResponseType<LoginApiType>>(`auth/login`, { email, password, rememberMe, captcha }).then(res => res.data)
    },
    logout() {
        return instance.delete(`auth/login`).then(res => res.data)
    },
}
