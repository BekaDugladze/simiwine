import {useState, useEffect, useRef} from 'react'
import Link from "next/link"
import {Match} from './match'
import {Comment, GetComments} from './comment/comment'
import Edit from './edit/ojaxi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faFileExcel } from '@fortawesome/free-solid-svg-icons'
import {OjaxiOther} from './other'
import {MshromeliForOjaxi} from '@/components/admin/detailed/mshromeli'

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
            const connect = await fetch('/api/ojaxi', {
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
    const transfer = async () => {
        try{
            const connect = await fetch('api/excell', {
                method: 'POST',
                credentials: 'include',
                headers: {'content-type': 'application/json'}
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
                a.download = `ojaxi-${day}-${month}-${year}.xlsx`; // Set the file name
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
                (!props.filter?.qalaqi || item.qalaqi?.toLowerCase().includes(props.filter.qalaqi.toLowerCase())) &&
        (!props.filter?.ubani || item.ubani?.toLowerCase().includes(props.filter.ubani.toLowerCase())) &&
        (!props.filter?.ganatleba || item.ganatleba?.toLowerCase().includes(props.filter.ganatleba.toLowerCase())) &&
        (!props.filter?.profesia || item.profesia?.toLowerCase().includes(props.filter.profesia.toLowerCase())) &&
        (!props.filter?.vedzeb || item.vedzeb?.toLowerCase().includes(props.filter.vedzeb.toLowerCase())) &&
        (!props.filter?.saati || item.saati?.toLowerCase().includes(props.filter.saati.toLowerCase())) &&
        (!props.filter?.dge || item.dge?.toLowerCase().includes(props.filter.dge.toLowerCase())) &&
        (!props.filter?.dazgveva || item.dazgveva?.toLowerCase().includes(props.filter.dazgveva.toLowerCase())) &&
        (!props.filter?.name || item.saxeligvari?.toLowerCase().includes(props.filter.name.toLowerCase())) &&
        (!props.filter?.pn || String(item.ojaxiid).includes(props.filter.pn)) &&
        (!props.filter?.match || String(item.match)?.toLowerCase().includes(props.filter.match.toLowerCase())) &&
        (!props.filter?.gvari || item.gvari?.toLowerCase().includes(props.filter.gvari.toLowerCase())) &&
        (!props.filter?.mobiluri || item.mobiluri?.toLowerCase().includes(props.filter.mobiluri.toLowerCase()))
    );
        });
        setFilteredMshromeli(filtered);
    }, [props.filter, mshromeli]);

    return(
        <div className='mx-5 flex flex-col items-center w-full'>
            <h1 style={{fontSize: '20px'}} className='my-4'>ოჯახი</h1>
            <p>მოიძებნა: {filteredMshromeli.length}</p>
            <button onClick={transfer}><FontAwesomeIcon icon={faFileExcel} /> Excell</button>
            {filteredMshromeli.length > 0 ?
            <div className='overflow-y-auto vhDiv' >
                {filteredMshromeli.map((item, index) => (
                    <div className='flex flex-col items-center shortInfo bg-white py-2 my-3' key={index}
                    style={item.match !== null ? {background: '#72c76d'} : {background: 'white'}}>
                        
                        <div className='flex flex-row flex-nowrap justify-center'>
                            <div className='flex flex-col w-full'>
                                <p className='font-bold'>ID: {item.ojaxiid}</p>
                                <p className='font-bold'>{item.saxeligvari},    {item.gvari}</p>
                                <p><span className='font-bold'>მობილური:</span> <a href={`tel:${item.mobiluri}`}>{item.mobiluri}</a></p>
                                <p>{item.qalaqi}, {item.ubani}</p>
                                <p><span className='font-bold'>გამოცდილება:</span> {item.gamocdileba}</p>
                                <p><span className='font-bold'>ბავშვის ასაკი:</span> {item.profesia}</p>
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
                                <p><span className='font-bold'>ბოლო თარიღი: </span>{item.tarigi}</p>
                            </div>
                        </div>
                        <p><span className='font-bold'>ვისარგებლებ: </span>{item.visargebleb.map((i, index) => (<p key={index}>{i}, </p>))} </p>
                        <a href={item.linki} target='_blank'><p><span className='font-bold'>ლინკი</span></p></a>
                        <GetComments admin={admin} id={item.ojaxiid} filteredOjaxi={filteredMshromeli} />
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
    
    const deleteUser = async (e) => {
        e.preventDefault()
        try{
            const connect = await fetch('/api/ojaxi/user', {
                method: 'DELETE',
                credentials: 'include',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({
                    pn: user.ojaxiid
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
        <h1 style={{fontSize: '22px', padding: '5px 10px', fontFamily: 'nino', textAlign: 'center'}}>ვაკანსია ოჯახში დასაქმებაზე</h1>
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
                    <button onClick={deleteUser} className='mx-5 text-red-800 cursor-pointer'>აპლიკანტის წაშლა</button>
                    <button 
                            className='rounded-xl px-2  my-2 mx-1' 
                            style={{border: '1px solid black'}}                        
                            onClick={() => toggleHide(props.item.mobiluri)} // Set hide to the current item's mobile
                            >დააკავშირე</button>
                            <button 
                            className='rounded-xl px-2 my-2 bg-green-900 text-white '                 
                            onClick={() => toggleCom(props.item.mobiluri)} // Set hide to the current item's mobile
                            >კომენტარი</button>
                </div>
                }
            </div>
            {admin !== '' && 
                <div>
                    <p>ბოლოს რედაქტირებულია {user.admin}-ს მიერ. თარიღი: {user.tarigi}</p>
                </div>
                }
                
            {admin !== '' && <GetComments admin={admin} id={user.ojaxiid} filteredOjaxi={filteredMshromeli} />}

                    {hide === props.item.mobiluri
                        ?
                        <div className='dakavshireba'>
                            <div className='flex flex-col justify-center items-center bg-white rounded-xl p-10'>
                                <h1 className='text-xl font-bold my-3'>დაკავშირება მზრუნველთან</h1>
                                <h2 className='text-l my-3'>ოჯახი: {user.saxeligvari}</h2>
                                {user.match ? 
                                <div>
                                    <p>დაკავშირებულია: {user.match}</p>
                                    <div className='flex flex-row'>
                                    {!del ? <button 
                                    onClick={()=> setDel(true)}
                                    className='bg-red-500 text-white py-1 px-3 rounded-xl mx-3 my-6 text-center'>წაშალე კავშირი</button>
                                    :
                                    <div className='flex flex-row justify-around my-6'>
                                        <button onClick={() => setDel(false)} className='text-green-700 mx-3'>უკან</button>
                                        <button onClick={(e) => {e.preventDefault(); deleteMatch(user.match); }} className='text-red-700 mx-3'>წაშლა</button>
                                    </div>
                                    }
                                    <Match id={user.ojaxiid} pn={user.match}/>
                                    </div>
                                </div>
                                :
                                <form className='flex flex-col justify-center items-center'
                                onSubmit={(e) => {e.preventDefault(); match(user.ojaxiid) }}>
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
                            com === user.mobiluri ?
                            <div className="dakavshireba" 
                            style={{width: '100%', height: '100%'}}>
                                <Comment admin={admin} id={user.ojaxiid}/>
                                <button className='bg-red-800 text-white py-1 px-3 rounded-xl my-5' onClick={() => toggleCom(null)}>გათიშვა</button>
                            </div>
                            : null
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
        <div className='flex flex-col justify-center items-center my-5 sm:flex-row sm:items-start w-10/12 sm:w-6/12' 
        style={{background: 'none', height: admin !== '' && '60vh', width: '100%', overflowY: 'auto'}}>
            <div className='detailedDiv' >
                <h2 className='font-bold'>(თქვენ კითხულობთ ოჯახის მიერ ასოციაციის ბაზაში რეგისტრირებულ ვაკანსიას)</h2>
                <p className='font-bold flex flex-col'>1. დამსაქმებლის სახელი: <span className='px-5 font-normal'>{props.item.saxeligvari}</span></p>
                {admin !== '' && <p className='font-bold flex flex-col'>დამსაქმებლის გვარი: <span className='px-5 font-normal'>{props.item.gvari}</span></p>}
                {admin !== '' && <p className='font-bold flex flex-col'>ელექტრონული ფოსტა: <span className='px-5 font-normal'>{props.item.email}</span></p>}
                {admin !== '' && <p className='font-bold flex flex-col'>მობილური: <span className='px-5 font-normal'>{props.item.mobiluri}</span></p>}
                {admin !== '' && <p className='font-bold flex flex-col'>ოჯახის ID: <span className='px-5 font-normal'>{props.item.ojaxiid}</span></p>}
                {admin !== '' && <p className='font-bold flex flex-col'>ისარგებლებს: <span className='px-5 font-normal'>{props.item.visargebleb}</span></p>}
                {admin !== '' && <p className='font-bold flex flex-col'>გადაიხდის: <span className='px-5 font-normal'>{props.item.gadaxda}</span></p>}
                <p className='font-bold flex flex-col'>2. მისამართი: <span className='px-5 font-normal'>{props.item.qalaqi}, {props.item.ubani}</span></p>
                <p className='font-bold flex flex-col'>3. ვაკანსიის ტიპი:
                    <span className='px-5 font-normal'>{props.item.vedzeb === null ? <span>არ არის დასახელებული</span> : props.item.vedzeb }</span></p>
                <p className='font-bold flex flex-col'>4.1. ბავშვის ასაკი: <span className='px-5 font-normal'>{props.item.profesia}</span></p>
                <p className='font-bold flex flex-col'>4.2. ბავშვების რაოდენობა ოჯახში: <span className='px-5 font-normal'>{props.item.bavshvebi}</span></p>
                <p className='font-bold flex flex-col'>5. ანაზღაურება, რომელსაც გადაიხდის:  <span className='px-5 font-normal'>{props.item.xelfasi}</span></p>
                <p className='font-bold flex flex-col'>6. დასაქმებულის სასურველი უნარები:
                    <span className='px-5 font-normal'>{props.item.unarebi && props.item.unarebi.map((i, index) =>(<span key={index}>{i}; </span>))}</span></p>
                <p className='font-bold flex flex-col'>7. დასაქმებულის პასუხისმგებლობები:
                    <span className='px-5 font-normal'>{props.item.pasuxismgeblobebi && props.item.pasuxismgeblobebi.map((i, index) =>(<span key={index}>{i}; </span>))} </span></p>
                <p className='font-bold flex flex-col'>8. დასაქმებულის სასურველი გამოცდილება: <span className='px-5 font-normal'>{props.item.gamocdileba} (წელი)</span></p>
                <p className='font-bold flex flex-col'>9. სთავაზობს ჯანმრთელობის დაზღვევას: <span className='px-5 font-normal'>{props.item.dazgveva}</span></p>
                <p className='font-bold flex flex-col'>10. სურს დაასაქმოს კვირაში: <span className='px-5 font-normal'>{props.item.dge} დღე</span></p>
                <p className='font-bold flex flex-col'>11. სურს დაასაქმოს დღეში: <span className='px-5 font-normal'>{props.item.saati} საათი</span></p>
                <p className='font-bold flex flex-col'>12. სამუშაო საათების დასაწყისი და დასასრული: <span className='px-5 font-normal'>{props.item.ganrigi} საათი</span></p>
                <p className='font-bold flex flex-col'>13. დამატებითი საათების რაოდენობა კვირაში (საშუალოდ): <span className='px-5 font-normal'>{props.item.addhours} საათი</span></p>
                <p className='font-bold flex flex-col'>14. დასაქმების ხანგრძლივობა:
                    <span className='px-5 font-normal'>{props.item.periodi === null ? <span>არ არის დასახელებული</span> : props.item.periodi }</span></p>
                <p className='font-bold flex flex-col'>15. შინაური ცხოველები:
                    <span className='px-5 font-normal'>{props.item.animals === null ? <span>არ არის დასახელებული</span> : props.item.animals }</span></p>
                <p className='font-bold flex flex-col'>16. დასაქმებულის მოვალეობები: <span className='px-5 font-normal'>{props.item.movaleobebi}</span></p>
                <p className='font-bold flex flex-col'>17. სახლის ფართობი: <span className='px-5 font-normal'>{props.item.house} კვ.მ.</span></p>
                
                </div>
        </div>
        }   
        </div>
        {admin !== '' && <MshromeliForOjaxi />}
        </div>
        )
}