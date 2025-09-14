'use client'

import { useState } from "react"

export default function Edit(props){
    const user = props.user
    const admin = props.admin

    const [saxeli, setSaxeli] = useState(user.saxeligvari)
    const [gvari, setGvari] = useState(user.gvari)
    const [pn, setPn] = useState(user.piradinomeri)
    const [wage, setWage] = useState(user.molodini)
    const [qalaqi, setQalaqi] = useState(user.qalaqi)
    const [ubani, setUbani] = useState(user.ubani)
    const [sertifikati, setSertifikati] = useState(user.sertifikati)
    const [dazgveva, setDazgveva] = useState(user.dazgveva)
    const [dge, setDge] = useState(user.dge)
    const [saati, setSaati] = useState(user.saati)
    const [mobiluri, setMobiluri] = useState(user.mobiluri)
    const [garemo, setGaremo] = useState(user.garemo)
    const [ganatleba, setGanatleba] = useState(user.akadganatleba)
    const [gamocdileba, setGamocdileba] = useState(user.gamocdileba)
    const [profesia, setProfesia] = useState(user.profesia)
    const [asaki, setAsaki] = useState(user.asaki)
    const [samushao, setSamushao] = useState(user.samushao)
    const [damatebit, setDamatebit] = useState(user.damatebit)

    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [real, setReal] = useState(false)
    console.log(damatebit)

    const putData = async (e) => {
        e.preventDefault()
        setLoading(true)
        try{
            const connect = await fetch('/api/mshromeli/user', {
                method: 'PUT',
                credentials: 'include',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({
                    pn: user.piradinomeri,
                    name: saxeli,
                    gvari: gvari,
                    mobiluri: mobiluri,
                    piradinomeri: pn,
                    wage: wage,
                    qalaqi: qalaqi,
                    ubani: ubani,
                    sertifikati: sertifikati,
                    dazgveva: dazgveva,
                    dge: dge,
                    saati: saati,
                    garemo: garemo,
                    ganatleba: ganatleba,
                    gamocdileba: gamocdileba,
                    profesia: profesia,
                    asaki: asaki,
                    samushao: samushao,
                    damatebit: damatebit,
                    admin: admin,
                })
            })
            if(connect.ok) {
                setMessage('ცვლილებები შეტანილია');
                setTimeout(() => {setMessage('')}, 3000);
                setLoading(false);
            }
            else {
                setMessage('ცვლილებები არ არის შეტანილი');
                setTimeout(() => {setMessage('')}, 3000);
                setLoading(false);
            }
        }
        catch(err){
            throw new Error(err)
            setLoading(false);
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
                <label>4. პირადი ნომერი:</label>
                <input type="number" value={pn} onChange={(e) => setPn(e.target.value)} />
            </div>
            <div className="formDiv3">
                <label>5. ხელფასი:</label>
                <select value={wage} onChange={(e) => setWage(e.target.value)} >
                    <option value={wage}>{wage}</option>
                    <option value='800–ზე ნაკლები'>800–ზე ნაკლები ლარი</option>
                    <option value='800-1000 ლარი'>800-1000 ლარი</option>
                    <option value='1000-1200 ლარი'>1000-1200 ლარი</option>
                    <option value='1200-1400 ლარი'>1200-1400 ლარი</option>
                    <option value='1500-1700 ლარი'>1500-1700 ლარი</option>
                    <option value='1700-1900 ლარი'>1700-1900 ლარი</option>
                    <option value='1900-2100 ლარი'>1900-2100 ლარი</option>
                    <option value='2000-2500 ლარი'>2000-2500 ლარი</option>
                    <option value='2500-ზე მეტი'>2500-ზე მეტი</option>
                </select>
            </div>
            <div className="formDiv3">
                <label>6. ქალაქი:</label>
                <input type="text" value={qalaqi} onChange={(e) => setQalaqi(e.target.value)} />
            </div>
            <div className="formDiv3">
                <label>7. უბანი:</label>
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
                <label>8.პროფესიული სერთიფიკატის ფლობა:</label>
                <select value={sertifikati} onChange={(e) => setSertifikati(e.target.value)} >
                    <option value={sertifikati}>{sertifikati}</option>
                    <option value='კი'>კი</option>
                    <option value='არა'>არა</option>
                </select>
            </div>
            <div className="formDiv3">
                <label>9. სურს ჰქონდეს ჯანმრთელობის დაზღვევა:</label>
                <select value={dazgveva} onChange={(e) => setDazgveva(e.target.value)} >
                    <option value={dazgveva}>{dazgveva}</option>
                    <option value='კი'>კი</option>
                    <option value='არა'>არა</option>
                </select>
            </div>
            <div className="formDiv3">
                <label>10. სურს იმუშაოს კვირაში:</label>
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
                <label>11. სასურველი სამუშაო სათების რაოდენობა დღეში:</label>
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
                <label>12. სასურველი სამუშაო გარემოს აღწერილობა:</label>
                <textarea value={garemo} onChange={(e) => setGaremo(e.target.value)} 
                    style={{outline: 'none', 
                    borderRadius: '5px',
                    minHeight: '100px', 
                    border:'1px solid #2b4a23', 
                    padding: '2px 6px'}}></textarea>
            </div>
            <div className="formDiv3">
                <label>13. განათლების ხარისხი:</label>
                    <select value={ganatleba} onChange={(e) => setGanatleba(e.target.value)}>
                                <option value={ganatleba}>{ganatleba}</option>
                                <option value='საშუალო'>საშუალო</option>
                                <option value='პროფესიული'>პროფესიული</option>
                                <option value='ბაკალავრი'>ბაკალავრი</option>
                                <option value='მაგისტრი'>მაგისტრი</option>
                    </select>
            </div>
            <div className="formDiv3">
                <label>14. გამოცდილება:</label>
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
                <label>15. პროფესია:</label>
                <input type="text" value={profesia} onChange={(e) => setProfesia(e.target.value)} />
            </div>
            <div className="formDiv3">
                <label>16. ასაკი:</label>
                <input type="number" value={asaki} onChange={(e) => setAsaki(e.target.value)} />
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
            {loading ? <p>Loading...</p> : <input
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
            }
            <p>{message}</p>
            <button style={{
                color: '#ab1119',
                margin: '5px 0'
            }}
            onClick={() => setReal(false)}>გაუქმება</button>
            </div>
            }
        </form>
    )
}