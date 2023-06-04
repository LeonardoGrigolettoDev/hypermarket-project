import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login';
import Stats from './pages/Stats';
import Storage from './pages/Storage';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Route exact path='/' component={Login} />
      <Route path='/stats' component={Stats} />
      <Route path='/storage' component={Storage} />
      <Route path='/register' component={Register} />
    </BrowserRouter>
  );
}

export default App;
