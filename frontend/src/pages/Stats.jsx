import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { tokenRedirect, fetchApiProcess } from './utils';
import { addTokenAction } from '../redux/action';
import LoadingComponent from '../components/LoadingComponent';
// import * as jwt from 'jsonwebtoken';


function Stats(props) {
  const [apiResponse, setApiResponse] = useState('');
  const [userResponse, setUserResponse] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { token, history, setToken } = props;

  useEffect(() => {
    setIsLoading(true);
    (!token.token) && tokenRedirect(token, history, setToken)
    const initialFetch = async () => {
      const responseSells = await fetch('http://localhost:3002/api/sells', {
        method: "GET",
        url: 'http://localhost:3002/api/sells',
        headers: { "Content-Type": "application/json", "authorization": token.token || JSON.parse(localStorage.getItem("token")).token },
      })
      setApiResponse(await responseSells.json());
    }
    const fetchUser = async () => {
      const responseUser = await fetch(`http://localhost:3002/api/users/1`, {
        method: "GET",
        url: 'http://localhost:3002/api/users/1',
        headers: { "Content-Type": "application/json", "authorization": token.token || JSON.parse(localStorage.getItem("token")).token },
      })
      const { id, name, email } = await responseUser.json();
      setUserResponse({ id, name, email });
    }
    initialFetch();
    fetchUser();
    setIsLoading(false)
    console.log(isLoading);
  }, [history, isLoading, setToken, token, token.token]);
  return (
    <div>
      {isLoading ? <LoadingComponent /> :
        <div>
          <h1>Ei {userResponse.name}! Aqui estão as estastísticas de sua empresa.</h1>
          <p>Vendas totais: {apiResponse.length}</p>
        </div>
        }
    </div>
  )
}

const mapStateToProps = (state) => ({
  token: state.token
})

const mapDispatchToProps = (dispatch) => ({
  setToken: (value) => dispatch(addTokenAction(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Stats);