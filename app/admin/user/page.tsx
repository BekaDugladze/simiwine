'use client'
 
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Detailed } from '@/components/admin/mshromeli'
import Image from 'next/image'
import logo from '@/app/favicon.ico'
 
export default function ItemEditor() {
  const [loading, setLoading] = useState(false);
  const [admin, setAdmin] = useState('')

  const searchParams = useSearchParams()
  const router = useRouter()
 
  const id = searchParams.get('pn')
  const [item, setItem] = useState({})

  const getAdmin = async() => {
    try{
      const connect = await fetch('/api/login', {
        method: 'GET',
        credentials: 'include'
      })

      if (connect.ok) {
        const data = await connect.json()
        console.log(data)
        setAdmin(data)
      }
      else setAdmin('')
    }
    catch(err: any){
      throw new Error(err)
    }
  }

  useEffect(() => {
    getAdmin()
  }, [])

  const getItem = async () => {
    setLoading(true)
    try{
        if(id !== null){
            const getItemInfo = await fetch('/api/mshromeli/user', {
                method: 'POST',
                credentials: 'include',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({
                  pn: id
                })
            })

            if (getItemInfo){
                const data = await getItemInfo.json();
                setItem(data)
                setLoading(false)
            }
            else{
                router.push('/not-found')
                setLoading(false)
            }  
        }
    }
    catch(err: any){
        throw new Error(err.message)
    }
  }

  useEffect(() => {
    getItem()
  }, [])
  return(
    <section className='flex flex-col justify-center items-center'>
      {loading ? <div className='flex w-screen h-screen justify-center items-center'><h1>Loading...</h1></div>
      :
      <>
        <header className="flex flex-row justify-center items-center">
          <a className='flex flex-row justify-center items-center w-fit' href='https://zrunva.org'>
            <Image className='m-3' src={logo} alt='zrunva.org' width='70' height='50'/>
            <h1 className='m-3' style={{fontFamily: 'nino', fontSize: '20px'}}>ძიძების და საოჯახო მშრომელების ასოციაცია</h1>          
          </a>
        </header>
          {Object.keys(item).length > 0 && <Detailed item={item} admin={admin}/> }
      </>
      }
    </section>
  )
}