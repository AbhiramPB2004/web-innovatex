import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Dashboard from './Components/Dashboard';
import About from './Components/About';
import Events from './Components/Events';
import Contact from './Components/Contact';
import Profile from './Components/Profile';



function App() {
  return (
    
    <Router>
      <AppContent />
      
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
      </Routes>
      {location.pathname !== "/profile" && location.pathname !== "/" && (
        <>
          <div id="dashboard"><Dashboard /></div>
       
          <div >asdui</div>
          <div id="events"><Events /></div>
          <div id="contact"><Contact /></div>
        </>
      )}
    </>
  );
}

export default App;