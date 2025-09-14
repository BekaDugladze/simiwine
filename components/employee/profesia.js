import React from 'react';

export function Mimushavia(props) {
    return(
        <div className='formDiv2'>
                        <label htmlFor='name, lastname'>გთხოვთ მიუთითოთ რომელი ქვემოთ ჩამოთვლილი მიმართულებით გიმუშავიათ ოჯახში?</label>
                        <div className='flex flex-row'>
                            <label >ძიძა</label>
                            <input type="checkbox" value='ძიძა' onChange={props.handleMimushavia} />
                        </div>
                        <div className='flex flex-row'>
                            <label>ძიძა–დამხმარე</label>
                            <input type="checkbox" value='ძიძა–დამხმარე' onChange={props.handleMimushavia} />
                        </div>
                        <div className='flex flex-row'>
                            <label>საოჯახო დამხმარე</label>
                            <input type="checkbox" value='საოჯახო დამხმარე' onChange={props.handleMimushavia} />
                        </div>
                        <div className='flex flex-row'>
                            <label>მომვლელი</label>
                            <input type="checkbox" value='მომვლელი' onChange={props.handleMimushavia} />
                        </div>
                        <div className='flex flex-row'>
                            <label>მზარეული</label>
                            <input type="checkbox" value='მზარეული' onChange={props.handleMimushavia} />
                        </div>
                        <div className='flex flex-row'>
                            <label>რეპეტიტორი</label>
                            <input type="checkbox" value='რეპეტიტორი' onChange={props.handleMimushavia} />
                        </div>
                        <div className='flex flex-row'>
                            <label>ექთანი</label>
                            <input type="checkbox" value='ექთანი' onChange={props.handleMimushavia} />
                        </div>
                        <div className='flex flex-row'>
                            <label>სხვა</label>
                            <input type="checkbox" value='სხვა' onChange={props.handleMimushavia} />
                        </div>
                    </div>
    )
}

export function Profesia(props){
    return(
        <div className='formDiv2'>
            <label htmlFor='profesia'>7. გთხოვთ მიუთითოთ სასურველი პროფესია (არსებობის შემთხვევაში)</label>
            <select id='profesia' value={props.profesia} onChange={props.handleProfesia}>
                    <>
                    <option value=''>აირჩიეთ პროფესია</option>
                    <option value='ექიმი'>ექიმი</option>
                    <option value='მასწავლებელი'>მასწავლებელი</option>
                    <option value='მზარეული'>მზარეული</option>
                    <option value='სოცმუშაკი'>სოც. მუშაკი</option>
                    <option value='სხვა'>სხვა</option>
                    </>
            </select>
        </div>
    )
}

export function Vedzeb(props) {
    return(
        <div className='formDiv2'>
            <label htmlFor='vedzeb'>6. გთხოვთ მიუთითოთ რომელი ქვემოთ ჩამოთვლილი მიმართულებით ეძებთ ოჯახში დასაქმებულს?</label>
            <select id='vedzeb' onChange={props.handleVedzeb} required>
                <option value=''>აირჩიეთ</option>
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
        </div>
    )
}