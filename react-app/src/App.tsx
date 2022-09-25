import React from 'react';
import './App.css';
import Header from 'components/header/header';
import Footer from 'components/footer/footer';
import About from 'components/pages/about/about';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Page404 from 'components/pages/404/404';
import Home from 'components/pages/home/home';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
