import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import Navbar from './Components/Navbar';
import Dashboard from './Components/Dashboard';
import UpdateForm from './Components/UpdateForm';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<SignIn />}></Route>
        <Route path='/signin' element={<SignIn />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/update/:id' element={<UpdateForm/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
