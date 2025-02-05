import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Dashboard from './Components/Dashboard';
import About from './Components/About';
import Events from './Components/Events';
import Contact from './Components/Contact';
import Profile from './Components/Profile';
import { useState } from 'react';



function App() {

  return (
    <Router>
      <Navbar />
      <Dashboard/>
      <About/>
      <Events/>
      <Contact/>
    </Router>
  );
}

export default App;