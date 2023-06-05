export const handleSetState = (value, setState) => {
    setState(value);
}

export const returnWarning = (warning, conditional) => {
    if (conditional) return (<p className="warningMessage">{warning}</p>)
}

export const verifyEmail = (email) => {
    const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const isValid = regexEmail.test(email);
    return isValid;
}

export const fetchApiProcess = async (method, endpoint, body, headers) => {
    const API_HOST = process.env.REACT_APP_API_PORT;
    const request = {
        method: method,
        cache: "no-cache",
        url: API_HOST + endpoint,
        headers: { "Content-Type": "application/json", ...headers },
        body: JSON.stringify(body),
    };
    const responseJson = await fetch(API_HOST + endpoint, request);
    const response = await responseJson.json();
    // console.log(response)
    return response;
}

export const localStorageSetItem = (key, value, conditional) => {
    if (typeof conditional !== "undefined" && conditional) return localStorage.setItem(`${key}`, JSON.stringify(value));
}

export const localStorageRemoveItem = (key, conditional) => {
    if (typeof conditional !== "undefined" && !conditional) return localStorage.removeItem(`${key}`)
}

export const verifyToken = async (token) => {
    const response = await fetchApiProcess("POST", '/api/verifyToken', {}, { authorization: token });
    if (Object.keys(response).includes('message')) return false;
    if (Object.keys(response).includes('validToken')) return true;
}

export const tokenRedirect = async (token, history, add) => {
    const tokenJson = localStorage.getItem('token');
    if (!token.token && tokenJson) {
        const tokenOnLocalStorage = JSON.parse(localStorage.getItem('token'));
        const response = await verifyToken(tokenOnLocalStorage.token)
        if (response) {
            add(tokenOnLocalStorage.token)
            return true;
        } else {
            return history.push('/')
        }
    }
    if (token.token && !tokenJson) {
        const response = await verifyToken(token.token);
        if (response) return true
    } else { return history.push('/') }
}