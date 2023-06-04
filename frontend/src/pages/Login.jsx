import React from 'react'
import { useState } from 'react';
import { fetchApiProcess, returnWarning, handleSetState } from './utils';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showWarningEmail, setShowWarningEmail] = useState(false);
    const [showWarningPassword, setShowWarningPassword] = useState(false);
    const [showWarningWrongEmailOrPassword, setShowWarningWrongEmailOrPassword] = useState(false);

    const verifyStates = () => {
        const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        const isValid = regexEmail.test(email);
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
            }, { 'Content-Type': 'application/json' });
            if (Object.keys(response).includes('message')) {
                return setShowWarningWrongEmailOrPassword(true);
            } else {
                setShowWarningWrongEmailOrPassword(false);
            }
        }
    }

    return (
        <div>
            <div>
                {showWarningEmail && returnWarning('Insira um endereço de e-mail válido.', showWarningEmail)}
                <input placeholder='E-mail:' value={email} onChange={({ target }) => handleSetState(target.value, setEmail)} />
                {showWarningPassword && returnWarning('A senha deve ser informada.', showWarningPassword)}
                <input placeholder='Password:' type='password' value={password} onChange={({ target }) => handleSetState(target.value, setPassword)} />
                <label htmlFor='rememberMe'>Lembre-se dessa conta</label>
                <input type='checkbox' id='rememberMe' onClick={() => handleSetState(!rememberMe, setRememberMe)} />
                {showWarningWrongEmailOrPassword && returnWarning('Email ou senha inválidos.', showWarningWrongEmailOrPassword)}
                <button type='button' onClick={async () => await handleLoginClick()}>LogIn</button>
                <a href='/register'>Ainda não possui conta? Clique aqui!</a>
            </div>
        </div>
    )
}