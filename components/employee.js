import React, {useState, useRef} from 'react'
import {Mimushavia, Profesia, Vedzeb} from './employee/profesia'
import {Qalaqi, Ubani} from './employee/qalaqi'
import {Unarebi, Garemo, Ena} from './employee/unarebi'
import {Pasuxismgebloba, Saati, Dge, Molodini} from './employee/psxmg'
import {Daxmareba, Gadaxda} from './employee/asociacia'
import { useRouter } from 'next/navigation'

export default function Employee() {
    const [qalaqi, setQalaqi] = useState('');
    const [ubani, setUbani] = useState('');
    const [ganatleba, setGanatleba] = useState('');
    const [gamocdileba, setGamocdileba] = useState('');
    const [profesia, setProfesia] = useState('');
    const [saati, setSaati] = useState('');
    const [dge, setDge] = useState('');
    const [sertifikation, setSertifikation] = useState('');
    const [molodini, setMolodini] = useState('');
    const [dazgveva, setDazgveva] = useState('');
    const [gadaxda, setGadaxda] = useState('');
    const [vedzeb, setVedzeb] = useState('');
    const [dro, setDro] = useState('');
    const [additional, setAdditional] = useState('');

    const [unarebi, setUnarebi] = useState([]);
    const [pasuxismgebloba, setPasuxismgebloba] = useState([]);
    const [daxmareba, setDaxmareba] = useState([]);
    const [animals, setAnimals] = useState([]);

    const [loading, setLoading] = useState(false)
  
    const babiesRef = useRef(null)
    const houseRef = useRef(null)
    const mnRef = useRef(null)
    const nameRef = useRef(null)
    const lastNameRef = useRef(null)
    const emailRef = useRef(null)
    const startRef = useRef(null)
    const endRef = useRef(null)
    const movaleobebiRef = useRef(null)
    
    const router = useRouter()
    
    const upload = async (e) => {
        setLoading(true)
        e.preventDefault();
        try {
            const connect = await fetch('/api/ojaxi', {
                method: 'POST',
                credentials: 'include',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({
                    name: nameRef.current?.value || '',
                    mobile: mnRef.current?.value || '',
                    qalaqi: qalaqi,
                    ubani: ubani,
                    ganatleba: ganatleba,
                    gamocdileba: gamocdileba,
                    vedzeb: vedzeb,
                    periodi: dro,
                    unarebi: unarebi,
                    profesia: profesia, //ვიყენებ ბავშვის ასაკად... მგონი მეშვიდე შეკითხვაა
                    pasuxismgebloba: pasuxismgebloba,
                    saati: saati,
                    dge: dge,
                    sertifikation: sertifikation,
                    molodini: molodini,
                    daxmareba: daxmareba,
                    gadaxda: gadaxda,
                    dazgveva: dazgveva,
                    gvari: lastNameRef.current?.value || '',
                    babies: babiesRef.current?.value || 0,
                    house: houseRef.current?.value || 0,
                    ganrigi: `${startRef.current?.value || 0}-დან ${endRef.current?.value || 0}-მდე`,
                    movaleobebi: movaleobebiRef.current?.value || '',
                    animals: animals,
                    addHours: additional,
                    email: emailRef.current?.value || ''
                })
            })
            if(connect.ok) return router.push(`/thanks/ojaxi?id=${mnRef.current.value}`);
            else {
                setLoading(false)
                return alert('მითითებული მობილურის ნომერი უკვე არსებობს ჩვენს ბაზაში')
            }
        }
        catch (err) {
            setLoading(false)
            throw new Error(err.message)
        }
    }


    const handleAdditional = (event) => {
        setAdditional(event.target.value)
    };

    const handleDro = (event) => {
        setDro(event.target.value)
    };

    const handleVedzeb = (event) => {
        setVedzeb(event.target.value)
    };
    
    const handleGadaxda = (event) => {
      setGadaxda(event.target.value);
    };
  
    const handleMolodini = (event) => {
      setMolodini(event.target.value);
    };
  
    const handleDge = (event) => {
      setDge(event.target.value);
    };
  
    const handleSaati = (event) => {
      setSaati(event.target.value);
    };
  
    const handleProfesia = (event) => {
      setProfesia(event.target.value);
    };
      
    const handleDaxmareba = (event) => {
      const { value, checked } = event.target;
  
      setDaxmareba(prevSelectedOptions =>
        checked
          ? [...prevSelectedOptions, value]
          : prevSelectedOptions.filter(option => option !== value)
      );
    };

    const handleAnimals = (event) => {
        const { value, checked } = event.target;
    
        setAnimals(prevSelectedOptions =>
          checked
            ? [...prevSelectedOptions, value]
            : prevSelectedOptions.filter(option => option !== value)
        );
      };
  
    const handlePasuxismgebloba = (event) => {
      const { value, checked } = event.target;
  
      setPasuxismgebloba(prevSelectedOptions =>
        checked
          ? [...prevSelectedOptions, value]
          : prevSelectedOptions.filter(option => option !== value)
      );
    };
  
    const handleUnarebi = (event) => {
      const { value, checked } = event.target;
  
      setUnarebi(prevSelectedOptions =>
        checked
          ? [...prevSelectedOptions, value]
          : prevSelectedOptions.filter(option => option !== value)
      );
    };
  
  
    const handleMimushavia = (event) => {
      const { value, checked } = event.target;
  
      setMimushavia(prevSelectedOptions =>
          checked
            ? [...prevSelectedOptions, value]
            : prevSelectedOptions.filter(option => option !== value)
        );
    };
  
    const handleGamocdileba = (event) => {
      setGamocdileba(event.target.value);
    };
  
    const handleGanatleba = (event) => {
      setGanatleba(event.target.value);
    };
  
    const handleUbani = (event) => {
      setUbani(event.target.value);
    };
  
    const handleQalaqi = (event) => {
      setQalaqi(event.target.value);
    };

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = "/Damsakmebeli.pdf"; // NOT @/public/myfile.pdf
        link.download = "Damsakmebeli.pdf"; 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    return(
        <section className='my-5 flex flex-col justify-center items-center'>
            <form className='flex flex-col justify-center items-center my-5' onSubmit={upload}>
            <div className='flex flex-col justify-center items-center concern w-3/4' 
            style={{
                background: 'rgba(249, 209, 209, 0.35)', 
                borderRadius: '25px',
                padding: '5px'
            }}
            >
                <h2 className='font-bold my-2 text-center'>დამსაქმებლის კითხვარი</h2>
                <p className='text-justify text-sm p-3'>თუ ეძებთ საოჯახო მშრომელს, შეავსეთ ფორმა. ასოციაცია ასაქმებს მხოლოდ წერილობით შრომით ხელშეკრულების საფუძველზე. <span onClick={handleDownload} className='font-bold cursor-pointer underline'>გთხოვთ ჩამოტვირთოთ ხელშეკრულება</span> და მონიშნოთ ველი ,,თანახმა ვარ".</p>
                <div>
                    <label>თანახმა ვარ</label>
                    <input className='m-5' type='checkbox' required value='Tanaxma var'/>
                </div>
            </div>
                <div className='formDiv1'>
                    <div className='formDiv2'>
                        <label htmlFor='name'>1. თქვენი სახელი</label>
                        <input id='name' ref={nameRef} type='text' required/>
                    </div>
                    <div className='formDiv2'>
                        <label htmlFor='name'>2. თქვენი გვარი</label>
                        <input id='name' ref={lastNameRef} type='text' required/>
                    </div>
                </div>
                <div className='formDiv1'>
                    <div className='formDiv2'>
                        <label htmlFor='mn'>3. მობილურის ნომერი</label>
                        <input id='mn' ref={mnRef} type='text' minLength={9} required/>
                    </div>
                    <Qalaqi qalaqi={qalaqi} handleQalaqi={handleQalaqi}/>
                </div>
                {/*meotxe*/}
                <div className='formDiv1'>
                    <Ubani qalaqi={qalaqi} handleUbani={handleUbani}/>
                    <Vedzeb handleVedzeb={handleVedzeb} />
                    
                </div>
                <div className='formDiv1'>
                    <div className='formDiv2'>
                        <label htmlFor='ganatleba'>7. თუ ეძებთ ძიძას, გთხოვთ მიუთითოთ ბავშვის ასაკი.</label>
                        <input type='text' placeholder='მაგალითად: 6 თვის' value={profesia} onChange={handleProfesia} />
                    </div>
                    
                    <div className='formDiv2'>
                        <label htmlFor='ganatleba'>7.1. გთხოვთ მიუთითოთ ბავშვების რაოდენობა ოჯახში.</label>
                        <input type='number' min={0} placeholder='რაოდენობა' ref={babiesRef} />
                    </div>
                </div>

                <div className='formDiv1'>
                    <div className='formDiv2'>
                        <label htmlFor='ganatleba'>7.2. თუ ეძებთ საოჯახო დამხმარეს, გთხოვთ მიუთითოთ სახლის კვადრატულობა</label>
                        <input type='text' min={0} placeholder='კვ. მ.' ref={houseRef} />
                    </div>

                    <div className='formDiv2'>
                        <label htmlFor='dro'>8. გთხოვთ მიუთითოთ რა ვადით ეძებთ ოჯახში დასაქმებულს</label>
                        <select id='dro'  onChange={handleDro} required>
                            <option value=''>აირჩიეთ</option>
                            <option value='დღიურად'>დღიურად</option>
                            <option value='1 - 3 თვე'>1 - 3 თვე</option>
                            <option value='1 - 3 წელი'>1 - 3 წელი</option>
                            <option value='3 წელზე მეტი'>3 წელზე მეტი</option>
                        </select>
                    </div>
                </div>
                {/*mexute*/}
                <div className='formDiv1'>
                    <Saati handleSaati={handleSaati} />
                    <div className='formDiv2'>
                        <label htmlFor='sertifikati'>9.1. გთხოვთ მიუთითოთ, სამუშაო საათების დასაწყისი და დასასრული.</label>
                        <div className='flex flex-row'>
                            <input  type='number' placeholder='–დან' ref={startRef} />
                            <p>–დან</p>
                        </div>
                        <div className='flex flex-row'>
                            <input type='number' placeholder='–მდე' ref={endRef} />
                            <p>–მდე</p>
                        </div>
                    </div>
                </div>
                {/*meshvide*/}
                <div className='formDiv1'>
                    <Dge handleDge={handleDge} />
                    <div className='formDiv2'>
                        <label htmlFor='sertifikati'>11. გთხოვთ მიუთითოთ, აუცილებელია თუ არა, დასაქმებულს ჰქონდეს პროფესიული სერთიფიკატ(ები)ი.</label>
                        <select id='sertifikati' onChange={(e) => {setSertifikation(e.target.value)}} required>
                            <option value=''>აირჩიეთ</option>
                            <option value='კი'>კი</option>
                            <option value='არა'>არა</option>
                        </select>
                    </div>
                </div>
                {/*meeqvse*/}
                <div className='formDiv1'>
                    <Unarebi handleUnarebi={handleUnarebi} />
                    <Pasuxismgebloba handlePasuxismgebloba={handlePasuxismgebloba} />
                </div>
                {/*merve*/}
                <div className='formDiv1'>
                    <div className='formDiv2'>
                        <label htmlFor='name'>14.1. გთხოვთ ზედმიწევნით აღწეროთ დასაქმებულის მოვალეობები.</label>
                        <textarea ref={movaleobebiRef}
                        cols={20} rows={10} style={{
                            outline: 'none',
                            border: '1px solid black',
                            borderRadius: '10px',
                            padding:'3px 6px'
                        }}></textarea>
                    </div>
                    <div className='formDiv2'>
                        <label htmlFor='name'>14.2. მონიშნეთ თუ გყავთ შინაური ცხოველი</label>
                        <div className='flex flex-row'>
                            <label>არ მყავს</label>
                            <input type="checkbox" value='არ მყავს' onChange={handleAnimals} />
                        </div>
                        <div className='flex flex-row'>
                            <label >ძაღლი</label>
                            <input type="checkbox" value='ძაღლი' onChange={handleAnimals} />
                        </div>
                        <div className='flex flex-row'>
                            <label>კატა</label>
                            <input type="checkbox" value='კატა' onChange={handleAnimals} />
                        </div>
                        <div className='flex flex-row'>
                            <label>ფრინველი</label>
                            <input type="checkbox" value='ფრინველი' onChange={handleAnimals} />
                        </div>
                    </div>
                </div>
                <div className='formDiv1'>
                    <div className='formDiv2'>
                        <label htmlFor='dro'>14.3. გთხოვთ მიუთითოთ დამატებითი საათების საჭიროება. საშუალოდ, კვირაში რამდენი საათის დამატება შეიძლება დაგჭირდეთ დასაქმებულისგან?</label>
                        <select id='dro'  onChange={handleAdditional} required>
                            <option value=''>აირჩიეთ</option>
                            <option value='0'>0</option>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='4–ზე მეტი'>4–ზე მეტი</option>
                        </select>
                    </div>
                    <div className='formDiv2'>
                        <label htmlFor='email'>14.4. გთხოვთ მიუთითოთ ელექტრონული ფოსტა</label>
                        <input id='email' ref={emailRef} type='email' />
                    </div>
                </div>
                <div className='formDiv1'>
                    <Molodini handlemolodini={handleMolodini} />
                    <div className='formDiv2'>
                        <label htmlFor='gamocdileba'>16. მონიშნეთ დასასაქმებლის სასურველი გამოცდილების დონე (წელი)</label>
                        <input type='text' id='gamocdileba' value={gamocdileba} onChange={handleGamocdileba} required
                        style={{width: 'fit-content'}} />
                    </div>
                </div>
                {/*mecxre*/}
                <div className='formDiv1'>
                    <Daxmareba handleDaxmareba={handleDaxmareba} />
                    <Gadaxda handleGadaxda={handleGadaxda} />
                </div>
                {/*meate*/}
                {/*metertmete*/}
                <div className='formDiv1'>
                    <div className='formDiv2'>
                        <label htmlFor='name, lastname'>19. ასოციაცია გთავაზობთ დასაქმებულისთვის ჯანდაცვის დაზღვევის პაკეტს. პაკეტის თვიური ღირებულებაა 60 ლარი. გსურთ თუ არა, თქვენს დასაქმებულს შესთავაზოთ დაზღვევა?</label>
                        <select id='sertifikati' onChange={(e) => {setDazgveva(e.target.value)}} required>
                            <option value=''>აირჩიეთ</option>
                            <option value='კი'>კი</option>
                            <option value='არა'>არა</option>
                        </select>
                    </div>
                    <div className='formDiv2'>
                        <label className='text-sm text-justify'>თანხმობას ვაცხადებ, ორგანიზაციის საქმიანობის მიზნებისთვის დაამუშავოთ ჩემს მიერ მოწოდებული პერსონალური მონაცემი. 
                        პერსონალური მონაცემი არის ინფორმაცია, რომლითაც შესაძლებელია პირის იდენტიფიცირება. პერსონალური მონაცემებია პირის სახელი, გვარი, პირადი ნომერი, ტელეფონის ნომერი და სხვა. </label>
                        <div>
                            <label>თანახმა ვარ</label>
                            <input className='m-5' type='checkbox' required value='Tanaxma var'/>
                        </div>
                    </div>
                </div>
               
                <div className='w-full flex flex-col justify-center items-center'>
                {loading? <p>loading...</p> :
                <input type='submit' 
                    style={{
                        background: 'white',
                        border: '1px solid #31302f',
                        padding:'3px 9px',
                        borderRadius: '25px',
                        margin: '10px 0',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        width: 'fit-content'
                        }} 
                        name='submit' 
                        value='გააგზავნე' 
                         />
                    }
                </div>
            </form>
        </section>
    )
}