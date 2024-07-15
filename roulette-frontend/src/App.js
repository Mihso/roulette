import logo from './logo.svg';
import './App.css';
import Home from './home';
import SignupPage from './signUp';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/signUp' element={<SignupPage />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
