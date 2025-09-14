'use client'
import Image from "next/image"
import logo from '@/app/favicon.ico'
import { useSearchParams } from "next/navigation"
import { useState } from "react"

export default function() {
    const [copy, setCopy] = useState(false)
    const searchParams = useSearchParams();
    const id = searchParams.get('id')
    return(
        <section className="flex flex-col items-center">    
            <header className="flex flex-row justify-center items-center">
                <a className='flex flex-row justify-center items-center w-fit' href='https://zrunva.org'>
                <Image className='m-3' src={logo} alt='zrunva.org' width='70' height='50'/>
                <h1 className='m-3' style={{fontFamily: 'nino', fontSize: '20px'}}>ძიძების და საოჯახო მშრომელების ასოციაცია</h1>          
                </a> 
            </header>
            <h1 className="text-center my-5 text-xl">თქვენი აპლიკაცია მიღებულია! მადლობას გიხდით დაინტერესებისთვის!</h1>
            <button className="text-center" onClick={() => {
                navigator.clipboard.writeText(`https://zrunva.netlify.app/admin/user?pn=${id}`)
                setCopy(true)
                setTimeout(() => {setCopy(false)}, 2000)
            }}>დააკოპირეთ იუზერის მისამართი  
            {copy && <span style={{ marginLeft: '5px', color: 'green' }}>Copied!</span>}</button>
        </section>
    )
}