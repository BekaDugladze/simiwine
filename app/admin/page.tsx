'use client'
import { useEffect, useState } from "react";
import Mshromeli from '@/components/admin/mshromeli'
import Ojaxi from '@/components/admin/ojaxi'
import { useRouter } from "next/navigation";
import Link from "next/link";
import Head from "next/head";

const Page = () => {
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
                    <label htmlFor="name">სახელი</label>
                    <input type="text" name="name" onChange={handleFilter} />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="name">გვარი</label>
                    <input type="text" name="gvari" onChange={handleFilter} />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="pn">პ/ნ ან ოჯახის ID</label>
                    <input type="text" name="pn" onChange={handleFilter} />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="pn">მობილურის ნომერი</label>
                    <input type="text" name="mobiluri" onChange={handleFilter} />
                </div>
                <select name='qalaqi' onChange={handleFilter}>
                    <option value=''>ქალაქი</option>
                    <option value='თბილისი'>თბილისი</option>
                    <option value='რუსთავი'>რუსთავი</option>
                    <option value='ქუთაისი'>ქუთაისი</option>
                    <option value='ბათუმი'>ბათუმი</option>
                    <option value='ფოთი'>ფოთი</option>
                    <option value='ოზურგეთი'>ოზურგეთი</option>
                    <option value='ზუგდიდი'>ზუგდიდი</option>
                    <option value='თელავი'>თელავი</option>
                    <option value='მცხეთა'>მცხეთა</option>
                </select>
                <div className="flex flex-col">
                    <label htmlFor="ubani">უბანი</label>
                    <input type="text" name="ubani" onChange={handleFilter} />
                </div>
                <select name="ganatleba" onChange={handleFilter}>
                    <option value="">განათლება</option>
                    <option value='საშუალო'>საშუალო</option>
                    <option value='პროფესიული'>პროფესიული</option>
                    <option value='ბაკალავრი'>ბაკალავრი</option>
                    <option value='მაგისტრი'>მაგისტრი</option>
                </select>
                <select name='profesia' onChange={handleFilter} >
                    <option value=''>პროფესია</option>
                    <option value='ექიმი'>ექიმი</option>
                    <option value='მასწავლებელი'>მასწავლებელი</option>
                    <option value='მზარეული'>მზარეული</option>
                    <option value='სოცმუშაკი'>სოც. მუშაკი</option>
                    <option value='სხვა'>სხვა</option>
                </select>
                <select name='vedzeb' onChange={handleFilter}>
                    <option value=''>ვაკანსია</option>
                    <option value='ძიძა'>ძიძა</option>
                    <option value='ძიძა და შეთავსებით დამხმარე'>ძიძა და შეთავსებით დამხმარე</option>
                    <option value='დამხმარე საოჯახო საქმეებში'>დამხმარე საოჯახო საქმეებში</option>
                    <option value='მომვლელი'>მომვლელი</option>
                    <option value='მზარეული'>მზარეული</option>
                    <option value='რეპეტიტორი'>რეპეტიტორი</option>
                    <option value='ექთანი'>ექთანი</option>
                    <option value='მძღოლი'>მძღოლი</option>
                    <option value='სხვა'>სხვა</option>
                </select>
                <select name='saati'  onChange={handleFilter} >
                    <option value=''>საათი</option>
                    <option value='4 საათი'>4 საათი</option>
                    <option value='5 საათი'>5 საათი</option>
                    <option value='6 საათი'>6 საათი</option>
                    <option value='7 საათი'>7 საათი</option>
                    <option value='8 საათი'>8 საათი</option>
                    <option value='9 საათი'>9 საათი</option>
                    <option value='10 საათი'>10 საათი</option>
                    <option value='11 საათი'>11 საათი</option>
                    <option value='12 საათი'>12 საათი</option>
                    <option value='24 საათი'>24 საათი</option>
                </select>
                <select name='dge'  onChange={handleFilter} >
                    <option value=''>დღე</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4 </option>
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                    <option value='7'>7</option>
                </select>
                <select name='dazgveva' onChange={handleFilter}>
                    <option value=''>დაზღვევა</option>
                    <option value='კი'>კი</option>
                    <option value=''>არა</option>
                </select>
                <select name='match' onChange={handleFilter}>
                    <option value=''>დაკავშირებული</option>
                    <option value={`null`}>არა</option>
                </select>
                <button className="bg-red-800 text-white rounded-xl w-fit" onClick={() => {
                    setFilter({})
                }}>Clear All</button>
            </header>
            <div className="flex flex-row justify-between px-10">
                <Link href={`/admin/profile?username=${admin}`}>პროფილი: {admin}</Link>
                <Link href={`/admin/worked`}>დასაქმებულები</Link>
                <Link href={'/admin/worked/others'}>სხვაგან დასაქმებული</Link>
                <button className="text-red-800" onClick={logout}>Logout</button>
            </div>
            <div className="mainer">
                <Ojaxi filter={filter} admin={admin}/>
                <Mshromeli filter={filter} admin={admin}/>
            </div>
        </section>
    }
    </>
    )
}


export default Page;