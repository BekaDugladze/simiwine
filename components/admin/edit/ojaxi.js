'use client'

import { useState } from "react"

export default function Edit(props){
    const user = props.user
    const admin = props.admin

    const [saxeli, setSaxeli] = useState(user.saxeligvari)
    const [gvari, setGvari] = useState(user.gvari)
    const [mobiluri, setMobiluri] = useState(user.mobiluri)
    const [wage, setWage] = useState(user.xelfasi)
    const [qalaqi, setQalaqi] = useState(user.qalaqi)
    const [ubani, setUbani] = useState(user.ubani)
    const [sertifikati, setSertifikati] = useState(user.sertifikati)
    const [dazgveva, setDazgveva] = useState(user.dazgveva)
    const [dge, setDge] = useState(user.dge)
    const [saati, setSaati] = useState(user.saati)
    const [gatavisufleba, setGatavisufleba] = useState(user.gatavisufleba)
    const [ganatleba, setGanatleba] = useState(user.ganatleba)
    const [gamocdileba, setGamocdileba] = useState(user.gamocdileba)
    const [profesia, setProfesia] = useState(user.profesia)
    const [tvisebebi, setTvisebebi] = useState(user.tvisebebi)
    const [kompetencia, setKompetencia] = useState(user.kompetencia)
    const [periodi, setPeriodi] = useState(user.periodi)
    const [damatebit, setDamatebit] = useState(user.damatebit)
    const [bavshvebi, setBavshvebi] = useState(user.bavshvebi)

    const [message, setMessage] = useState('')
    const [real, setReal] = useState(false)

    const putData = async (e) => {
        e.preventDefault()
        try{
            const connect = await fetch('/api/ojaxi/user', {
                method: 'PUT',
                credentials: 'include',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({
                    pn: user.ojaxiid,
                    name: saxeli,
                    gvari: gvari,
                    mobiluri: mobiluri,
                    xelfasi: wage,
                    qalaqi: qalaqi,
                    ubani: ubani,
                    sertifikati: sertifikati,
                    dazgveva: dazgveva,
                    dge: dge,
                    saati: saati,
                    gatavisufleba: gatavisufleba,
                    ganatleba: ganatleba,
                    gamocdileba: gamocdileba,
                    profesia: profesia,
                    tvisebebi: tvisebebi,
                    kompetencia: kompetencia,
                    periodi: periodi,
                    damatebit: damatebit,
                    admin: admin,
                    bavshvebi: bavshvebi,
                })
            })
            if(connect.ok) {
                setMessage('ცვლილებები შეტანილია');
                setTimeout(() => {setMessage('')}, 3000);
            }
            else {
                setMessage('ცვლილებები არ არის შეტანილი');
                setTimeout(() => {setMessage('')}, 3000);
            }
        }
        catch(err){
            throw new Error(err)
        }
    }

    return(
        <form onSubmit={putData} className="flex flex-col justify-center">
            <div className="formDiv3">
                <label>1. სახელი:</label>
                <input type="text" value={saxeli} onChange={(e) => setSaxeli(e.target.value)} />
            </div>
            <div className="formDiv3">
                <label>2. გვარი:</label>
                <input type="text" value={gvari} onChange={(e) => setGvari(e.target.value)} />
            </div>
            <div className="formDiv3">
                <label>3. მობილური:</label>
                <input type="text" value={mobiluri} onChange={(e) => setMobiluri(e.target.value)} />
            </div>
            <div className="formDiv3">
                <label>4. ხელფასი:</label>
                <select value={wage} onChange={(e) => setWage(e.target.value)} >
                    <option value={wage}>{wage}</option>
                    <option value='800–ზე ნაკლები'>800–ზე ნაკლები ლარი (არასრული განაკვეთი)</option>
                    <option value='800 ლარი'>800 ლარი (არასრული განაკვეთი)</option>
                    <option value='900 ლარი'>900 ლარი (არასრული განაკვეთი)</option>
                    <option value='1000 ლარი'>1000 ლარი (არასრული განაკვეთი)</option>
                    <option value='1100 ლარი'>1100 ლარი</option>
                    <option value='1200 ლარი'>1200 ლარი</option>
                    <option value='1300 ლარი'>1300 ლარი</option>
                    <option value='1400 ლარი'>1400 ლარი</option>
                    <option value='1500 ლარი'>1500 ლარი</option>
                    <option value='1600 ლარი'>1600 ლარი</option>
                    <option value='1700 ლარი'>1700 ლარი</option>
                    <option value='1800 ლარი'>1800 ლარი</option>
                    <option value='1900 ლარი'>1900 ლარი</option>
                    <option value='2000 ლარი'>2000 ლარი</option>
                    <option value='2100 ლარი'>2100 ლარი</option>
                    <option value='2200 ლარი'>2200 ლარი</option>
                    <option value='2300 ლარი'>2300 ლარი</option>
                    <option value='2400 ლარი'>2400 ლარი</option>
                    <option value='2500-ზე მეტი'>2500-ზე მეტი</option>
                </select>
            </div>
            <div className="formDiv3">
                <label>5. ქალაქი:</label>
                <input type="text" value={qalaqi} onChange={(e) => setQalaqi(e.target.value)} />
            </div>
            <div className="formDiv3">
                <label>6. უბანი:</label>
                { qalaqi === 'თბილისი' ?
                <select value={ubani} onChange={(e) => setUbani(e.target.value)} >
                    <option value={ubani}>{ubani}</option>
                    <option value='ავლაბარი'>ავლაბარი</option>
                    <option value='ბაგები'>ბაგები</option>
                    <option value='გლდანი'>გლდანი</option>
                    <option value='დიდი დიღომი'>დიდი დიღომი</option>
                    <option value='დიდუბე'>დიდუბე</option>
                    <option value='დიღმის მასივი'>დიღმის მასივი</option>
                    <option value='ვაზისუბანი'>ვაზისუბანი</option>
                    <option value='ვაკე'>ვაკე</option>
                    <option value='ვარკეთილი'>ვარკეთილი</option>
                    <option value='ვაშლიჯვარი'>ვაშლიჯვარი</option>
                    <option value='ვერა'>ვერა</option>
                    <option value='ისანი'>ისანი</option>
                    <option value='ივერთუბანი'>ივერთუბანი</option>
                    <option value='ლისი'>ლისი</option>
                    <option value='მთაწმინდა'>მთაწმინდა</option>
                    <option value='ნაძალადევი'>ნაძალადევი</option>
                    <option value='ნუცუბიძის პლატოები'>ნუცუბიძის პლატოები</option>
                    <option value='საბურთალო'>საბურთალო</option>
                    <option value='სამგორი'>სამგორი</option>
                    <option value='სოლოლაკი'>სოლოლაკი</option>
                    <option value='ჩუღურეთი'>ჩუღურეთი</option>
                    <option value='ჰუალინგი'>ჰუალინგი</option>
                </select>
                :
                <input type="text" value={ubani} onChange={(e) => setUbani(e.target.value)} />
                }
            </div>
            <div className="formDiv3">
                <label>7. ეძებს სერთიფიცირებულ საოჯახო მშრომელს:</label>
                <select value={sertifikati} onChange={(e) => setSertifikati(e.target.value)} >
                    <option value={sertifikati}>{sertifikati}</option>
                    <option value='კი'>კი</option>
                    <option value='არა'>არა</option>
                </select>
            </div>
            <div className="formDiv3">
                <label>8. სთავაზობს ჯანმრთელობის დაზღვევას:</label>
                <select value={dazgveva} onChange={(e) => setDazgveva(e.target.value)} >
                    <option value={dazgveva}>{dazgveva}</option>
                    <option value='კი'>კი</option>
                    <option value='არა'>არა</option>
                </select>
            </div>
            <div className="formDiv3">
                <label>9. სურს დაასაქმოს კვირაში:</label>
                <div className="flex flex-row w-full justify-start items-start" 
                style={{justifyContent: 'flex-start'}}>
                    <select value={dge} onChange={(e) => setDge(e.target.value)} >
                        <option value={dge}>{dge}</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4 </option>
                        <option value='5'>5</option>
                        <option value='6'>6</option>
                        <option value='7'>7</option>
                    </select>
                    <p className="mx-3">დღე</p>
                </div>
            </div>
            <div className="formDiv3">
                <label>10. სურს დაასაქმოს დღეში:</label>
                <select value={saati} onChange={(e) => setSaati(e.target.value)}>
                    <option value={saati}>{saati}</option>
                    <option value='4 საათი'>4 საათი</option>
                    <option value='8 საათი'>8 საათი</option>
                    <option value='10 საათი'>10 საათი</option>
                    <option value='12 საათი'>12 საათი</option>
                    <option value='24 საათი'>24 საათი</option>
                </select>
            </div>
            
            <div className="formDiv3">
                <label>11. გამოცდილება:</label>
                <select value={gamocdileba} onChange={(e) => setGamocdileba(e.target.value)}>
                            <option value={gamocdileba}>{gamocdileba}</option>
                            <option value='დამწყები'>დამწყები</option>
                            <option value='1–5წელი'>1–5 წელი</option>
                            <option value='5–10წელი'>5–10 წელი</option>
                            <option value='10–20წელი'>10–20 წელი</option>
                            <option value='20+წელი'>20+ წელი</option>
                </select>
            </div>
           
            <div className="formDiv3">
                <label>12. დასაქმების ხანგრძლივობა:</label>
                <select value={periodi} onChange={(e) => setPeriodi(e.target.value)}>
                    <option value={periodi}>{periodi}</option>
                    <option value='დღიურად'>დღიურად</option>
                    <option value='1 - 3 თვე'>1 - 3 თვე</option>
                    <option value='1 - 3 წელი'>1 - 3 წელი</option>
                    <option value='3 წელზე მეტი'>3 წელზე მეტი</option>
                </select>
            </div>

            <div className="formDiv3">
                <label>13. ბავშვის ასაკი:</label>
                <input type="text" value={profesia} onChange={(e) => setProfesia(e.target.value)} />
            </div>
            <div className="formDiv3">
                <label>14. ბავშვების რაოდენობა:</label>
                <input type="text" value={bavshvebi} onChange={(e) => setBavshvebi(e.target.value)} />
            </div>
            

            {!real ?
            <button style={{
                border: '1px solid black',
                borderRadius: '25px',
                padding: '1px 5px',
                fontFamily: 'nino',
                display: 'block',
                alignSelf: 'center',
                margin: '10px'
            }}
            onClick={() => setReal(true)}>ცვლილებების შეტანა</button>
            :
            <div className="flex flex-col justify-center items-center"> 
            <input
            style={{
                border: '1px solid black',
                borderRadius: '25px',
                padding: '1px 5px',
                fontFamily: 'nino',
                display: 'block',
                alignSelf: 'center',
                margin: '10px',
                cursor: 'pointer'
            }} type="submit" value="დადასტურება" />
            <p>{message}</p>
            <button style={{
            }}
            onClick={() => setReal(false)}>გაუქმება</button>
            </div>
            }
        </form>
    )
}