export type authActions = 
    { type: "login" } |
    { type: "logout" }

export type authState = {
    isAuth: boolean
}

export const initialState : authState = {
    isAuth: !!localStorage.getItem("token"),
}

export const authReducer = (
    state: authState = initialState,
    action: authActions
) => {
    if(action.type === 'login') {
        return {
            ...state,
            isAuth: true
        }
    }

    if(action.type === 'logout') {
        return {
            ...state,
            isAuth: false
        }
    }

    return state
}