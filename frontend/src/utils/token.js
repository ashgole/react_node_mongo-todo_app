export const setToken = (key, value) => {
    window.localStorage.setItem(key, value);
}
export const getToken = (key) => {
    return window.localStorage.getItem(key);
}

export const removeToken = (key) => {
    return window.localStorage.removeItem(key);
}


