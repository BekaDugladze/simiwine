import Image from "next/image"
import logo from '@/app/favicon.ico'

export default function() {
    return(
        <section>    
            <header className="flex flex-row justify-center items-center">
                <a className='flex flex-row justify-center items-center w-fit' href='https://zrunva.org'>
                <Image className='m-3' src={logo} alt='zrunva.org' width='70' height='50'/>
                <h1 className='m-3' style={{fontFamily: 'nino', fontSize: '20px'}}>ძიძების და საოჯახო მშრომელების ასოციაცია</h1>          
                </a>
            </header>
            <h1 className="text-center my-5 text-xl">თქვენი აპლიკაცია მიღებულია! მადლობას გიხდით დაინტერესებისთვის!</h1>
        </section>
    )
}