import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from './components/Pages/Main/Main';
import MyWallet from './components/Pages/Main/MyWallet/MyWallet';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route
            path="my-wallet"
            element={<MyWallet />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
