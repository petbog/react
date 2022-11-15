import { instance } from "./api"

type getCaptchaApiResponseType ={
    url :string
}


export const securityAPI = {
    getCaptchaApi() {
        return instance.get<getCaptchaApiResponseType>(`security/get-captcha-url`).then (res => res.data)
    }
}
