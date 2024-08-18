
import './App.css';
import { Routes, Route } from 'react-router-dom';
import AdminLogin from './Components/AdminLogin';
import DashBoard from './Components/DashBoard';
import Pilots from './Components/Pilots';

function App() {
  return (
    <div >
      <Routes>
      <Route path="" element={<AdminLogin />} />
      <Route path="/dashboard/*" element={<DashBoard />} />
      
    
     
    </Routes>
    </div>
  );
}

export default App;
