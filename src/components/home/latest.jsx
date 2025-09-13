import { useState, useEffect } from 'react';
import gpt2 from '../../back2.jpg';
import { Link } from 'react-router';
import { useLocation } from 'react-router';
import { latestTranslations as translations } from '../../translations/latest';

export default function Latest() {
  const location = useLocation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);

  // detect prefix from current URL
  const getLocalePrefix = () => {
    if (location.pathname === "/" || location.pathname.startsWith("/GE")) return "/GE";
    if (location.pathname.startsWith("/EN")) return "/EN";
    if (location.pathname.startsWith("/RU")) return "/RU";
    // fallback
    return "/GE";
  };
  
  const prefix = getLocalePrefix();
  const lang = location.pathname.split("/")[1] || "GE";
  const t = translations[lang] || translations["GE"];

  // Auto-advance slideshow every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => {
        const newSlide = (prev + 1) % t.products.length;
        setAnimationKey(key => key + 1); // Trigger animation
        return newSlide;
      });
    }, 7000);

    return () => clearInterval(interval);
  }, [t.products.length]);

  // Function to change slide with animation reset
  const changeSlide = (newSlide) => {
    setCurrentSlide(newSlide);
    setAnimationKey(prev => prev + 1); // Force re-render animation
  };

  // Manual navigation functions
  const goToPrevious = () => {
    const newSlide = currentSlide === 0 ? t.products.length - 1 : currentSlide - 1;
    changeSlide(newSlide);
  };

  const goToNext = () => {
    const newSlide = (currentSlide + 1) % t.products.length;
    changeSlide(newSlide);
  };

  const currentProduct = t.products[currentSlide];

  return (
    <section 
      className="flex flex-col w-full items-center justify-center py-20 text-white overflow-hidden"
      style={{
        background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${gpt2}) center/cover no-repeat`,
        minHeight: '100vh'
      }}
    >
      <h2 className='text-2xl font-bold niconne-regular hover:text-red-800'>{t.title}</h2>
      
      <div className="flex flex-row items-center justify-center my-5 relative w-full "
        >
        {/* Previous Button */}
        <button 
          onClick={goToPrevious}
          className="absolute left-6 z-10 bg-red-800 hover:bg-red-600 text-white p-2 rounded-full transition-colors duration-300"
          aria-label="Previous wine"
        >
          ←
        </button>

        {/* Main Content */}
        <div className="flex md:flex-row flex-col items-center m-5 w-3/4 justify-center space-y-5 md:space-y-0 md:space-x-10" 
            key={animationKey} // key to reset animation
          >
          <img 
            src={currentProduct.src} 
            alt={currentProduct.title} 
            width={100}
            height={100}
            className='rounded-xl shadow-lg transition-opacity duration-500 animate__animated animate__fadeInLeft'
            style={{
              maxHeight: '500px',
              maxWidth: '300px',
            }}
          />
          
          <div className='mx-5 flex flex-col justify-center items-center space-y-7 ' 
            >
            <h3 className='marcellus-regular text-2xl font-semibold animate__animated animate__fadeInDown'>
              {currentProduct.title}
            </h3>
            <p className='marcellus-regular text-center max-w-md animate__animated animate__fadeInRight'>
              {currentProduct.description}
            </p>
            <Link 
              to={`${prefix}/products`} 
              className="bg-red-800 hover:bg-white text-white hover:text-red-800 font-bold py-2 
              px-4 rounded transition-colors duration-300 w-auto animate__animated animate__fadeInUp"
            >
              {t.button}
            </Link>
          </div>
        </div>

        {/* Next Button */}
        <button 
          onClick={goToNext}
          className="absolute right-6 z-10 bg-red-800 hover:bg-red-600 text-white p-2 rounded-full transition-colors duration-300"
          aria-label="Next wine"
        >
          →
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="flex space-x-2 mt-4">
        {t.products.map((_, index) => (
          <button
            key={index}
            onClick={() => changeSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-red-900 hover:bg-red-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}