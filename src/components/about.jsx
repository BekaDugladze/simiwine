import { useLocation } from "react-router";
import { aboutTranslations } from "../translations/about";
import aboutImg from '../aboutImg.jpg';
import { useState, useEffect} from "react";

const About = () => {
    const location = useLocation();
    const lang = location.pathname.split("/")[1] || "GE";
    const t = aboutTranslations[lang] || aboutTranslations["GE"];

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

    return (
        <div className="flex flex-col items-center text-center marcellus-regular  ">
            <h1 className="niconne-regular text-2xl text-red-800 hover:text-black my-2 animate__flipInX  animate__animated" >{t.title}</h1>
            <div className="flex flex-row md:my-5 my-2">
                <div className="md:p-8 p-3 animate__bounceInLeft animate__animated ">
                    <p className="text-justify ">{t.description}</p>
                    <p className="text-left mt-4">{t.phone} 
                        <a className="text-red-800" href="tel:+995592292828">+995 592 292 828</a>
                    </p>
                    <p className="text-left mt-2">{t.email} 
                        <a className="text-red-800" href="mailto:info@simiwine.com">info@simiwine.com</a>
                    </p>
                </div>
                {!isMobile && (<img src={aboutImg} alt="About" className="mt-4 rounded-lg shadow-lg animate__animated animate__bounceInRight" width={300} height={300} />)}
            </div>
        </div>
    );
};

export default About;