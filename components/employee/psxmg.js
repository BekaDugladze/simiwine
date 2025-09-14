
export function Pasuxismgebloba(props) {
    return (
        <div className='formDiv2'>
            <label>13. გთხოვთ გაგვიზიაროთ პასუხისმგებლობები, რომელიც ექნება დასაქმებულს ოჯახში. </label>
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
                            <input type="checkbox" value='სხვა' onChange={props.handlePasuxismgebloba} />
                        </div>
        </div>
    )
}

export function Saati(props) {
    return(
        <div className='formDiv2'>
            <label htmlFor='saati'>9. მაქსიმუმ რამდენი საათით გსურთ დასაქმება დღის მანძილზე?</label>
            <select id='saati'  onChange={props.handleSaati} required>
                    <>
                    <option value=''>აირჩიეთ</option>
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
                    </>
            </select>
        </div>)
}

export function Dge(props) {
    return(
        <div className='formDiv2'>
        <label htmlFor='dge'>10. კვირაში რამდენი დღე გსურთ დასაქმება?</label>
            <select id='dge'  onChange={props.handleDge} required>
                    <option value=''>აირჩიეთ</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4 </option>
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                    <option value='7'>7</option>
            </select>
        </div>)
}

export function Molodini(props){ 
    return(
        <div className='formDiv2'>
            <label htmlFor='name, lastname'>15. რამდენია შეთავაზებული ანაზღაურება?</label>
            <select id='molodini'  onChange={props.handlemolodini} required>
                    <>
                    <option value=''>აირჩიეთ</option>
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
                    </>
            </select>
        </div>
    )
}