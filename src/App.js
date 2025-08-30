import './App.css';
import { Header } from './components/header';
import Product from './components/product';
import { useEffect } from 'react';
import Footer from './components/footer';
import { useLocation, BrowserRouter as Router, Route, Routes, Navigate } from "react-router"; // Changed this line
import { Suspense, lazy } from 'react';
import logo from './logo.png'


const Home = lazy(() => import('./components/home/home'));
const About = lazy(() => import('./components/about'));

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

function App() {
  return (
    <Router>
      <Header />
      <ScrollToTop />
      <Suspense fallback={
        <div className='fixed z-50 w-full h-full flex flex-col justify-center items-center bg-white overflow-hidden'>
          <img src={logo} alt='Simi Wine Logo' className='w-32' />
          <h1 className='text-2xl niconne-regular text-red-900'>Welcome to Simi Wine</h1>  
        </div>}
        >
        <Routes>
          <Route path='/' element={<Navigate to="/GE" />} />
          <Route path='/:lang' element={<div className='overflow-x-hidden'><Home /></div>} />
          <Route path='/:lang/about' element={<main className='md:py-20 py-24 px-10 overflow-hidden'><About /></main>} />
          <Route path='/:lang/products' element={<Product />} />
        </Routes>
      </Suspense>
      <Footer/>
    </Router>
  );
}

export default App;