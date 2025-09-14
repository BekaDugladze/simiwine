import { useRef, useState } from "react"

export function Unarebi(props) {
    return(
        <div className='formDiv2'>
            <label htmlFor='name, lastname'>12. გთხოვთ მიუთითოთ, თუ ფლობთ რომელიმე ქვემოთ ჩამოთვლილ უნარს.</label>
            <div className='flex flex-row'>
                <label >ავტომობილის მართვა</label>
                <input type="checkbox" value='ავტომობილის მართვა' onChange={props.handleUnarebi} />
            </div>
            <div className='flex flex-row'>
                <label>უცხო ენების ფლობა</label>
                <input type="checkbox" value='უცხო - ენების ფლობა' onChange={props.handleUnarebi} />
            </div>
                        <div className='flex flex-row'>
                            <label>პირველადი სამედიცინო დახმარება</label>
                            <input type="checkbox" value='პირველადი სამედიცინო დახმარება' onChange={props.handleUnarebi} />
                        </div>
                        <div className='flex flex-row'>
                            <label>კომპიუტერის მოხმარება</label>
                            <input type="checkbox" value='კომპიუტერის მოხმარება' onChange={props.handleUnarebi} />
                        </div>
                        <div className='flex flex-row'>
                            <label>რომელიმე მუსიკალური ინსტრუმენტის ფლობა</label>
                            <input type="checkbox" value='რომელიმე მუსიკალური ინსტრუმენტის ფლობა' onChange={props.handleUnarebi} />
                        </div>
                        <div className='flex flex-row'>
                            <label>სიმღერა</label>
                            <input type="checkbox" value='სიმღერა' onChange={props.handleUnarebi} />
                        </div>
                        <div className='flex flex-row'>
                            <label>ხატვა</label>
                            <input type="checkbox" value='ხატვა' onChange={props.handleUnarebi} />
                        </div>
                        <div className='flex flex-row'>
                            <label>ქსოვა, ქარგვა, კერვა ან სხვა ხელსაქმე</label>
                            <input type="checkbox" value='ქსოვა, ქარგვა, კერვა ან სხვა ხელსაქმე' onChange={props.handleUnarebi} />
                        </div>
                        <div className='flex flex-row'>
                            <label>კულინარია</label>
                            <input type="checkbox" value='კულინარია' onChange={props.handleUnarebi} />
                        </div>
                        <div className='flex flex-row'>
                            <label>სხვა, სპეციფიური უნარი, რაც ზემოთ არ არის ჩამოთვლილი</label>
                            <input type="checkbox" value='სხვა, სპეციფიური უნარი, რაც ზემოთ არ არის ჩამოთვლილი' onChange={props.handleUnarebi} />
                        </div>
                    </div>
    )
}

export function Garemo(props) {
    return(
        <div className='formDiv2'>
                        <label htmlFor='name, lastname'>15. გთხოვთ ოჯახის ინფორმირებისთვის 4-5 წინადადებით აღწერეთ კონკრეტულად როგორია თქვენთვის მისაღები სამუშაო გარემო. მოიყვანეთ მაგალითებიც.</label>
                        <textarea ref={props.garemoRef} required
                        style={{
                            width: '100%', 
                            background: 'white', 
                            height: '130px',
                            overflowX: 'hidden', 
                            overflowY: 'auto',
                            borderRadius: '25px',
                            outline: 'none',
                            border: '1px solid #2b4a23',
                            padding: '3px 6px'
                            }}></textarea>
                    </div>
    )
}

export const Ena = (props) => {
    const [other, setOther] = useState(false)
    const [value, setValue] = useState('')

    const otherRef = useRef(null)
    return(
        <div className='formDiv2'>
            <label htmlFor='name, lastname'>14. გთხოვთ მონიშნოთ, თუ ფლობთ რომელიმე ქვემოთ ჩამოთვლილ ენას?</label>
            <div className='flex flex-row'>
                <label >ინგლისური</label>
                <input type="checkbox" value='ინგლისური' onChange={props.handleEna} />
            </div>
            <div className='flex flex-row'>
                <label>რუსული</label>
                <input type="checkbox" value='რუსული' onChange={props.handleEna} />
            </div>
            <div className='flex flex-row'>
                <label>გერმანული</label>
                <input type="checkbox" value='გერმანული' onChange={props.handleEna} />
            </div>
            <div className='flex flex-row'>
                <label>ფრანგული</label>
                <input type="checkbox" value='ფრანგული' onChange={props.handleEna} />
            </div>
            <div className="flex flex-col">
                <div className='flex flex-row'>
                    <label>სხვა</label>
                    <input 
                        type="checkbox" 
                        value='სხვა' 
                        onChange={props.handleEna}  
                    />
                </div>
                {other ? <input type="text" 
                    onChange={(e) => setValue(e.target.value)} /> : <></>}
            </div>
        </div>
    )
}