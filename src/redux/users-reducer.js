const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS'

let InitialState = {
    users: [
        { id: 1, followed: true, fullname: 'Dmitry', status: 'bla bla', location: { city: 'Minsk', country: 'Belarus' } },
        { id: 2, followed: true, fullname: 'Andrei', status: 'bla bla', location: { city: 'Moscow', country: 'Russia' } },
        { id: 3, followed: false, fullname: 'Lena', status: 'bla bla', location: { city: 'Rostov-on-don', country: 'Russia' } },
        { id: 4, followed: false, fullname: 'Sveta', status: 'bla bla', location: { city: 'Krasnodar', country: 'Russia' } },
    ]
}

const UsersReducer = (state = InitialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true }
                    }
                    return u;
                })
            }

        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false }
                    }
                    return u;
                })
            }
        case SET_USERS: {
            return {
                ...state, users: [...state.users, ...action.users]
            }
        }
        default:
            return state;
    }
}

export let followAC = (userId) => ({ type: FOLLOW, userId });
export let unfollowAC = (userId) => ({ type: UNFOLLOW, userId });
export let setUsersAC = (users) => ({ type: SET_USERS, users });

export default UsersReducer;