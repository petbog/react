import axios from "axios"


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
    followed(userId) {
       return instance.delete(`follow/${userId}`)
    },
    unfollow(userId) {
       return instance.post(`follow/${userId}`)
    },
    getProfile(userId){
        console.warn('Obsolete method.Please ProfileAPI object')
        return profileAPI.getProfile(userId)
    },
}
export const profileAPI = {
    getProfile(userId){
        return instance.get(`profile/${userId} `)
    },
    getStatus(userId){
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status){
        return instance.put(`profile/status`,{status:status})
    }

}





export const authAPI = {
    me(){
        return instance.get(`auth/me`)
    }   
}
