import {useState, useEffect, useRef} from 'react'
import Link from "next/link"
import {Match} from './match'
import {Comment, GetComments} from './comment/comment'
import Edit from './edit/ojaxi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import {OjaxiOther} from './other'

export default function Ojaxi(props){
    const [mshromeli, setMshromeli] = useState([])
    const [filteredMshromeli, setFilteredMshromeli] = useState([])
    const [hide, setHide] = useState(null)
    const [com, setCom] = useState(null)
    const [del, setDel] = useState(false)

    const admin = props.admin

    const pnRef = useRef(null)

    const toggleCom = (mobile) => {
        setCom(com === mobile ? null : mobile); // Toggle visibility for the clicked item
    };
    const toggleHide = (mobile) => {
        setHide(hide === mobile ? null : mobile); // Toggle visibility for the clicked item
    };

    const getMshromeli = async () => {
        try {
            const connect = await fetch('/api/sxvaganojaxi', {
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

    const match = async (e) => {
        try{
            const connect = await fetch('api/ojaxi', {
                method: 'PUT',
                credentials: 'include',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({
                    ojaxiid: e,
                    pn: pnRef.current.value
                })
            })

            if(connect.ok) {getMshromeli()}
            else alert('ვერ მოიძებნა მშრომელი!')
        }
        catch(err){
            throw new Error(err.message)
        }
    }

    const deleteMatch = async (match) =>{
        try{
            const connect = await fetch('api/ojaxi', {
                method: 'DELETE',
                credentials: 'include',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({
                    pn: match
                })
            })
            if(connect.ok) return getMshromeli();
                else alert('შეცდომა!')
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
                (!props.filter?.qalaqi || item.qalaqi?.toLowerCase().includes(props.filter.qalaqi.toLowerCase())) &&
        (!props.filter?.ubani || item.ubani?.toLowerCase().includes(props.filter.ubani.toLowerCase())) &&
        (!props.filter?.ganatleba || item.ganatleba?.toLowerCase().includes(props.filter.ganatleba.toLowerCase())) &&
        (!props.filter?.profesia || item.profesia?.toLowerCase().includes(props.filter.profesia.toLowerCase())) &&
        (!props.filter?.gamocdileba || item.gamocdileba?.toLowerCase().includes(props.filter.gamocdileba.toLowerCase())) &&
        (!props.filter?.vedzeb || item.vedzeb?.toLowerCase().includes(props.filter.vedzeb.toLowerCase())) &&
        (!props.filter?.saati || item.saati?.toLowerCase().includes(props.filter.saati.toLowerCase())) &&
        (!props.filter?.dge || item.dge?.toLowerCase().includes(props.filter.dge.toLowerCase())) &&
        (!props.filter?.molodini || item.xelfasi?.includes(props.filter.molodini.toLowerCase())) &&
        (!props.filter?.sertifikati || item.sertifikati?.toLowerCase().includes(props.filter.sertifikati.toLowerCase())) &&
        (!props.filter?.dazgveva || item.dazgveva?.toLowerCase().includes(props.filter.dazgveva.toLowerCase())) &&
        (!props.filter?.name || item.saxeligvari?.toLowerCase().includes(props.filter.name.toLowerCase())) &&
        (!props.filter?.pn || String(item.ojaxiid).includes(props.filter.pn)) &&
        (!props.filter?.match || String(item.match)?.toLowerCase().includes(props.filter.match.toLowerCase())) &&
        (!props.filter?.gvari || item.gvari?.toLowerCase().includes(props.filter.gvari.toLowerCase()))
    );
        });
        setFilteredMshromeli(filtered);
    }, [props.filter, mshromeli]);

    return(
        <div className='mx-5 flex flex-col items-center w-full'>
            <h1 style={{fontSize: '20px'}} className='my-4'>ოჯახი</h1>
            <p>მოიძებნა: {filteredMshromeli.length}</p>
            {filteredMshromeli.length > 0 ?
            <div className='overflow-y-auto vhDiv' >
                {filteredMshromeli.map((item, index) => (
                    <div className='flex flex-col items-center shortInfo bg-white py-2 my-3' key={index}
                    style={item.match !== null ? {background: '#72c76d'} : {background: 'white'}}>
                        
                        <div className='flex flex-row flex-nowrap justify-center'>
                            <div className='flex flex-col w-full'>
                                <p className='font-bold'>ID: {item.ojaxiid}</p>
                                <p className='font-bold'>{item.saxeligvari} {item.gvari}</p>
                                <p><span className='font-bold'>მობილური:</span> <a href={`tel:${item.mobiluri}`}>{item.mobiluri}</a></p>
                                <p>{item.qalaqi}, {item.ubani}</p>
                                <p><span className='font-bold'>გამოცდილება:</span> {item.gamocdileba}</p>
                                <p><span className='font-bold'>განათლება:</span> {item.akadganatleba}</p>
                                <p><span className='font-bold'>პროფესია:</span> {item.profesia}</p>
                                {/*<p><span className='font-bold'>ხელფასი: </span>{item.xelfasi}</p>*/}
                            </div>
                            <div className='flex flex-col w-full'>
                                <p><span className='font-bold'>საწევრო: </span>{item.gadaxda}</p>
                                <p><span className='font-bold'>სერთიფიკატი: </span>{item.sertifikati}</p>
                                <p><span className='font-bold'>დაზღვევა: </span>{item.dazgveva}</p>
                                <p><span className='font-bold'>დღე: </span>{item.dge}</p>
                                <p><span className='font-bold'>საათი: </span>{item.saati}</p>
                                <p><span className='font-bold'>ვაკანსია: </span>{item.vedzeb}</p>
                                <p><span className='font-bold'>დაკავშირებულია: </span>{item.match}</p>
                            </div>
                        </div>
                        <p><span className='font-bold'>ვისარგებლებ: </span>{item.visargebleb.map((i, index) => (<p key={index}>{i}, </p>))} </p>
                        <a href={item.linki} target='_blank'><p><span className='font-bold'>ლინკი</span></p></a>
                        <GetComments admin={admin} id={item.ojaxiid} />
                        <div className='flex flex-row justify-center items-center'>
                        <Link href={`/admin/ojaxi?id=${item.ojaxiid}`} target='_blank' className='bg-black text-white px-2  rounded-xl text-center items-center flex'>ვრცლად</Link>
                            <button 
                            className='rounded-xl px-2  my-2 mx-1' 
                            style={{border: '1px solid black'}}                        
                            onClick={() => toggleHide(item.mobiluri)} // Set hide to the current item's mobile
                            >დააკავშირე</button>
                            <button 
                            className='rounded-xl px-2 my-2 bg-green-900 text-white '                 
                            onClick={() => toggleCom(item.mobiluri)} // Set hide to the current item's mobile
                            >კომენტარი</button>
                        <OjaxiOther id={item.ojaxiid} />
                        </div>
                        {hide === item.mobiluri
                        ?
                        <div className='dakavshireba'>
                            <div className='flex flex-col justify-center items-center bg-white rounded-xl p-10'>
                                <h1 className='text-xl font-bold my-3'>დაკავშირება მზრუნველთან</h1>
                                <h2 className='text-l my-3'>ოჯახი: {item.saxeligvari}</h2>
                                {item.match ? 
                                <div>
                                    <p>დაკავშირებულია: {item.match}</p>
                                    <div className='flex flex-row'>
                                    {!del ? <button 
                                    onClick={()=> setDel(true)}
                                    className='bg-red-500 text-white py-1 px-3 rounded-xl mx-3 my-6 text-center'>წაშალე კავშირი</button>
                                    :
                                    <div className='flex flex-row justify-around my-6'>
                                        <button onClick={() => setDel(false)} className='text-green-700 mx-3'>უკან</button>
                                        <button onClick={(e) => {e.preventDefault(); deleteMatch(item.match); }} className='text-red-700 mx-3'>წაშლა</button>
                                    </div>
                                    }
                                    <Match id={item.ojaxiid} pn={item.match}/>
                                    </div>
                                </div>
                                :
                                <form className='flex flex-col justify-center items-center'
                                onSubmit={(e) => {e.preventDefault(); match(item.ojaxiid) }}>
                                    <label htmlFor='match'>ჩაწერეთ მზრუნველის პირადი ნომერი</label>
                                    <input type='text' ref={pnRef} required/>
                                    <input type='submit'
                                    className='cursor-pointer'
                                    value='დაკავშირება' />
                                </form>
                                }
                                <button className='text-red-500' onClick={() => setHide(null)}>გათიშვა</button>
                            </div>
                        </div>
                        : null
                        }
                        {
                            com === item.mobiluri ?
                            <div className="dakavshireba" 
                            style={{width: '100%', height: '100%'}}>
                                <Comment admin={admin} id={item.ojaxiid}/>
                                <button className='bg-red-800 text-white py-1 px-3 rounded-xl my-5' onClick={() => toggleCom(null)}>გათიშვა</button>
                            </div>
                            : null
                        }
                    </div>
                ))}
            </div>
            : <p>არავინ მოიძებნა</p> }
        </div>
    )
}

export const Detailed = (props) => {
    const [work, setWork] = useState(false)
    const [edit, setEdit] = useState(false)

    const user = props.item
    const admin = props.admin
    return(
        <>
        <h1 style={{fontSize: '22px', padding: '5px 10px', fontFamily: 'nino', textAlign: 'center'}}>განაცხადი ოჯახში დასაქმებაზე</h1>
        <div className='flex flex-row'>
            <p 
            style={{
                margin: '5px 0',
                width: '20px',
                height: '20px',
                borderRadius: '75px',
                border: '1px solid black',
                backgroundColor: props.item.match !== null ? 'green' : 'white'
            }}></p> {admin !== '' && 
                <div>
                    <button onClick={() => setEdit(true)} className='mx-3 font-bold'><FontAwesomeIcon icon={faEdit} />რედაქტირება</button>
                </div>
                }
            </div>
            {admin !== '' && 
                <div>
                    <p>ბოლოს რედაქტირებულია {user.admin}-ს მიერ. თარიღი: {user.tarigi}</p>
                </div>
                }
            {edit ? <div className='flex flex-col justify-center items-center'>
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
            :
        <div className='flex flex-col justify-center items-center my-5 sm:flex-row sm:items-start w-10/12 sm:w-6/12' style={{background: 'none'}}>
            <div className='detailedDiv' >
                <p className='font-bold flex flex-col'>1. დამსაქმებლის სახელი, გვარი <span className='px-5 font-normal'>{props.item.saxeligvari}</span></p>
                <p className='font-bold flex flex-col'>2. მისამართი: <span className='px-5 font-normal'>{props.item.qalaqi}, {props.item.ubani}</span></p>
                <p className='font-bold flex flex-col'>2. ანაზღაურება, რომელსაც გადაიხდის:  <span className='px-5 font-normal'>{props.item.xelfasi}</span></p>
                <p className='font-bold flex flex-col'>3. დასაქმებულის სასურველი განათლება: <span className='px-5 font-normal'>{props.item.ganatleba}</span></p>
                <p className='font-bold flex flex-col'>4. დასაქმებულის სასურველი პროფესია: <span className='px-5 font-normal'>{props.item.profesia}</span></p>
                <p className='font-bold flex flex-col'>5.დასაქმებულის სასურველი უნარები:    
                    <span className='px-5 font-normal'>{props.item.unarebi && props.item.unarebi.map((i, index) =>(<span key={index}>{i}, </span>))}</span></p>
                <p className='font-bold flex flex-col'>6. დასაქმებულის პასუხისმგებლობები: 
                    <span className='px-5 font-normal'>{props.item.pasuxismgeblobebi && props.item.pasuxismgeblobebi.map((i, index) =>(<span key={index}>{i}, </span>))} </span></p>
                <p className='font-bold flex flex-col'>7. დასაქმებულის სასურველი გამოცდილება: <span className='px-5 font-normal'>{props.item.gamocdileba}</span></p>
                <p className='font-bold flex flex-col'>8. ეძებს სერთიფიცირებულ საოჯახო მშრომელს: 
                    <span className='px-5 font-normal'>{props.item.sertifikati === '' ? <p>არ არის სავალდებულო</p>: <p>{props.item.sertifikati}</p>}</span></p>
                <p className='font-bold flex flex-col'>9. სთავაზობს ჯანმრთელობის დაზღვევას: <span className='px-5 font-normal'>{props.item.dazgveva}</span></p>
                <p className='font-bold flex flex-col'>10. სურს დაასაქმოს კვირაში: <span className='px-5 font-normal'>{props.item.dge} დღე</span></p>
                <p className='font-bold flex flex-col'>11. სურს დაასაქმოს დღეში: <span className='px-5 font-normal'>{props.item.saati} საათი</span></p>
                <p className='font-bold flex flex-col'>12. კრიტიკული პირობა, რაც შეზღუდავს  სამუშაოს შეთავაზებას: 
                    <span className='px-5 font-normal'>{props.item.gatavisufleba === null ? <span>არ არის დასახელებული</span> : props.item.gatavisufleba }</span></p>
                <p className='font-bold flex flex-col'>13. არასასურველი თვისებები, რომელთა გამოც არ დაასაქმებს: 
                    <span className='px-5 font-normal'>{props.item.tvisebebi === null ? <span>არ არის დასახელებული</span> : props.item.tvisebebi }</span></p>
                <p className='font-bold flex flex-col'>14. სასურველი კომპეტენცია: 
                    <span className='px-5 font-normal'>{props.item.kompetencia === null ? <span>არ არის დასახელებული</span> : props.item.kompetencia }</span></p>
                <p className='font-bold flex flex-col'>15. დასაქმების ხანგრძლივობა:
                    <span className='px-5 font-normal'>{props.item.periodi === null ? <span>არ არის დასახელებული</span> : props.item.periodi }</span></p>
                <p className='font-bold flex flex-col'>16. სურს ასოციაციასთან თანამშრომლობა შემდეგი მიმართულებებით:
                    <span className='px-5 font-normal'>{props.item.visargebleb === null ? <span>არ არის დასახელებული</span> : props.item.visargebleb }</span></p>
                <p className='font-bold flex flex-col'>18. უცხო ენები, რომელთა ცოდნაც სასურველია დასაქმებულისთვის:
                    <span className='px-5 font-normal'>{props.item.ena === null ? <span>არ არის დასახელებული</span> : props.item.ena }</span></p>
                <p className='font-bold flex flex-col'>19. ვაკანსიის ტიპი:
                    <span className='px-5 font-normal'>{props.item.vedzeb === null ? <span>არ არის დასახელებული</span> : props.item.vedzeb }</span></p>
                
                <p className='font-bold flex flex-col'>20. დამატებითი ინფორმაცია:
                    <span className='px-5 font-normal'>{props.item.damatebit === null ? <span>არ არის დასახელებული</span> : props.item.damatebit }</span></p>
                <p className='font-bold flex flex-col'>21. ვაკანსიის ტიპი:
                    <span className='px-5 font-normal'>{props.item.vedzeb === null ? <span>არ არის დასახელებული</span> : props.item.vedzeb }</span></p>
            </div>
        </div>
        }   
        </>
        )
}