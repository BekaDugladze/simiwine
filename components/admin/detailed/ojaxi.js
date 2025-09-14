import { useState, useEffect,} from "react"
import Ojaxi from '@/components/admin/ojaxi'

export const OjaxiForMshromeli = (props) => {
    const [filter, setFilter] = useState({})
    const [loading, setLoading] = useState(true)
    const [admin, setAdmin] = useState('')
    
    const handleFilter = (e) => {
        const { name, value } = e.target;
        setFilter(prevFilter => ({
            ...prevFilter,
            [name]: value
        }));
    }

    return(
        <div style={{width: '50vw'}}>
            <section >
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
                    <select name="gamocdileba" onChange={handleFilter}>
                        <option value=''>გამოცდილება</option>
                        <option value='დამწყები'>დამწყები</option>
                        <option value='1–5წელი'>1–5 წელი</option>
                        <option value='5–10წელი'>5–10 წელი</option>
                        <option value='10–20წელი'>10–20 წელი</option>
                        <option value='20+წელი'>20+ წელი</option>
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
                        <option value='8 საათი'>8 საათი</option>
                        <option value='10 საათი'>10 საათი</option>
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
                    <select name='molodini'  onChange={handleFilter} >
                        <option value=''>ანაზღაურება</option>
                        <option value='600-800 ლარი'>600-800 ლარი</option>
                        <option value='800-1000 ლარი'>800-1000 ლარი</option>
                        <option value='1000-1200 ლარი'>1000-1200 ლარი</option>
                        <option value='1200-1400 ლარი'>1200-1400 ლარი</option>
                        <option value='1500-2000 ლარი'>1500-2000 ლარი</option>
                        <option value='2000-2500 ლარი'>2000-2500 ლარი</option>
                        <option value='2500-ზე მეტი'>2500-ზე მეტი</option>
                    </select>
                    <select name='sertifikati' onChange={handleFilter}>
                        <option value=''>სერთიფიკატი</option>
                        <option value='კი'>კი</option>
                        <option value=''>არა</option>
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
                <div className="mainer">
                    <Ojaxi filter={filter} admin={admin}/>
                </div>
            </section>
        </div>
    )
}