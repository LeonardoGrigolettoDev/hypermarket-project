import React, { useState} from 'react'
import { returnWarning, handleSetState, fetchApiProcess } from './utils'

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [rememberMe, setRememberMe] = useState(false);
  const [showWarningEmail, setShowWarningEmail] = useState(false);
  const [showWarningPassword, setShowWarningPassword] = useState(false);
  const [showWarningWrongEmailOrPassword, setShowWarningWrongEmailOrPassword] = useState(false);
  return (
    <div>
      <div>
        <input placeholder='Nome de usuário:'/>
        {showWarningEmail && returnWarning('Insira um endereço de e-mail válido.', showWarningEmail)}
        <input placeholder='E-mail:' value={email} onChange={({ target }) => handleSetState(target.value, setEmail)} />
        {showWarningPassword && returnWarning('A senha deve ser informada.', showWarningPassword)}
        <input placeholder='Senha:' type='password' value={password} onChange={({ target }) => handleSetState(target.value, setPassword)} />
        <input placeholder='Senha confirmada:'/>
        <button type='button' onClick={''}>LogIn</button>
        <a href='/register'>Ainda não possui conta? Clique aqui!</a>
      </div>
    </div>
  )
}
