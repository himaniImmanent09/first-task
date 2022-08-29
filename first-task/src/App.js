import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import Navbar from './Components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<SignIn />}></Route>
        <Route path='signin' element={<SignIn />}></Route>
        <Route path='signup' element={<SignUp />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
