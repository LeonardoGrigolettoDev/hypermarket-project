const INITIAL_STATE = {
    token: localStorage.getItem(token),
}

function token(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'setToken':
            return {...state, token: action.payload };
        default: 
            return state;
    }
}

export default token;