export const handleSetState = (value, setState) => {
    setState(value);
}

export const returnWarning = (warning, conditional) => {
    if (conditional) return (<p className="warningMessage">{warning}</p>)
}

export const fetchApiProcess = async (method, endpoint, body, headers) => {
    const API_HOST = process.env.REACT_APP_API_PORT;
    console.log(API_HOST);
    headers["Content-Type"] = "application/json";
    const request = {
        method: method,
        url: `${API_HOST}${endpoint}`,
        headers,
        body: JSON.stringify(body),
    };
    const responseJson = await fetch(`${API_HOST}${endpoint}`, request);
    const response = await responseJson.json();
    return response;
}

    // const fetchApiProcess1 = async () => {
    //     const API_HOST = process.env.REACT_APP_API_PORT
    //     console.log(API_HOST)
    //     // || 'http://localhost:3002/api/login';

    //     const headers = { 'Content-Type': 'application/json' }
    //     const request = {
    //         method: "POST",
    //         url: 'http://localhost:3002/api/login',
    //         headers,
    //         body: JSON.stringify({
    //             "email": `${email}`,
    //             "password": `${password}`,
    //         }),
    //     };
    //     const responseJson = await fetch(`${API_HOST}/api/login`, request);
    //     const response = await responseJson.json();
    //     return response;
    // }