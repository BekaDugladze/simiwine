'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Dasaqmebuli from '@/components/admin/others/dasaqmebuli'

export default function() {
    const [filter, setFilter] = useState({})
    const [loading, setLoading] = useState(true)
    const [admin, setAdmin] = useState('')
    const router = useRouter()
    
    const handleFilter = (e:any) => {
        const { name, value } = e.target;
        setFilter(prevFilter => ({
            ...prevFilter,
            [name]: value
        }));
    }

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
        catch(err : any) {
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
        catch(err:any){
            throw new Error(err)
        }
    }
    useEffect(() => {
        check()
    },[])
    return(
        <>
        {loading ? <h1>Loading...</h1> :
        <section>
            <header className="flex flex-row items-center  overflow-x-auto filterHeader">
                <div className="flex flex-col">
                    <label htmlFor="name">სახელი, გვარი</label>
                    <input type="text" name="name" onChange={handleFilter} />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="pn">პ/ნ ან ოჯახის ID</label>
                    <input type="text" name="pn" onChange={handleFilter} />
                </div>
                <button className="bg-red-800 text-white rounded-xl w-fit px-3 py-1" onClick={() => {
                    setFilter({})
                }}>Clear All</button>
            </header>
            <div className="flex flex-row justify-between px-10">
                <Link href={`/admin/profile?username=${admin}`}>Profile: {admin}</Link>
                <Link href={'/admin/worked'}>დასაქმებული</Link>
                <Link href={'/admin'}>მთავარი გვერდი</Link>
                <button className="text-red-800" onClick={logout}>Logout</button>
            </div>
            <div className="mainer">
            <Dasaqmebuli admin={admin}  filter={filter}/>
            </div>
        </section>
    }
    </>
    )
}