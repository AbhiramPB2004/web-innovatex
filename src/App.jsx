import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Dashboard from './Components/Dashboard';
import About from './Components/About';
import Events from './Components/Events';
import Contacts from './Components/Contacts';
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

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      {location.pathname !== "/profile" && location.pathname !== "/" && (
        <>
          <div id="dashboard"><Dashboard /></div>
          <div id="about"><About /></div>
          <div id="events"><Events /></div>
          <div id="contact"><Contacts /></div>
        </>
      )}
    </>
  );
}

export default App;