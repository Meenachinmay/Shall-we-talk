import cookie from 'js-cookie'

// set cookie
export const setCookie = (key, value) => {
    if (window !== 'undefined') {
        cookie.set(key, value, {
            expires: 1
        })
    }
}

// remove from cookie
export const removeCookie = (key) => {
    if (window !== 'undefined') {
        cookie.remove(key,{
            expires: 1
        })
    }
}

// get from cookie such as stored token
// will be used for when we need to make request to server with token
export const getCookie = (key) => {
    if (window !== 'undefined') {
        return cookie.get(key)
    }
}

// set in locatstorage
export const setLocalStorage = (key, value) => {
    if (window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value))
    }
}

// remove from localstorageexport const setLocalStorage = (key, value) => {
export const removeLocalStorage = (key) => {
    if (window !== 'undefined') {
        localStorage.removeItem(key)
    }
}

// auth user by pass the data to cookie and localstroage
export const authenticate = (response, next) => {
    setCookie('token', response.data.token)
    setLocalStorage('user', response.data.user)
    next()
}

//access user infor from localstorage
export const isAuth = () => {
    if (window !== 'undefined') {
        const cookieChecked = getCookie('token')

        if (cookieChecked) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'))
            } else {
                return false
            }
        }
    }
}