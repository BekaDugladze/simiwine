'use client'

import { useState } from "react"

export const OjaxiOther = (props) => {
    const [match, setMatch] = useState(false)
    const id = props.id

    const matchThem = async (e) => {
        e.preventDefault()
        try{
            const connect = await fetch('/api/match/other', {
                method: 'POST',
                credentials: 'include',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({
                    id: id,
                })
            })
            if (connect.ok) alert('დასაქმდა სხვაგან!')
                else alert('ინფორმაცია ვერ განახლდა, სცადეთ თავიდან!')
        }
        catch(err){
            throw new Error(err)
        }
    }
    
    return (
        <div>
            {!match ?
            <button 
            onClick={() => setMatch(true)}
            className='text-green-700 bg-white py-0 px-1 mx-1 rounded-xl my-6 text-center'
            style={{border: '1px solid green'}}>არააქტიური</button>
            : 
            <div className="flex flex-row my-6">
                <button 
                onClick={() => setMatch(false)}
                className="text-red-700 mx-3">უკან</button>
                <button 
                onClick={matchThem}
                className="text-green-700 mx-3">დადასტურება</button>
            </div>
            }
        </div>
    )
}
export const MshromeliOther = (props) => {
    const [match, setMatch] = useState(false)
    const id = props.id

    const matchThem = async (e) => {
        e.preventDefault()
        try{
            const connect = await fetch('/api/match/mshromeli', {
                method: 'POST',
                credentials: 'include',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({
                    id: id,
                })
            })
            if (connect.ok) alert('დასაქმდა სხვაგან!')
                else alert('ინფორმაცია ვერ განახლდა, სცადეთ თავიდან!')
        }
        catch(err){
            throw new Error(err)
        }
    }
    
    return (
        <div>
            {!match ?
            <button 
            onClick={() => setMatch(true)}
            className='text-green-700 bg-white py-0 px-1 mx-1 rounded-xl my-6 text-center'
            style={{border: '1px solid green'}}>სხვაგან დასაქმებული</button>
            : 
            <div className="flex flex-row my-6">
                <button 
                onClick={() => setMatch(false)}
                className="text-red-700 mx-3">უკან</button>
                <button 
                onClick={matchThem}
                className="text-green-700 mx-3">სხვაგან დასაქმება</button>
            </div>
            }
        </div>
    )
}