import { latestTranslations } from "../translations/latest"
import { useLocation } from "react-router"
import footer from '../footer.jpg'
export default function Product() {
    const location = useLocation();
    const lang = location.pathname.split("/")[1] || "GE";
    const t = latestTranslations[lang] || latestTranslations["GE"];

    return(
    <section className="py-24 px-10" style={{backgroundImage: `url(${footer})`, backgroundSize: 'cover'}}>
    <h1 className="text-2xl text-center my-10 niconne-regular text-red-800 hover:text-black">{t.title}</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-center">{/* Changed to items-stretch */}
        {t.products.map(e => (
        <div className="flex flex-col border-2 border-red-900 rounded-2xl justify-center items-center m-3 p-3
        h-full min-h-0 space-y-3 animate__animated animate__flipInY"
        key={e.id}>
            <img src={e.src} alt={e.title} width={50} height={50}
            style={{height: '50%'}}/>
            <div className="flex flex-col justify-center items-center">
                <h2 className="text-center text-xl text-red-900 niconne-regular">{e.title}</h2>
                <p className="text-justify mt-2 marcellus-regular">{e.description}</p>
                <a href='#footer'
                className="mt-3 bg-red-900 text-white hover:bg-red-100 hover:text-red-900 px-3 py-1 rounded-2xl">{t.contact}</a>
            </div>
        </div>))}
    </div>
</section>
    )
}