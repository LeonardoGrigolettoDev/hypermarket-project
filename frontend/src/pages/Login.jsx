import React from 'react'
import { useState } from 'react';
import { fetchApiProcess, returnWarning, handleSetState, localStorageSetItem, localStorageRemoveItem, verifyEmail, tokenRedirect } from './utils';
import { addTokenAction } from '../redux/action/index'
import { connect } from 'react-redux';

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showWarningEmail, setShowWarningEmail] = useState(false);
    const [showWarningPassword, setShowWarningPassword] = useState(false);
    const [showWarningWrongEmailOrPassword, setShowWarningWrongEmailOrPassword] = useState(false);
    const tokenOnLocalStorage = localStorage.getItem('token');
    // const [token, setToken] = useState('');
    const { setToken, history, token } = props;

    const verifyStates = () => {
        const isValid = verifyEmail(email);
        if (!isValid) handleSetState(true, setShowWarningEmail);
        if (isValid) handleSetState(false, setShowWarningEmail);
        if (password.length === 0) handleSetState(true, setShowWarningPassword);
        if (password.length !== 0) handleSetState(false, setShowWarningPassword);
        if (password.length === 0 || !isValid) return false;
        if (password.length !== 0 && isValid) return true;
    }

    const handleLoginClick = async () => {
        const verified = verifyStates();
        console.log(verified)
        if (verified) {
            const response = await fetchApiProcess("POST", "/api/login", {
                "email": `${email}`,
                "password": `${password}`,
            }, {});
            if (Object.keys(response).includes('message')) {
                return setShowWarningWrongEmailOrPassword(true);
            } else {
                setShowWarningWrongEmailOrPassword(false);
                setToken(response.token);
                localStorageSetItem('token', response, rememberMe);
                localStorageRemoveItem('token', rememberMe);
                history.push('/stats');
            }
        }
    }
    
    (token.token && !tokenOnLocalStorage) && tokenRedirect(token, history, setToken);
    return (
        <div>
            <div>
                {showWarningEmail && returnWarning('Insira um endereço de e-mail válido.', showWarningEmail)}
                <input placeholder='E-mail:' value={email} onChange={({ target }) => handleSetState(target.value, setEmail)} />
                {showWarningPassword && returnWarning('A senha deve ser informada.', showWarningPassword)}
                <input placeholder='Password:' type='password' value={password} onChange={({ target }) => handleSetState(target.value, setPassword)} />
                <label htmlFor='rememberMe'>Lembre-se dessa conta</label>
                <input type='checkbox' id='rememberMe' onClick={({ target }) => { handleSetState(target.checked, setRememberMe) }} />
                {showWarningWrongEmailOrPassword && returnWarning('Email ou senha inválidos.', showWarningWrongEmailOrPassword)}
                <button type='button' onClick={async () => await handleLoginClick()}>LogIn</button>
                <a href='/register'>Ainda não possui conta? Clique aqui!</a>
            </div>
        </div>
    )

}
const mapDispatchToProps = (dispatch) => ({
    setToken: (value) => dispatch(addTokenAction(value)),
});

const mapStateToProps = (state) => ({
    token: state.token
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);