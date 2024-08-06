
import './App.css';
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import 'react-toastify/dist/ReactToastify.css';



//lazy loading components

const Home = lazy(() => import('./Components/Home'));
const About = lazy(() => import('./Components/About'));
const Product11Lquad = lazy(() => import('./Components/Product11Lquad'));
const Product11Lhexa = lazy(() => import('./Components/Product11Lhexa'));
const Services = lazy(() => import('./Components/Services'));
const Gallery = lazy(()=> import('./Components/Gallery'));
const Contact = lazy(() => import('./Components/Contact'));
const Faq = lazy(() => import('./Components/Faq'));
const Booknow= lazy(() => import('./Components/Booknow'));



function App() {
  return (
    <Router>
      <NavBar />
      <div >
       <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path='/products/11l-quad' element={<Product11Lquad/>}/>
          <Route path='/products/11l-hexa' element={<Product11Lhexa/>}/>
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery/>} />
          <Route path="/contactus" element={<Contact />} />
          <Route path='/faq' element ={<Faq/>}/>
          <Route path='/booknow' element ={<Booknow/>}/>
        </Routes>
       </Suspense> 
       
      </div>
      <Footer />
    </Router>
  );
}

export default App;
