import React, { useState, useEffect } from 'react'
import { returnWarning, handleSetState, fetchApiProcess, verifyEmail, verifyToken } from './utils'

export default function Register(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState('');
  const [showWarningEmailRegistered, setShowWarningEmailRegistered] = useState(false);
  const [showWarningName, setWarningName] = useState(false);
  const [showWarningEmail, setShowWarningEmail] = useState(false);
  const [showWarningPassword, setShowWarningPassword] = useState(false);
  const [showWarningWrongNotSamePassword, setShowWarningWrongNotSamePassword] = useState(false);
  const { history } = props;
  const verifyStates = () => {
    if (name.length < 2) { handleSetState(true, setWarningName); setName('') };
    if (name.length > 2) { handleSetState(false, setWarningName) };
    const isValid = verifyEmail(email);
    if (!isValid) { handleSetState(true, setShowWarningEmail); setEmail('') };
    if (isValid) { handleSetState(false, setShowWarningEmail) };
    if (password.length < 7) { handleSetState(true, setShowWarningPassword); setPassword('') };
    if (password.length > 0) { handleSetState(false, setShowWarningPassword) };
    if (passwordVerify !== password) { handleSetState(true, setShowWarningWrongNotSamePassword); setPasswordVerify(''); setPassword('') };
    if (passwordVerify === password) { handleSetState(false, setShowWarningWrongNotSamePassword) };
    if (password.length < 7 || !isValid || passwordVerify !== password || name.length < 2) return false;
    return true;
  }

  const handleCreateUser = async () => {
    const ok = verifyStates();
    if (ok) {
      const response = await fetchApiProcess("POST", '/api/users', {
        "name": name,
        "email": email,
        "password": password,
      }, {})
      if(Object.keys(response).includes('message') && response.message.includes('email already registered on DB')) return setShowWarningEmailRegistered(true)
      if(!Object.keys(response).includes('message')) setShowWarningEmailRegistered(false)
      if (Object.keys(response).includes('id')) return history.push('/')
    }
  }

  return (
    <div>
      <div>
        {showWarningName && returnWarning('Nome precisa ter até 3 caractéres', showWarningName)}
        <input placeholder='Nome de usuário:' value={name} onChange={({ target }) => handleSetState(target.value, setName)} />
        {showWarningEmail && returnWarning('Insira um endereço de e-mail válido.', showWarningEmail)}
        <input placeholder='E-mail:' value={email} onChange={({ target }) => handleSetState(target.value, setEmail)} />
        {showWarningPassword && returnWarning('A senha deve ter no mínimo 6 dígitos.', showWarningPassword)}
        <input placeholder='Senha:' type='password' value={password} onChange={({ target }) => handleSetState(target.value, setPassword)} />
        {showWarningWrongNotSamePassword && returnWarning('A senhas devem se coincidir.', showWarningWrongNotSamePassword)}
        <input placeholder='Senha confirmada:' type='password' value={passwordVerify} onChange={({ target }) => handleSetState(target.value, setPasswordVerify)} />
        {showWarningEmailRegistered && returnWarning('E-mail já registrado.', showWarningEmailRegistered)}
        <button type='button' onClick={handleCreateUser}>Create account</button>
      </div>
    </div>
  )
}
