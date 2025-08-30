import React from "react";
import logo from '../logo.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { useLocation } from "react-router";
import { translations } from "../translations/footer";

const Footer = () => {
    const location = useLocation();
    const lang = location.pathname.split("/")[1] || "GE";
    const t = translations[lang] || translations["GE"];

    return (
        <footer id='footer' className="flex flex-col items-center bg-white shadow-md w-full marcellus-regular">
            <div className="flex flex-col items-center my-3">
                <img className='rounded-full' src={logo} alt="Simi Wine Logo" width={100} height={100} />
                <h1 className="niconne-regular text-3xl mt-1 text-red-800">Simi Wine</h1>
            </div>
            <div className="flex flex-col items-center my-3">
                <h2 className="text-l">{t.followUs}:</h2>
                <ul className="flex space-x-4 m-0">
                    <li><a href="https://www.facebook.com/profile.php?id=61575706387899" target="_blank" rel="noreferrer"
                    className="text-red-800"><FontAwesomeIcon icon={faFacebook} /> Facebook</a></li>
                    <li><a href="https://www.instagram.com/simiwine/" target="_blank" className="text-red-800"><FontAwesomeIcon icon={faInstagram} /> Instagram</a></li>
                </ul>
            </div>
            <div className="flex flex-col items-center my-3">
                <h2 className="text-l">{t.contactUs}</h2>
                <ul className="flex md:flex-row flex-col md:space-x-4 m-0">
                    <li>{t.phone} <a href="tel:+995592292828" className="text-red-800">+995 592 292 828</a></li>
                    <li>{t.email} <a href="mailto:info@simiwine.com" className="text-red-800">info@simiwine.com</a></li>
                    <li>{t.address} <a href="#" className="text-red-800">{t.city}</a></li>
                </ul>
            </div>
            <div className="container mx-auto text-center bg-red-900 text-white mt-3 py-4">
                <p>&copy; {new Date().getFullYear()} Created by Beka Dugladze. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
