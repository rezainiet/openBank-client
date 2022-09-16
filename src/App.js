import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from './components/Pages/Main/Main';
import MyWallet from './components/Pages/Main/MyWallet/MyWallet';
import RequireAuth from './components/Pages/Auth/RequireAuth/RequireAuth';
import Login from './components/Pages/Auth/Login';
import Register from './components/Pages/Auth/Register';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path="/" element={<RequireAuth>
          <Main></Main>
        </RequireAuth>}>
          <Route index element={<MyWallet />}></Route>
          <Route path='my-wallet' element={<MyWallet />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
