import {useState, useEffect, useRef} from 'react'
import Link from "next/link"
import {Match} from './match'
import { GetUserComments, UserComment } from './comment/usercomment';
import { Comment, GetComments } from './comment/comment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';

export default function Dasaqmebuli(props){
    const [mshromeli, setMshromeli] = useState([]);
    const [ojaxi, setOjaxi] = useState([]);
    const [filteredMshromeli, setFilteredMshromeli] = useState([]);
    const [filteredOjaxi, setFilteredOjaxi] = useState([]);
    const [hide, setHide] = useState(null);
    const [del, setDel] = useState(false);

    const pnRef = useRef(null);
    
    const [com, setCom] = useState(null)

    const admin = props.admin
    
    const toggleCom = (mobile) => {
        setCom(com === mobile ? null : mobile); // Toggle visibility for the clicked item
    };


    const toggleHide = (mobile) => {
        setHide(hide === mobile ? null : mobile); // Toggle visibility for the clicked item
    };

    const getMshromeli = async () => {
        try {
            const response = await fetch('/api/match', {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                const data = await response.json();
                setMshromeli(data.mshromeli);
                setOjaxi(data.ojaxi);
            } else {
                console.error('Failed to fetch data');
            }
        } catch (err) {
            console.error('Error fetching data:', err.message);
        }
    };

    useEffect(() => {
        getMshromeli();
    }, []);

    useEffect(() => {
        const filtered = ojaxi.filter(item => {
            return (
                (!props.filter.name || item.saxeligvari.toLowerCase().includes(props.filter.name.toLowerCase())) &&
                (!props.filter.pn || String(item.ojaxiid).includes(props.filter.pn) )
            );
        });
        const filteredMshromeli = mshromeli.filter(item => {
            return (
                (!props.filter.name || item.saxeligvari.toLowerCase().includes(props.filter.name.toLowerCase())) &&
                (!props.filter.pn || String(item.piradinomeri).includes(props.filter.pn) )
            );
        });
        setFilteredOjaxi(filtered);
        setFilteredMshromeli(filteredMshromeli)
    }, [props.filter, mshromeli]); 

    useEffect(() => {
        const filtered = ojaxi.filter(item => {
            return (
                (!props.filter.name || item.saxeligvari.toLowerCase().includes(props.filter.name.toLowerCase()) 
                || String(item.usersaxeligvari).toLowerCase().includes(props.filter.name.toLowerCase())) &&
                (!props.filter.pn || String(item.ojaxiid).includes(props.filter.pn) 
                || String(item.userpiradinomeri).includes(props.filter.pn)) 
            );
        });
        setFilteredOjaxi(filtered);
    }, [props.filter, mshromeli]);

    
    const deleteOjaxi = async (e, i) => {
        try{
            const connect = await fetch('/api/match', {
                method: 'DELETE',
                credentials: 'include',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({
                    id: e,
                    match: i
                })
            })
            if(connect.ok) alert('კავშირი გაწყვეტილია!')
                else alert('სამწუხაროდ კავშირი ვერ გაწყდა')
        }
        catch(err){
            throw new Error(err);
        }
    }

    const transfer = async () => {
        try{
            const connect = await fetch('/api/excell/dasaqmebuli', {
                method: 'POST',
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
                a.download = `dasaqmebuli-ojaxi-${day}-${month}-${year}.xlsx`; // Set the file name
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
    const transferMshromeli = async () => {
        try{
            const connect = await fetch('/api/excell/dasaqmebuli', {
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
                a.download = `dasaqmebuli-mshromeli-${day}-${month}-${year}.xlsx`; // Set the file name
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

    return(
        <div className='mx-5 flex flex-col items-around sm:w-full'>
            <h1 style={{fontSize: '20px'}} className='text-center font-bold my-4'>დასაქმებული</h1>
            <div className='flex flex-row justify-around items-center'>
                <div className='flex flex-col'>
                    <p>მოიძებნა: {filteredMshromeli.length} მშრომელი</p>
                    <button onClick={transferMshromeli}><FontAwesomeIcon icon={faFileExcel} /> Excell</button>
                </div>
                <div className='flex flex-col'>
                    <p>მოიძებნა: {filteredOjaxi.length} ოჯახი</p>
                    <button onClick={transfer}><FontAwesomeIcon icon={faFileExcel} /> Excell</button>
                </div>
            </div>
            <div className='flex flex-row flex-nowrap sm:justify-around sm:m-3'>
            {filteredMshromeli.length > 0 ?
            <div className='overflow-y-auto flex flex-col flex-wrap sm:justify-around sm:m-3 w-full' >
                {filteredMshromeli.map((item, index) => (
                    <div className='flex flex-col items-center rounded-md sm:px-6 sm:py-2 my-3 sm:w-full matched' key={index}
                    style={{background: 'white', maxHeight: '40vh', overflowY: 'auto'}} >
                        <div className='flex md:flex-row flex-col  justify-around'>
                            <div className='flex flex-row flex-wrap justify-center sm:w-fit sm:text-left text-center dasaqmebuli '>
                                <p><span className='font-bold'>მშრომელის სახელი, გვარი:</span> {item.saxeligvari}, {item.gvari}</p>
                                <p><span className='font-bold'>მშრომელის პ/ნ:</span> {item.piradinomeri}</p>
                                <p><span className='font-bold'>მშრომელის მობილური:</span> <a href={`tel:${item.mobiluri}`}>{item.mobiluri}</a></p>
                                <p><span className='font-bold'>ოჯახის ID: </span>{item.match}</p>
                            </div>
                        </div>    
                        <GetUserComments admin={admin} id={item.piradinomeri} filteredMshromeli={filteredMshromeli} />
                        <div className='flex sm:flex-row flex-col justify-around items-center my-3'>
                            <Link href={`/admin/user?pn=${item.piradinomeri}`} target='_blank' 
                            className='text-green-800 bg-white sm:px-1 rounded-xl text-center sm:mx-2 sm:text-base text-s w-fit h-fit'
                            style={{border: '1px solid #386929'}}>ვრცლად </Link>
                            <button 
                            className='rounded-xl px-2  bg-green-900 text-white mx-2'                 
                            onClick={() => toggleCom(item.piradinomeri)} // Set hide to the current item's mobile
                            >კომენტარი</button>
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
                </div>
                : <p className='w-full text-center'>არავინ მოიძებნა</p> }
                {filteredOjaxi.length > 0 ?
                <div className='overflow-y-auto flex flex-col flex-wrap sm:justify-around sm:m-3 w-full'>
                {filteredOjaxi.map((item, index) => (
                    <div className='flex flex-col justify-center items-center rounded-md sm:px-6 sm:py-2 my-3 sm:w-full matched' key={index}
                    style={{background: 'white', maxHeight: '40vh', overflowY: 'auto'}}>
                        <div className='flex md:flex-row flex-col  justify-around'>
                            <div className='flex flex-row flex-wrap justify-center  sm:w-fit sm:text-left text-center dasaqmebuli '>
                                <p><span className='font-bold'>ოჯახის სახელი, გვარი:</span> {item.saxeligvari}, {item.gvari}</p>
                                <p><span className='font-bold'>ოჯახის ID:</span> {item.ojaxiid}</p>
                                <p><span className='font-bold'>ოჯახის მობილური:</span> <a href={`tel:${item.mobiluri}`}>{item.mobiluri}</a></p>
                                <p><span className='font-bold'>დასაქმებულის პ/ნ: </span>{item.match}</p>
                            </div>
                        </div>    
                        <GetComments admin={admin} id={item.ojaxiid} filteredMshromeli={filteredMshromeli} />
                        <div className='flex flex-row justify-around my-3'>
                            <Link href={`/admin/user?pn=${item.ojaxiid}`} target='_blank' 
                            className='text-black bg-white px-3 rounded-xl text-center mx-2 sm:text-base text-xs'
                            style={{border: '1px solid black'}}>ვრცლად ოჯახის შესახებ</Link>
                        <button 
                            className='rounded-xl px-2  bg-green-900 text-white mx-2'                 
                            onClick={() => toggleCom(item.ojaxiid)} // Set hide to the current item's mobile
                            >კომენტარი</button>
                            <button className='text-red-800 bg-white sm:px-1 my-1 rounded-xl text-center sm:text-base text-s'
                            onClick={() => {deleteOjaxi(item.ojaxiid, item.match)}}            
                            style={{border: '1px solid red'}}>კავშირის გაწყვეტა</button>
                        </div>
                        {
                            com === item.ojaxiid ?
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
                : <p className='w-full text-center'>არავინ მოიძებნა</p> }
                </div>
        </div>
    )
}

