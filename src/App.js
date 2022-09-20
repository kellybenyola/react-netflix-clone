import React from 'react';
import './App.css'

import NavBar from './components/Layout/NavBar/NavBar';
import Home from './pages/Home';
import TV from './pages/TV';
import {
  Routes,
  Route,
} from "react-router-dom";
import Footer from './components/Layout/Footer/Footer';

function App() {
  return (
    <>
      <NavBar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
          <Route path="tv" element={<TV />} />
      </Routes>
      <Footer />
      
      </>
  );
}

export default App;
