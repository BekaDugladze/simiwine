import logo from '../logo.png';
import { useLocation } from 'react-router';
import { Link } from 'react-router'
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faClose, faLanguage } from '@fortawesome/free-solid-svg-icons';
import { translations } from '../translations/header';

export function Header(){
    const [open, setOpen] = useState(false);
    const [onMouseOver, setOnMouseOver] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        // detect screen width
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const location = useLocation();
    
    // detect prefix from current URL
    const getLocalePrefix = () => {
        if (location.pathname === "/" || location.pathname.startsWith("/GE")) return "/GE";
        if (location.pathname.startsWith("/EN")) return "/EN";
        if (location.pathname.startsWith("/RU")) return "/RU";
        // fallback
        return "/GE";
    };

    // Function to get new path with different language prefix
    const getPathWithLanguage = (lang) => {
        const currentPath = location.pathname;
        // Remove existing language prefix (format /XX/path or just /XX or /)
        let pathWithoutLang = currentPath.replace(/^\/[A-Z]{2}(\/|$)/, '/');
        
        // Handle root path case
        if (pathWithoutLang === '/' || pathWithoutLang === '') {
            return `/${lang}`;
        }
        
        // Add new language prefix
        return `/${lang}${pathWithoutLang}`;
    };

    const prefix = getLocalePrefix();
    
    const locale = prefix.replace("/", ""); // e.g. "/GE" -> "GE"
    const t = translations[locale] || translations.GE; // fallback

    return(
        <header className='p-1 flex md:h-auto h-auto fixed top-0 left-0 right-0 bg-white shadow w-full justify-around items-center z-20 marcellus-regular md:flex-row flex-col'>
            {/* Logo and Mobile Menu Button Row */}
            <div className='w-full flex flex-row justify-between items-center md:w-auto'>
                <div className='mx-12 flex flex-row items-center justify-center'>
                    <a href='#' className='rounded-full'>
                        <img className='rounded-full' src={logo} alt='simi, wine, georgian wine' width={80} height={80}/>
                    </a>
                </div>
                
                {/* Mobile Menu Toggle Button */}
                <button 
                    className='md:hidden visible mr-4'
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? (
                        <FontAwesomeIcon icon={faClose}  alt='close'/>
                    ) : (
                        <FontAwesomeIcon icon={faBars} alt='Menu'/>
                    )}
                </button>
            </div>

            {/* Navigation Menu - Hidden on mobile unless menuOpen is true */}
            <div className={`
                flex items-center justify-around w-full md:h-auto h-full transition-all duration-300
                ${isMobile ? (menuOpen ? ' flex flex-col max-h-96 opacity-100' 
                : ' flex flex-col max-h-0 opacity-0') : 'flex flex-row max-h-none opacity-100'} overflow-hidden`}
                style={{transition: '1s'}}>
                <nav className='w-full'>
                    <ul className={`flex items-center justify-center ${isMobile ? 'flex-col' : 'flex-row'}`}>
                        <li className='headerLi'>
                            <Link 
                                onMouseOver={() => setOnMouseOver('home')} 
                                onMouseOut={() => setOnMouseOver(false)} 
                                style={{color: onMouseOver === 'home'? '#C02337' : '#191919'}} 
                                to={`${prefix}`}
                                className="block p-2"
                            >
                                {t.home}
                            </Link>
                        </li>
                        <li className='headerLi'>
                            <Link 
                                onMouseOver={() => setOnMouseOver('about')} 
                                onMouseOut={() => setOnMouseOver(false)} 
                                style={{color: onMouseOver === 'about' ? '#C02337' : '#191919'}} 
                                to={`${prefix}/about`}
                                className="block p-2"
                            >
                                {t.about}
                            </Link>
                        </li>
                        <li className='headerLi'>
                            <Link 
                                onMouseOver={() => setOnMouseOver('product')} 
                                onMouseOut={() => setOnMouseOver(false)} 
                                style={{color: onMouseOver === 'product' ? '#C02337' : '#191919'}} 
                                to={`${prefix}/products`}
                                className="block p-2"
                            >
                                {t.product}
                            </Link>
                        </li>
                        <li className='headerLi'>
                            <a
                                onMouseOver={() => setOnMouseOver('contact')}
                                onMouseOut={() => setOnMouseOver(false)}
                                style={{ color: onMouseOver === 'contact' ? '#C02337' : '#191919' }}
                                href={`#footer`}
                                className="block p-2"
                            >
                                {t.contact}
                            </a>
                        </li>
                    </ul>
                </nav>
                
                {/* Language Selector */}
                <div className={`flex justify-center items-center mt-5 md:mt-0 ${isMobile ? 'flex-col' : 'flex-row'}`}>
                    <button
                        onMouseOver={!isMobile ? () => {setOnMouseOver('lang'); setOpen(true)} : undefined}
                        onMouseOut={!isMobile ? () => {setOnMouseOver(false); setOpen(false)} : undefined}
                        style={{color: onMouseOver === 'lang'? '#C02337' : '#191919'}} 
                        className="mx-2 my-0 flex flex-col justify-center items-center"
                        onClick={isMobile ? () => setOpen(!open) : undefined}
                    >
                        <FontAwesomeIcon icon={faLanguage} />
                        <span className='text-xs'>LANG</span>
                    </button>

                    <div
                        className={`md:absolute md:top-3/4 flex flex-col justify-center items-center 
                            transition-all duration-300 ease-in-out overflow-hidden md:bg-white md:border-t-2 md:border-red-800
                            ${open ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}     
                        onMouseOver={!isMobile ? () => { setOpen(true)} : undefined}
                        onMouseOut={!isMobile ? () => {setOpen(false)} : undefined}
                    >
                        <Link 
                            onMouseOver={() => setOnMouseOver('ge')} 
                            onMouseOut={() => setOnMouseOver(false)} 
                            style={{color: onMouseOver === 'ge'? '#C02337' : '#191919'}} 
                            to={getPathWithLanguage('GE')}
                            className="mx-2 p-1"
                        >
                            GE
                        </Link>
                        <Link 
                            onMouseOver={() => setOnMouseOver('en')} 
                            onMouseOut={() => setOnMouseOver(false)} 
                            style={{color: onMouseOver === 'en'? '#C02337' : '#191919'}} 
                            to={getPathWithLanguage('EN')}
                            className="mx-2 p-1"
                        >
                            EN
                        </Link>
                        <Link 
                            onMouseOver={() => setOnMouseOver('ru')} 
                            onMouseOut={() => setOnMouseOver(false)} 
                            style={{color: onMouseOver === 'ru'? '#C02337' : '#191919'}} 
                            to={getPathWithLanguage('RU')}
                            className="mx-2 p-1"
                        >
                            RU
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}