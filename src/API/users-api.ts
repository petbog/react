import { GetItemsType, instance } from "./api";
import { ApiResponseType } from "./auth-api";



export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`).then(res => res.data);
},
followed(userId: number) {
    return instance.delete<ApiResponseType>(`follow/${userId}`).then(res => res.data)
},
unfollow(userId: number) {
    return instance.post(`follow/${userId}`).then(res => res.data) as Promise<ApiResponseType>
},
}