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
         
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
