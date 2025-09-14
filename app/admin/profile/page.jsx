'use client'
import {useState, useEffect, useRef,} from 'react'
import { useSearchParams } from 'react-router-dom';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Profile() { 
    const [loading, setLoading] = useState(true)
    const [mloading, setMLoading] = useState(false)
    const [admin, setAdmin] = useState('')
    const [re, setRe] = useState('')
    const [newer, setNewer] = useState('')
    const [message, setMessage] = useState('')

    const router = useRouter()

    const check = async () => {
        try{
            const connect = await fetch('/api/login', {
                method: 'GET',
                credentials: 'include'
            })
            if(connect.ok) {
                setLoading(false);

                const data = await connect.json();
                setAdmin(data)
            }
            else router.push('/login')
        }
        catch(err) {
            throw new Error(err)
        }
    }

    const putPass = async (e) => {
        e.preventDefault();
        setMLoading(true);
        try{
            const connect = await fetch('/api/login', {
                method: 'PUT',
                credentials: 'include',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({
                    user: admin,
                    password: re,
                })
            })
            if(connect.ok){
                setMLoading(false);
                setMessage('წარმატებით განახლდა')
            }
            else{
                setMLoading(false);
                setMessage('მოხდა შეცდომა, სცადეთ ხელახლა')
            }
        }
        catch(err) {
            throw new Error(err)
        }
    }

    const logout = async () => {
        try{
            const connect = await fetch('/api/login', {
                method: 'DELETE',
                credentials: 'include'
            })
            if(connect.ok) {
                router.push('/login')
            }
        }
        catch(err){
            throw new Error(err)
        }
    }
    useEffect(() => {
        check()
    },[])
    return(
        <section className='flex flex-row w-full justify-center items-center h-screen'>
            {loading ? <h1>Loading...</h1>
            : 
            <div className='flex flex-col my-8'>
                <div className='flex flex-row justify-around'>
                    <Link href='/admin' className='mx-10'>ადმინის პანელზე დაბრუნება</Link>
                    <button onClick={logout} className='text-red-800 font-bold mx-10'>გასვლა</button>
                </div>
                <h1>თქვენ შესული ხართ, როგორც: {admin}</h1>
                <div>
                    <h2 className='my-5 text-center'>პაროლის შეცვლა</h2>
                    <form className='flex flex-col my-10' onSubmit={putPass}>
                        <label htmlFor='New'>ახალი პაროლი</label>
                        <input className='rounded-xl outline-none border-black'
                        style={{border: '1px solid black', padding: '3px 9px'}}
                        type='password' 
                        name='new' 
                        value={newer} 
                        onChange={(e) => {setNewer(e.target.value)}} 
                        id='New' 
                        required/>
                        <label htmlFor='Re'>გაიმეორეთ პაროლი</label>
                        <input className='rounded-xl outline-none '
                        style={{border: '1px solid black', padding: '3px 9px'}}
                        type='password' 
                        name='Re' 
                        value={re} 
                        onChange={(e) => {setRe(e.target.value)}} 
                        id='Re' 
                        required/>
                        {newer !== re && <p className='text-red-800'>პაროლები არ ემთხვევა ერთმანეთს</p>}
                        {!mloading && <input type='submit' value='შეცვალე პაროლი' 
                        style={{
                            background: 'white',
                            border: '1px solid black',
                            cursor: 'pointer',
                            borderRadius: '25px',
                            padding: '3px 9px',
                            margin: '10px 0'
                        }}
                        disabled={newer !== re || re === ''} />
                        }
                        <p>{message}</p>
                    </form>
                </div>
            </div>
            }
        </section>
    )
}