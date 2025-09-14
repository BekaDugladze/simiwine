'use client'

import { useState } from "react"

export const Match = (props) => {
    const [match, setMatch] = useState(false)
    const id = props.id
    const pn = props.pn

    const matchThem = async (e) => {
        e.preventDefault()
        try{
            const connect = await fetch('/api/match', {
                method: 'POST',
                credentials: 'include',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({
                    id: id,
                    pn: pn
                })
            })
            if (connect.ok) alert('გილოცავთ, ისინი დასაქმდნენ')
                else alert('სამწუხაროდ, მოხდა შეცდომა. ხელახლა სცადეთ.')
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
            className='bg-green-700 text-white py-1 px-3 mx-3 rounded-xl my-6 text-center'>დაასაქმე</button>
            : 
            <div className="flex flex-row my-6">
                <button 
                onClick={() => setMatch(false)}
                className="text-red-700 mx-3">უკან</button>
                <button 
                onClick={matchThem}
                className="text-green-700 mx-3">დასაქმება</button>
            </div>
            }
        </div>
    )
}