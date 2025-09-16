import { useState } from 'react'

import './App.css'
import Header from './Components/Layout/Header';
import Footer from './Components/Layout/Footer';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import ProductDetails from './Components/Product/ProductDetails';
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} exact="true" />
        <Route path="/product/:id" element={<ProductDetails   />} exact="true" />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
