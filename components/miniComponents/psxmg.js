
export function Pasuxismgebloba(props) {
    return (
        <div className='formDiv2'>
            <label>16. რა პასუხისმგებლობები <span className="font-bold">არ გინდათ</span> გქონდეთ საოჯახო შრომაში?</label>
            <div className='flex flex-row'>
                <label >საკვების მომზადება ოჯახისთვის</label>
                <input type="checkbox" value='საკვების მომზადება ოჯახისთვის' onChange={props.handlePasuxismgebloba} />
            </div>
            <div className='flex flex-row'>
                <label>ერთზე მეტი ბავშვის მოვლა</label>
                <input type="checkbox" value='ერთზე მეტი ბავშვის მოვლა' onChange={props.handlePasuxismgebloba} />
            </div>
                        <div className='flex flex-row'>
                            <label>ბავშვის მოვლა</label>
                            <input type="checkbox" value='ბავშვის მოვლა' onChange={props.handlePasuxismgebloba} />
                        </div>
                        <div className='flex flex-row'>
                            <label>სახლის დალაგება</label>
                            <input type="checkbox" value='სახლის დალაგება' onChange={props.handlePasuxismgebloba} />
                        </div>
                        <div className='flex flex-row'>
                            <label>შინაური ცხოველის მოვლა</label>
                            <input type="checkbox" value='შინაური ცხოველის მოვლა' onChange={props.handlePasuxismgebloba} />
                        </div>
                        <div className='flex flex-row'>
                            <label>უთოობა</label>
                            <input type="checkbox" value='უთოობა' onChange={props.handlePasuxismgebloba} />
                        </div>
                        <div className='flex flex-row'>
                            <label>აგარაკზე გაყოლა</label>
                            <input type="checkbox" value='აგარაკზე გაყოლა' onChange={props.handlePasuxismgebloba} />
                        </div>
                        <div className='flex flex-row'>
                            <label>ღამე დარჩენა</label>
                            <input type="checkbox" value='ღამე დარჩენა' onChange={props.handlePasuxismgebloba} />
                        </div>
                        <div className='flex flex-row'>
                            <label>სხვა</label>
                            <input type="checkbox" value='სხვა' onChange={props.handleVedzeb} />
                        </div>
        </div>
    )
}

export function Saati(props) {
    return(
        <div className='formDiv2'>
            <label htmlFor='saati'>17. მაქსიმუმ რამდენი საათით გსურთ დასაქმება დღის მანძილზე? </label>
            <select id='saati'  onChange={props.handleSaati} required>
                    <>
                    <option value=''>აირჩიეთ</option>
                    <option value='4–5 საათი'>4–5 საათი</option>
                    <option value='8–9 საათი'>8–9 საათი</option>
                    <option value='24 საათი'>24 საათი</option>
                    </>
            </select>
        </div>)
}

export function Dge(props) {
    return(
        <div className='formDiv2'>
        <label htmlFor='dge'>18. კვირაში მაქსიმუმ რამდენი დღე გსურთ დასაქმება?</label>
            <select id='dge'  onChange={props.handleDge} required>
                    <>
                    <option value=''>აირჩიეთ</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4 </option>
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                    <option value='7'>7</option>
                    </>
            </select>
        </div>)
}

export function Molodini(props){ 
    return(
        <div className='formDiv2'>
            <label htmlFor='name, lastname'>16. რამდენია თქვენი ხელფასის მოლოდინი?</label>
            <select id='molodini'  onChange={props.handlemolodini} required>
                    <>
                    <option value=''>აირჩიეთ</option>
                    <option value='800–ზე ნაკლები'>800–ზე ნაკლები ლარი</option>
                    <option value='800-1000 ლარი'>800-1000 ლარი</option>
                    <option value='1000-1200 ლარი'>1000-1200 ლარი</option>
                    <option value='1200-1400 ლარი'>1200-1400 ლარი</option>
                    <option value='1500-1700 ლარი'>1500-1700 ლარი</option>
                    <option value='1700-1900 ლარი'>1700-1900 ლარი</option>
                    <option value='1900-2100 ლარი'>1900-2100 ლარი</option>
                    <option value='2000-2500 ლარი'>2000-2500 ლარი</option>
                    <option value='2500-ზე მეტი'>2500-ზე მეტი</option>
                    </>
            </select>
        </div>
    )
}