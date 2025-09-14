'use client'
import Image from "next/image"
import logo from '@/app/favicon.ico'
import { useRef } from "react"
import { useRouter } from "next/navigation"

export default function Login(){
    const passRef = useRef(null)
    const userRef = useRef(null)
    const router = useRouter()

    const login = async (e) => {
        e.preventDefault();
        try {
            const connect = await fetch('/api/login', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    pass: passRef.current.value,
                    user: userRef.current.value
                })
            });
            if (connect.ok) {
                router.push('/admin');
            } else {
                alert('მომხმარებელი ან პაროლი არასწორია');
            }
        } catch (err) {
            console.error(err);
            throw new Error(err.message);
        }
    };
    return(
        <div className="flex flex-col justify-around items-center ">
            <header className="bg-white mb-10" style={{borderRadius: '0 0 25px 25px'}}>
                <a className='flex flex-row justify-center items-center' href='https://zrunva.org'>
                <Image className='m-3' src={logo} alt='zrunva.org' width='70' />
                <h1 className='m-3' style={{fontFamily: 'nino', fontSize: '20px', color: '#2b4a23'}}>ზრუნვის შრომა</h1>          </a>
            </header>
            <h1 style={{margin: '30px 0', fontSize: '25px', color: 'white', fontWeight: 'bold'}}>ადმინისტრაცია</h1>
            <form className="flex flex-col items-center justify-center my-10" 
            style={{borderRadius: '25px', background: 'white', padding: '10px 30px'}} 
            onSubmit={login}>
                <label htmlFor="user">User</label>
                <input className="mb-5 rounded-xl outline-none px-2" style={{border: '1px solid black'}} id="user" type="text" ref={userRef} required/>
                <label htmlFor="pass">Password</label>
                <input className="mb-5 rounded-xl outline-none px-2" style={{border: '1px solid black'}} id="pass" type="password" ref={passRef} required/>
                <input type="submit" style={{
                    border: '1px solid black',
                        background: 'white',
                        padding:'3px 9px',
                        borderRadius: '25px',
                        margin: '10px 0',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        width: 'fit-content'
                        }} 
                        value="LogIn" />
            </form>
        </div>
    )
}