import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Stats from './pages/Stats';
import Storage from './pages/Storage';
import Register from './pages/Register';

function App() {
  return (
    <Switch>
      <Route exact path='/' render={(props) => <Login {...props} />} />
      <Route exact path='/stats' render={(props) => <Stats {...props}/>} />
      <Route exact path='/storage' render={(props) => <Storage {...props}/>} />
      <Route exact path='/register' render={(props) => <Register {...props}/>} />
    </Switch>
  );
}

export default App;
