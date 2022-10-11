import React from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import About from './components/pages/About/About';
import Page404 from './components/pages/Page404/Page404';
import Home from './components/pages/Home/Home';
import Form from './components/pages/Form/Form';

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/form" element={<Form />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
