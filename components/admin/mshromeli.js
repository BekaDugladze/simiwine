import {useState, useEffect, useRef} from 'react'
import Link from "next/link"
import { UserComment, GetUserComments} from './comment/usercomment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faFileExcel } from '@fortawesome/free-solid-svg-icons'
import Edit from './edit/mshromeli'
import { MshromeliOther } from './other'
import {OjaxiForMshromeli} from '@/components/admin/detailed/ojaxi'

export default function Mshromeli(props){
    const [mshromeli, setMshromeli] = useState([])
    const [filteredMshromeli, setFilteredMshromeli] = useState([])
    const [com, setCom] = useState(null)
    const [del, setDel] = useState(false)

    const admin = props.admin
    
    const toggleCom = (mobile) => {
        setCom(com === mobile ? null : mobile); // Toggle visibility for the clicked item
    };

    const getMshromeli = async () => {
        try {
            const connect = await fetch('/api/mshromeli', {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            });

            if (!connect.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await connect.json();
            setMshromeli(data); // Update state with fetched data
        } catch (err) {
            console.error('Error fetching data:', err.message);
        }
    };

    const transfer = async () => {
        try{
            const connect = await fetch('api/excell', {
                method: 'GET',
                credentials: 'include',
            })
            if (connect.ok) {
                const date = new Date()
                const year = date.getFullYear();
                const month = date.getMonth() + 1; // Months are zero-based, so add 1
                const day = date.getDate();

                const blob = await connect.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `mshromeli-${day}-${month}-${year}.xlsx`; // Set the file name
                document.body.appendChild(a);
                a.click();
                a.remove();
            } else {
                console.error('Failed to download file');
            }
        }
        catch(err){
            throw new Error(err.message)
        }
    }

    useEffect(() => {
        getMshromeli();
    }, []); 

    useEffect(() => {
        const filtered = mshromeli.filter(item => {
            return (
                (!props.filter.qalaqi || item.qalaqi.toLowerCase().includes(props.filter.qalaqi.toLowerCase())) &&
                (!props.filter.ubani || item.ubani.toLowerCase().includes(props.filter.ubani.toLowerCase())) &&
                (!props.filter.ganatleba || item.akadganatleba.toLowerCase().includes(props.filter.ganatleba.toLowerCase())) &&
                (!props.filter.profesia || item.profesia.toLowerCase().includes(props.filter.profesia.toLowerCase())) &&
                (!props.filter.vedzeb || item.vedzeb.some((i) => i.includes(props.filter.vedzeb.toLowerCase()))) &&
                (!props.filter.saati || item.saati.toLowerCase().includes(props.filter.saati.toLowerCase())) &&
                (!props.filter.dge || item.dge.toLowerCase().includes(props.filter.dge.toLowerCase())) &&
                (!props.filter.molodini || item.molodini.toLowerCase().includes(props.filter.molodini.toLowerCase())) &&
                (!props.filter.dazgveva || item.dazgveva.toLowerCase().includes(props.filter.dazgveva.toLowerCase())) &&
                (!props.filter.name || item.saxeligvari.toLowerCase().includes(props.filter.name.toLowerCase())) &&
                (!props.filter.pn || item.piradinomeri.toLowerCase().includes(props.filter.pn.toLowerCase())) &&
                (!props.filter.match || String(item.match).toLowerCase().includes(props.filter.match.toLowerCase()))  &&
                (!props.filter.gvari || item.gvari?.toLowerCase().includes(props.filter.gvari.toLowerCase())) &&
                (!props.filter?.mobiluri || item.mobiluri?.toLowerCase().includes(props.filter.mobiluri.toLowerCase()))
            );
        });
        setFilteredMshromeli(filtered);
    }, [props.filter, mshromeli]);

    return(
        <div className='mx-5 flex flex-col items-center w-full'>
            <h1 style={{fontSize: '20px'}} className='my-4'>საოჯახო მშრომელი</h1>
            <p>მოიძებნა: {filteredMshromeli.length}</p>
            <button onClick={transfer}><FontAwesomeIcon icon={faFileExcel} /> Excell</button>
            {filteredMshromeli.length > 0 ?
            <div className='overflow-y-auto vhDiv' >
                {filteredMshromeli.length > 0 && <>
                {filteredMshromeli.map((item, index) => (
                    <div className='flex flex-col items-center shortInfo py-2 my-3' key={index} 
                    style={item.match !== null ? {background: '#72c76d'} : {background: 'white'}}>
                        
                        <div className='flex flex-row flex-nowrap justify-center'>
                            <div className='flex flex-col w-full' >
                                <p className='font-bold' style={{fontFamily: 'georgia'}}>{item.saxeligvari},    {item.gvari}</p>
                                <p><span className='font-bold'>მობილური:</span> <a href={`tel:${item.mobiluri}`}>{item.mobiluri}</a></p>
                                <p><span className='font-bold'>პ/ნ:</span> {item.piradinomeri}</p>
                                <p><span className='font-bold'>ასაკი:</span> {item.asaki} წლის</p>
                                <p>{item.qalaqi}, {item.ubani}</p>
                                <p><span className='font-bold'>გამოცდილება:</span> {item.gamocdileba}</p>
                                <p><span className='font-bold'>განათლება:</span> {item.akadganatleba}</p>
                                <p><span className='font-bold'>საწევრო: </span>{item.sawevro}</p>
                            </div>
                            <div className='flex flex-col w-full'>
                                <p><span className='font-bold'>ხელფასი: </span>{item.molodini}</p>
                                <p><span className='font-bold'>დაზღვევა: </span>{item.dazgveva}</p>
                                <p><span className='font-bold'>დღე: </span>{item.dge}</p>
                                <p><span className='font-bold'>საათი: </span>{item.saati}</p>
                                <p><span className='font-bold'>ვაკანსია: </span> 
                                {item.vedzeb && item.vedzeb.length > 0 && (
                                    <>
                                    {item.vedzeb.map((i, index) => (
                                        <span className='mx-1' key={index}>{i}</span>
                                    ))}
                                    </>
                                )}</p>
                                <p><span className='font-bold'>დაკავშირებულია: </span>{item.match}</p>
                                <p><span className='font-bold'>ბოლო თარიღი: </span>{item.tarigi}</p>
                            </div>
                        </div>
                            <p><span className='font-bold'>ვისარგებლებ: </span>
                            {item.daxmareba && item.daxmareba.length > 0 && (
                                    <>
                                    {item.daxmareba.map((i, index) => (
                                        <span className='mx-1 text-sm' key={index}>{i}</span>
                                    ))}
                                    </>
                                )}</p>
                            <a href={item.link} target='_blank'><p><span className='font-bold'>ლინკი</span></p></a>
                            
                        <GetUserComments admin={admin} id={item.piradinomeri} filteredMshromeli={filteredMshromeli} />
                        <div className='flex flex-row justify-center items-center'>
                            <Link href={`/admin/user?pn=${item.piradinomeri}`} target='_blank' className='bg-black text-white px-3 rounded-xl text-center'>ვრცლად</Link>
                            <button 
                            className='rounded-xl px-2  bg-green-900 text-white mx-2'                 
                            onClick={() => toggleCom(item.piradinomeri)} // Set hide to the current item's mobile
                            >კომენტარი</button>
                            <MshromeliOther id={item.piradinomeri} />
                        </div>
                        {
                            com === item.piradinomeri ?
                            <div className="dakavshireba" 
                            style={{width: '100%', height: '100%'}}>
                                <UserComment admin={admin} id={item.piradinomeri}/>
                                <button className='bg-red-800 text-white py-1 px-3 rounded-xl my-5' onClick={() => toggleCom(null)}>გათიშვა</button>
                            </div>
                            : null
                        }
                    </div>
                ))}
                </>
            }
            </div>
            : <p>არავინ მოიძებნა</p> }
        </div>
    )
}

export const Detailed = (props) => {
    const [work, setWork] = useState(false)
    const [edit, setEdit] = useState(false)
    const [hide, setHide] = useState(null)
    const [com, setCom] = useState(null)
    const [del, setDel] = useState(false)

    const user = props.item
    const admin = props.admin
    const filteredMshromeli = ''
    
    const pnRef = useRef(null)

    const toggleCom = (mobile) => {
        setCom(com === mobile ? null : mobile); // Toggle visibility for the clicked item
    };
    const toggleHide = (mobile) => {
        setHide(hide === mobile ? null : mobile); // Toggle visibility for the clicked item
    };

    
    const deleteUser = async (e) => {
        e.preventDefault()
        try{
            const connect = await fetch('/api/mshromeli/user', {
                method: 'DELETE',
                credentials: 'include',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({
                    pn: user.piradinomeri
                })
            })
            if(connect.ok) alert('აპლიკანტი წაიშალა!')
                else alert('წაშლა ვერ მოხერხდა')
        }
        catch(err){
            throw new Error(err)
        }
    }

    return(
        <div className='flex flex-row justify-center' style={{width: '90vw'}}>
            <div className='flex flex-col items-center' style={admin !== '' ? {width: '100%'} : {width: 'auto'}}>
        <h1 style={{fontSize: '22px', padding: '5px 10px', fontFamily: 'nino', textAlign: 'center'}}>საოჯახო მშრომელის რეზიუმე</h1>
        <div className='flex flex-row'>
            <p 
                style={{
                    margin: '5px 0',
                    width: '20px',
                    height: '20px',
                    borderRadius: '75px',
                    border: '1px solid black',
                    backgroundColor: props.item.match !== null ? 'green' : 'white'
                }}></p>
            {props.item.dasaqmebuli || props.item.sxvagan ? <p 
                style={{
                    margin: '5px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '75px',
                    border: '1px solid black',
                    backgroundColor: 'purple'
                }}></p>
            : null}
            {admin !== '' && 
            <div className='flex flex-row mx-5'>
                <button onClick={() => setEdit(true)} className='mx-3 font-bold'><FontAwesomeIcon icon={faEdit} />რედაქტირება</button>
                <button onClick={deleteUser} className='mx-5 text-red-800 cursor-pointer'>აპლიკანტის წაშლა</button>
                
                <button 
                className='rounded-xl px-2 my-2 bg-green-900 text-white '                 
                onClick={() => toggleCom(props.item.mobiluri)} // Set hide to the current item's mobile
                >კომენტარი</button>
            </div>
            }
        </div>
            {admin !== '' && 
                <div>
                    <p>ბოლოს რედაქტირებულია {user.shemsworebeli}-ს მიერ. თარიღი: {user.tarigi}</p>
                </div>
                }

            {admin !== '' && <GetUserComments admin={admin} id={user.piradinomeri} filteredMshromeli={filteredMshromeli} />}
            
                        {
                            com === user.mobiluri ?
                            <div className="dakavshireba" 
                            style={{width: '100%', height: '100%'}}>
                                <UserComment admin={admin} id={user.piradinomeri}/>
                                <button className='bg-red-800 text-white py-1 px-3 rounded-xl my-5' onClick={() => toggleCom(null)}>გათიშვა</button>
                            </div>
                            : null
                        }
        {edit ? 
        <div className='flex flex-col'>
            <div className='flex flex-col justify-center items-center'>
            <button  style={{
                borderRadius: '25px',
                padding: '1px 5px',
                fontFamily: 'nino',
                margin: '10px',
                color: 'white',
                background: '#ab1119',
                textAlign: 'center',
                width: 'fit-content'
            }} onClick={() => setEdit(false)}>გაუქმება</button>
            <Edit user={user} admin={admin} edit={edit}/>
            </div>
        </div>
        :
        <div className='flex flex-col justify-center items-center w-full my-5 sm:w-8/12 sm:flex-row sm:items-start' 
        style={{background: 'none', height: admin !== '' && '60vh', width: '100%', overflowY: 'auto'}}>
            <div className='detailedDiv ' >
            <h2 className='font-bold'>(თქვენ კითხულობთ ძიძების და საოჯახო მშრომელების ასოციაციის წევრის რეზიუმეს,
რომელსაც სურს დასაქმდეს ოჯახში)</h2>
            <p className='font-bold flex flex-col'>1. სახელი: <span className='px-5 font-normal'>{props.item.saxeligvari}</span></p>
                {admin !== '' && <p className='font-bold flex flex-col'>გვარი: <span className='px-5 font-normal'>{props.item.gvari}</span></p>}
                {admin !== '' && <p className='font-bold flex flex-col'>მობილური: <span className='px-5 font-normal'>{props.item.mobiluri}</span></p>}
                {admin !== '' && <p className='font-bold flex flex-col'>ელექტრონული ფოსტა: <span className='px-5 font-normal'>{props.item.email}</span></p>}
                {admin !== '' && <p className='font-bold flex flex-col'>პ/ნ: <span className='px-5 font-normal'>{props.item.piradinomeri}</span></p>}
                {admin !== '' && <p className='font-bold flex flex-col'>ასაკი: <span className='px-5 font-normal'>{props.item.asaki}</span></p>}
                {admin !== '' && <p className='font-bold flex flex-col'>ისარგებლებს: <span className='px-5 font-normal'>{props.item.visargebleb}</span></p>}
                {admin !== '' && <p className='font-bold flex flex-col'>გადაიხდის: <span className='px-5 font-normal'>{props.item.gadaxda}</span></p>}
                {admin !== '' && <p className='font-bold flex flex-col'>სურს ასოციაციის წევრობა: <span className='px-5 font-normal'>{props.item.msurs}</span></p>}
                {admin !== '' && <p className='font-bold flex flex-col'>არის თუ არა მწეველი: <span className='px-5 font-normal'>{props.item.smoker}</span></p>}
            <p className='font-bold flex flex-col'>2. მისამართი: <span className='px-5 font-normal'>{props.item.qalaqi}, {props.item.ubani}</span></p>
            <p className='font-bold flex flex-col'>3. განათლების ხარისხი: <span className='px-5 font-normal'>{props.item.akadganatleba}</span></p>
            <p className='font-bold flex flex-col'>4. განსაკუთრებული საჭიროების მქონე ბავშვთან მუშაობის გამოცდილება: <span className='px-5 font-normal'>{props.item.winaxelfasi}</span></p>
            <p className='font-bold flex flex-col'>5.დამატებითი უნარები:
                <span className='px-5 font-normal'>{props.item.unarebi.map((i, index)=> (
                    <span className='flex flex-col' key={index}>{i}; </span>
                ))}
                </span></p>
            <p className='font-bold flex flex-col'>6. სურს დასაქმდეს, როგორც:
                <span className='px-5 font-normal'>{props.item.vedzeb.map((i, index)=> (
                    <span className='flex flex-col' key={index}>{i}; </span>
                ))}</span></p>
            <p className='font-bold flex flex-col'>7. საოჯახო შრომაში დასაქმების ხანგრძლივობა: <span className='px-5 font-normal'>{props.item.gamocdileba}</span></p>
            <p className='font-bold flex flex-col'>8. ძიძის სამუშაო გამოცდილება:
                <span className='px-5 font-normal'>{props.item.mimushavia.map((i, index)=> (
                    <span className='flex flex-col' key={index}>{i}; </span>
                ))}</span></p>
            <p className='font-bold flex flex-col'>9.სურს ჰქონდეს ჯანმრთელობის დაზღვევა: <span className='px-5 font-normal'>{props.item.dazgveva}</span></p>
            <p className='font-bold flex flex-col'>10.სასურველი სამუშაო დღეები კვირის მანძილზე: <span className='px-5 font-normal'>{props.item.dge} დღე</span></p>
            <p className='font-bold flex flex-col'>11.სასურველი სამუშაო სათების რაოდენობა დღეში: <span className='px-5 font-normal'>{props.item.saati}</span></p>
            <p className='font-bold flex flex-col'>12. სასურველი სამუშაო გარემოს აღწერილობა: <span className='px-5 font-normal'>{props.item.garemo}</span></p>
            <p className='font-bold flex flex-col'>13. საოჯახო მშრომელი ასოციაციასთან თანამშრომლობს შემდეგი მიმართულებებით:
                <span className='px-5 font-normal'>{props.item.daxmareba === null ? <span>არ არის დასახელებული</span> : props.item.daxmareba.map((e, index) => (
                        <div className='flex flex-col' key={index}><p >{e}; </p></div>
                    )) }</span></p>
            <p className='font-bold flex flex-col'>14. სასურველი სამუშაო გარემოს აღწერილობა: <span className='px-5 font-normal'>{props.item.damatebit}</span></p>
            
            </div>
        </div>
        }
        </div>
        {admin !== '' && <OjaxiForMshromeli />}
        </div>
        )
}