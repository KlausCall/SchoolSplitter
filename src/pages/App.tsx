import React from 'react';
import Footer from '../modules/Footer';
import Input from '../modules/Input';
import Navbar from '../modules/Navbar';
import './App.css';

const App: React.FC<{}> = () => (
  <>
    <Navbar />
    <Input />
    <Footer />
  </>
);

export default App;
