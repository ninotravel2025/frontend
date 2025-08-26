const setTokenInLocalStorage = (token) => {
    return localStorage.setItem('token' ,token)
}

const getTokenFromLocalStorage = () => {
    return localStorage.getItem('token')
}

const setUserInLocalStorage = (user) => {
    return localStorage.setItem('user', JSON.stringify(user))
}

const getUserFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('user'))
}


export {
    setTokenInLocalStorage,
    getTokenFromLocalStorage,
    setUserInLocalStorage,
    getUserFromLocalStorage
}