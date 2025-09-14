import React from 'react';
import { useState, useRef, useEffect } from 'react';
import {Mimushavia, Profesia, Vedzeb} from './miniComponents/profesia'
import {Qalaqi, Ubani} from './miniComponents/qalaqi'
import {Unarebi, Garemo, Ena} from './miniComponents/unarebi'
import {Pasuxismgebloba, Saati, Dge, Molodini} from './miniComponents/psxmg'
import {Daxmareba, Gadaxda} from './miniComponents/asociacia'
import { useRouter } from 'next/navigation';

export default function Job() {
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
  const [msurs, setMsurs] = useState('');
  const [mweveli, setMweveli] = useState('');
  const [loading, setLoading] = useState(false)

  const [mimushavia, setMimushavia] = useState([]);
  const [vedzeb, setVedzeb] = useState([]);
  const [unarebi, setUnarebi] = useState([]);
  const [ena, setEna] = useState([]);
  const [pasuxismgebloba, setPasuxismgebloba] = useState([]);
  const [daxmareba, setDaxmareba] = useState([]);


  const nameRef = useRef(null)
  const lastNameRef = useRef(null)
  const pnRef = useRef(null)
  const asakiRef = useRef(null)
  const mnRef = useRef(null)
  const garemoRef = useRef(null)
  const gadaxdaRef = useRef(null)
  const emailRef = useRef(null)
  const msursRef = useRef(null)
  const detailedRef = useRef(null)
  const detailedRefNonNanny = useRef(null) // New ref for non-nanny form

  const router = useRouter()
  
  const handleInvalid = (event) => {
    event.preventDefault();
    const field = event.target;

    if (!field.validity.valid) {
        field.setCustomValidity('შეავსეთ ფორმა');
    } else {
        field.setCustomValidity('შეავსეთ');
    }
};
    const upload = async (e) => {
        setLoading(true)
        e.preventDefault();
        try {
            // Determine which textarea to use based on the condition
            const detailedValue = vedzeb.some(item => item.includes('ძიძა')) 
            ? detailedRef.current?.value 
            : detailedRefNonNanny.current?.value;
            const connect = await fetch('/api/mshromeli', {
                method: 'POST',
                credentials: 'include',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({
                name: nameRef.current?.value || '',
                pn: pnRef.current?.value || '',
                asaki: asakiRef.current?.value || '',
                mobile: mnRef.current?.value || '',
                qalaqi: qalaqi,
                ubani: ubani,
                ganatleba: ganatleba,
                gamocdileba: gamocdileba,
                profesia: profesia,
                mimushavia: mimushavia,
                saati: saati,
                dge: dge,
                sertifikation: sertifikation,
                molodini: molodini,
                dazgveva: dazgveva,
                gadaxda: gadaxdaRef.current?.value || '',
                vedzeb: vedzeb,
                unarebi: unarebi,
                pasuxismgebloba: pasuxismgebloba,
                daxmareba: daxmareba,
                garemo: garemoRef.current?.value || '',
                lastWage: gadaxda,
                ena: ena,
                msurs: msurs,
                gvari: lastNameRef.current?.value || '',
                detailed: detailedValue,
                smoker: mweveli,
                email: emailRef.current?.value || ''
                })
            })
            if(connect.ok) return router.push(`/thanks/mshromeli?id=${pnRef.current.value}`);
            else {
                setLoading(false)
                return alert('მითითებული პირადი ნომერი უკვე არსებობს ჩვენს ბაზაში')
            }
        }
        catch (err) {
            setLoading(false)
            throw new Error(err.message)
        }
    }


    const handleMsurs = (event) => {
        const { checked } = event.target;
        setMsurs(
          checked ? 'მსურს' : 'არ მსურს'
        );
      };
    
      // Log updated state using useEffect
      useEffect(() => {
        console.log('Updated msurs:', msurs);
      }, [msurs]);


      const handleSmoker = (event) => {
        setMweveli(event.target.value);
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

  const handlePasuxismgebloba = (event) => {
    const { value, checked } = event.target;

    setPasuxismgebloba(prevSelectedOptions =>
      checked
        ? [...prevSelectedOptions, value]
        : prevSelectedOptions.filter(option => option !== value)
    );
  };
  const handleEna = (event) => {
    const { value, checked } = event.target;

    setEna(prevSelectedOptions =>
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

    const handleVedzeb = (event) => {
        const { value, checked } = event.target;

        setVedzeb(prevSelectedOptions =>
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
        link.href = "/Mshromeli.pdf"; // NOT @/public/myfile.pdf
        link.download = "Mshromeli.pdf"; 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    return(
        <section className='my-5 flex flex-col items-center'>
            <form className='flex flex-col justify-center items-center my-5'  
                        onSubmit={upload}>
            <div className='flex flex-col justify-center items-center concern w-3/4' 
            style={{
                background: 'white', 
                borderRadius: '25px',
                padding: '5px'
            }}>
                <h2 className='font-bold my-2 text-center'>საოჯახო მშრომელის კითხვარი</h2>
                <p className='text-justify p-3 text-sm'>თუ ეძებთ სამსახურს, შეავსეთ ფორმა. ასოციაცია ასაქმებს მხოლოდ წერილობით შრომით ხელშეკრულების საფუძველზე. <span onClick={handleDownload} className='font-bold cursor-pointer underline'>გთხოვთ ჩამოტვირთოთ ხელშეკრულება</span> და მონიშნოთ ველი ,,თანახმა ვარ".</p>
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
                {/*meore*/}
                <div className='formDiv1'>
                    <div className='formDiv2'>
                        <label htmlFor='PN'>3. პირადი ნომერი</label>
                        <input id='PN' ref={pnRef} type='text' 
                        minLength={11} 
                        style={{ 
                            WebkitAppearance: 'none !important',
                            margin: 0,
                            MozAppearance: 'textfield !important',
                        }}
                        required/>
                    </div>
                    <div className='formDiv2'>
                        <label htmlFor='asaki'>4. გთხოვთ მიუთითოთ ასაკი</label>
                        <input id='asaki' ref={asakiRef} type='number' min={18} required/>
                    </div>
                </div>
                {/*mesame*/}
                <div className='formDiv1'>
                    <div className='formDiv2'>
                        <label htmlFor='mn'>5. მობილურის ნომერი</label>
                        <input id='mn' ref={mnRef} type='text' minLength={9} required/>
                    </div>
                    <Qalaqi qalaqi={qalaqi} handleQalaqi={handleQalaqi} />
                </div>
                {/*meotxe*/}
                <div className='formDiv1'>
                    <Ubani qalaqi={qalaqi} handleUbani={handleUbani} ubani={ubani} />
                    <div className='formDiv2'>
                        <label htmlFor='ganatleba'>8. მონიშნეთ თქვენი აკადემიური განათლების დონე</label>
                        <select id='ganatleba' value={ganatleba} onChange={handleGanatleba} required>
                            <option value=''>აირჩიეთ</option>
                            <option value='არასრული საშუალო'>არასრული საშუალო</option>
                            <option value='საშუალო'>საშუალო</option>
                            <option value='პროფესიული'>პროფესიული</option>
                            <option value='ბაკალავრი'>ბაკალავრი</option>
                            <option value='მაგისტრი'>მაგისტრი</option>
                            <option value='დოქტორი'>დოქტორი</option>
                        </select>
                    </div>
                </div>
                {/*mexute*/}
                <div className='formDiv1'>
                    <div className='formDiv2'>
                        <label htmlFor='gamocdileba'>9. გთხოვთ მიუთითოთ რამდენი წელს ითვლის თქვენი ოჯახში მუშაობის გამოცდილება?</label>
                        <select id='ganatleba' value={gamocdileba} onChange={handleGamocdileba} required>
                            <option value=''>აირჩიეთ</option>
                            <option value='დამწყები'>დამწყები</option>
                            <option value='0–2 წელი'>0–2 წელი</option>
                            <option value='3–5 წელი'>3–5 წელი</option>
                            <option value='6–9 წელი'>6–9 წელი</option>
                            <option value='10+ წელი'>10+ წელი</option>
                        </select>
                    </div>
                    <Mimushavia handleMimushavia={handleMimushavia} />
                </div>
                {/*meeqvse*/}
                <div className='formDiv1'>
                    <div className='formDiv2'>
                            <label htmlFor='sertifikati'>11. გაქვთ თუ არა განსაკუთრებული საჭიროების მქონე ბავშვთან მუშაობის გამოცდილება?</label>
                            <select id='sertifikati' onChange={(e) => {setGadaxda(e.target.value)}} required>
                                <option value=''>აირჩიეთ</option>
                                <option value='კი'>კი</option>
                                <option value='არა'>არა</option>
                            </select>
                    </div>
                    <Unarebi handleUnarebi={handleUnarebi} />
                </div>
                {/*meshvide*/}
                <div className='formDiv1'>
                    <Vedzeb handleVedzeb={handleVedzeb} />
                    <Ena handleEna={handleEna} />
                </div>
                {/*merve*/}
                {vedzeb.some(item => item.includes('ძიძა')) ? (<>
                <div className='formDiv1'>
                    <Garemo garemoRef={garemoRef}/>
                    <Molodini handlemolodini={handleMolodini} />
                </div>
                {/*mecxre*/}
                <div className='formDiv1'>
                <Saati handleSaati={handleSaati} />
                <Dge handleDge={handleDge} />
                </div>
                {/*meate*/}
                <div className='formDiv1'>
                    <div className='formDiv2'>
                        <label htmlFor='sertifikati'>19. ასოციაცია გთავაზობთ  ჯანდაცვის დაზღვევის პაკეტზე ხელმისაწვდომობას. პაკეტის თვიური ღირებულებაა 60 ლარი. გსურთ თუ არა, თქვენი ხარჯით სადაზღვეო პაკეტით სარგებლობა?</label>
                        <select id='sertifikati' onChange={(e) => {setDazgveva(e.target.value)}} required>
                            <option value=''>აირჩიეთ</option>
                            <option value='კი'>კი</option>
                            <option value='არა'>არა</option>
                        </select>
                    </div>
                    <Daxmareba handleDaxmareba={handleDaxmareba} />
                </div>
                {/*meate*/}
                <div className='formDiv1'>
                <Gadaxda gadaxdaRef={gadaxdaRef} />
                <div className='formDiv2'>
                        <label htmlFor='name, lastname'>22. გთხოვთ გვიამბოთ ვრცლად თქვენი გამოცდილების შესახებ.</label>
                        <textarea ref={detailedRef} required
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
                </div>
                <div className='formDiv1'>
                <div className='formDiv2'>
                        <label htmlFor='ganatleba'>23. ხართ თუ არა მწეველი?</label>
                        <select id='ganatleba' value={mweveli} onChange={handleSmoker} required>
                            <option value=''>აირჩიეთ</option>
                            <option value='დიახ'>დიახ</option>
                            <option value='არა'>არა</option>
                        </select>
                    </div>
                    <div className='formDiv2'>
                        <label>24. თანხმობას ვაცხადებ, ორგანიზაციის საქმიანობის მიზნებისთვის დაამუშავოთ ჩემს მიერ მოწოდებული პერსონალური მონაცემი. 
                        პერსონალური მონაცემი არის ინფორმაცია, რომლითაც შესაძლებელია პირის იდენტიფიცირება. პერსონალური მონაცემებია პირის სახელი, გვარი, პირადი ნომერი, ტელეფონის ნომერი და სხვა. </label>
                        <div>
                            <label>თანახმა ვარ</label>
                            <input className='m-5' type='checkbox' required value='Tanaxma var'/>
                        </div>
                    </div>
                </div>
                <div className='formDiv1'>
                    <div className='formDiv2'>
                        <label className='font-bold'>25. მსურს ძიძების და საოჯახო მშრომელების ასოციაციის წევრობა</label>
                        <div>
                            <label>მსურს</label>
                            <input className='m-5' type='checkbox' value={'მსურს'} ref={msursRef} onChange={handleMsurs}/>
                        </div>
                    </div>
                    <div className='formDiv2'>
                        <label htmlFor='email'>26. გთხოვთ მიუთითოთ ელექტრონული ფოსტა</label>
                        <input id='email' ref={emailRef} type='email'/>
                    </div>
                </div> 
                </>) : (
                    <>
                    
                    <div className='formDiv1'>
                        <Garemo garemoRef={garemoRef}/>
                        <Molodini handlemolodini={handleMolodini} />
                    </div>
                    <div className='formDiv1'>
                    <div className='formDiv2'>
                        <label htmlFor='name, lastname'>17. გთხოვთ აღწეროთ დასაქმებულის პასუხისმგებლობები ისეთი მახასიათებლების მიხედვით, როგორიცაა: სამუშაო პროცესის მოკლე აღწერილობა, სამუშაო საათები, ხელფასი, და სხვ.</label>
                        <textarea ref={detailedRefNonNanny} required
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
                    <div className='formDiv2'>
                        <label htmlFor='email'>18. გთხოვთ მიუთითოთ ელექტრონული ფოსტა</label>
                        <input id='email' ref={emailRef} type='email' />
                    </div>
                    </div>
                    
                    <div className='formDiv1'>
                        <div className='formDiv2'>
                        <label className='font-bold'>19. მსურს ძიძების და საოჯახო მშრომელების ასოციაციის წევრობა</label>
                        <div>
                            <label>მსურს</label>
                            <input className='m-5' type='checkbox' value={'მსურს'} ref={msursRef} onChange={handleMsurs}/>
                        </div>
                    </div>
                    
                    <div className='formDiv2'>
                        <p className='text-sm text-justify '>თანხმობას ვაცხადებ, ორგანიზაციის საქმიანობის მიზნებისთვის დაამუშავოთ ჩემს მიერ მოწოდებული პერსონალური მონაცემი. 
                        პერსონალური მონაცემი არის ინფორმაცია, რომლითაც შესაძლებელია პირის იდენტიფიცირება. პერსონალური მონაცემებია პირის სახელი, გვარი, პირადი ნომერი, ტელეფონის ნომერი და სხვა.</p>
                        <div>
                            <label>თანახმა ვარ</label>
                            <input className='m-5' type='checkbox' required value='Tanaxma var'/>
                        </div>
                    </div>
                    </div> 
                    
                </>
                )}
                
                <div className='w-full flex flex-col justify-center items-center'>
                    {loading? <p>loading...</p> : <input type='submit' 
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
                        value='გააგზავნე'/>
                    }
                </div>
            </form>
        </section>
    )
}