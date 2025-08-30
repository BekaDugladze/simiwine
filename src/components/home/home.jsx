import React, { useState, useEffect, } from 'react';
import fbBackground from '../../fbCover.jpg';
import video from '../../backVideo.mp4';
import { homeTranslations } from '../../translations/home';
import { useLocation } from 'react-router';
import About from '../about';
import footerimg from '../../footer.jpg';
import Latest from './latest';

const Home = () => {
    const location = useLocation();
    const lang = location.pathname.split("/")[1] || "GE";
    const t = homeTranslations[lang] || homeTranslations["GE"];

    const [videoLoaded, setVideoLoaded] = useState(false);
    const [videoError, setVideoError] = useState(false);
    const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
    const [animationClass, setAnimationClass] = useState('');
    const [isMobile, setIsMobile] = useState(false);


    useEffect(() => {
        // detect screen width
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        // Delay video loading slightly to improve initial page load
        const timer = setTimeout(() => setShouldLoadVideo(true), 100);
        return () => clearTimeout(timer);
    }, []);
     // Animation cycle for content every 5 seconds
    useEffect(() => {
        const animations = [
            'zoom-in',
            'fade-pulse',
            'slide-in-up',
            'bounce-in'
        ];

        let currentIndex = 0;

        const animateContent = () => {
            setAnimationClass(animations[currentIndex]);
            currentIndex = (currentIndex + 1) % animations.length;
        };

        // Start first animation after a short delay
        const initialTimer = setTimeout(animateContent, 1000);

        // Continue every 5 seconds
        const interval = setInterval(animateContent, 5000);

        return () => {
            clearTimeout(initialTimer);
            clearInterval(interval);
        };
    }, []);

  const containerStyle = {
    width: '100%',
    height: '100vh', // Use viewport height instead of 100%
    display: 'flex',
    justifyContent: isMobile ? 'center' : 'flex-end',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 1)',
  };

  const videoStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '100%',
    minHeight: '100%',
    width: 'auto',
    height: 'auto',
    objectFit: 'cover',
    zIndex: 0,
    opacity: 0.5
  };

  const fallbackStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: `url(${fbBackground}) center/cover no-repeat`,
    zIndex: 0,
    opacity: 0.5
  };

  const contentStyle = {
        position: 'relative',
        zIndex: 10,
        color: 'white',
        padding: '10px',
        width: '100%',
        display: 'flex',
        justifyContent: isMobile ? 'center' : 'flex-end',
        alignItems: isMobile ? 'center' : 'flex-end',
        flexDirection: 'column',
        maxWidth: '800px',
        textAlign: isMobile ? 'center' : 'right',
  };
 
  //return here

  return (
    <>
        <div style={containerStyle}>
        {isMobile ? (
        <>{/* Fallback background image */}
        {(!videoLoaded || videoError) && (
            <div style={fallbackStyle} aria-hidden="true" />
        )}
        {/* Video background */}
        {shouldLoadVideo && (
            <video
            style={videoStyle}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Background video of church"
            onLoadedData={() => setVideoLoaded(true)}
            onError={() => setVideoError(true)}
            onCanPlay={() => setVideoLoaded(true)}
            >
            <source src={video} type="video/mp4" />
            {/* Fallback message */}
            Your browser doesn't support video playback.
            </video>
        )}
        {/* Loading indicator */}
        {shouldLoadVideo && !videoLoaded && !videoError && (
            <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            zIndex: 5
            }}>
            Loading...
            </div>
        )}
        </>
        ) : (
        <div className={`${animationClass}`} style={fallbackStyle} aria-hidden="true" />
        )}

        {/* Main content */}
        <div style={{ ...contentStyle, overflow: 'hidden' }}>
            <h1 className='animate__animated animate__fadeInDown duration-100 text-2xl niconne-regular my-3 font-extrabold hover:text-red-700 cursor-default'
            style={{ 
            textShadow: '2px 2px 4px rgba(0,0,0,0.7)'}}>
                {t.welcome}
            </h1>
            <p className='animate__animated animate__fadeInRight duration-100 text-xl marcellus-regular my-3 cursor-default'
            style={{
            textShadow: '2px 2px 4px rgba(0,0,0,0.7)'}}>
                {t.description}
            </p>
            <div className='flex flex-col sm:flex-row justify-center items-center mt-4 space-y-2 sm:space-y-0 sm:space-x-4
            animate__animated animate__fadeInUp'>
                <a 
                    href="#products" 
                    className=" bg-red-800 hover:bg-white text-white hover:text-red-800
                    font-bold py-2 px-4 rounded transition-colors duration-300"
                >
                    {t.homeBut}
                </a>
                <a 
                    href="#about" 
                    className="  bg-white hover:bg-red-800 hover:text-white text-red-800 
                    font-bold py-2 px-4 rounded transition-colors duration-300"
                >
                    {t.homeBut2}
                </a>
            </div>
        </div>
        </div>
        <section id="about"
        className='p-10'
        style={{
            background: `url(${footerimg}) center/cover no-repeat`,
        }}>
            <About />
        </section>
        <section id="products"
        className='bg-black'>
            <Latest />
        </section>
    </>
  );
};

export default Home;