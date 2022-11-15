import axios from "axios"
import { usersType } from "../types/types";



export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '898044f8-949b-4aa5-a231-76970fe607f7'
    }
});



//перебирает варианты отета
export enum ResultCodesEnum {
    success = 0,
    error = 1,
}
export enum ResultCodesCaptcha {
    error = 10
}

export type GetItemsType ={
    items:Array<usersType>
    totalCount:number
    error:string | null
}