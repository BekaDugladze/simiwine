'use client'
import { useState, useRef, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faRotate} from '@fortawesome/free-solid-svg-icons'

export const UserComment = (props) => {
    const [add, setAdd] = useState(false)
    const [message, setMessage] = useState('')
    const [comMessage, setComMessage] = useState('')
    const [comment, setComment] = useState([])
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const comRef = useRef(null)

    const admin = props.admin;
    const id = props.id;

    const addComment = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/usercomment/new', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: id,
                    admin: admin,
                    com: comment // Send the updated array
                })
            });

            if (response.ok) {
                setMessage('კომენტარი ატვირთულია');
                setTimeout(() => setMessage(''), 3000)
            } else {
                setMessage('სამწუხაროდ ვერ აიტვირთა კომენტარი');
                setTimeout(() => setMessage(''), 3000)
            }
        } catch (err) {
            setMessage(`Error: ${err.message}`);
        }
    };
    
    const getData = async () => {
        setLoading(true)
        try{
            const connect = await fetch('/api/usercomment/new', {
                method: 'PUT',
                credentials: 'include',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({
                    id: id,
                })
            })

            if(connect.ok){
                const data = await connect.json()
                setData(data)
                const filtered = await data.filter(i => i.admin === admin)
                setComment(filtered[0]?.komentari)
            }
            else{
                setLoading(false)
                setComMessage('არ არის კომენტარი')
            }
        }
        catch (err) {
            throw new Error(err.message);
        }
    }

    useEffect(() => {
        getData();
    }, [])
    return(
        <div className="flex flex-col items-center bg-white rounded-xl p-10"
        style={{width: '80%', height: 'fit-content'}}>
            <h1 className="text-xl font-bold" style={{fontFamily: 'nino'}}>დაამატე კომენტარი</h1>
            <div >
                <form className="flex flex-col items-center" onSubmit={addComment} >
                    <label htmlFor="text">ჩაწერეთ ტექსტი</label>
                    <textarea style={{
                        width: '50vw',
                        height: '200px',
                        padding: '3px 6px',
                        border: '1px solid black',
                        borderRadius: '10px',
                        outline: 'none'
                    }}
                    
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    >
                    </textarea>
                    <input className="cursor-pointer my-2" type='submit' value='დაამატე კომენტარი'/>
                    <p>{message}</p>
                </form>
            </div>
        </div>
    )
}

export const GetUserComments = (props) => {
    const [add, setAdd] = useState(false)
    const [message, setMessage] = useState('')
    const [comMessage, setComMessage] = useState('')
    const [comment, setComment] = useState([])
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [newData, setNewData] = useState([])

    const admin = props.admin;
    const id = props.id;

    const getNewData = async () => {
        setLoading(true)
        try {
            const connect = await fetch('/api/usercomment/new', {
                method: 'PUT',
                credentials: 'include',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({
                    id: id,
                })
            })

            if (connect.ok) {
                const contentType = connect.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const datam = await connect.json();
                    // Set newData here instead of data!
                    setNewData(datam);
                    setLoading(false);
                    setComMessage('');
                } else {
                    const message = await connect.text();
                    console.log('Non-JSON response:', message);
                    setComMessage(message);
                    setLoading(false);
                }
            } else {
                // Handle non-ok responses
                const errorMessage = await connect.text();
                console.error('API Error:', errorMessage);
                setComMessage(`Error: ${connect.status} - ${errorMessage}`);
                setLoading(false);
            }
        } catch (err) {
            console.error('Network Error:', err);
            setComMessage('Network error occurred');
            setLoading(false);
            // Don't throw - handle the error gracefully
        }
    }

    const getData = async () => {
        setLoading(true)
        try {
            const connect = await fetch('/api/usercomment', { // Fixed missing '/'
                method: 'GET',
                credentials: 'include',
                headers: {'content-type': 'application/json'},
            })

            if (connect.ok) {
                const contentType = connect.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const datam = await connect.json();
                    const comMap = datam.filter(item => item.admin === admin).map(i => i.comment);
                    setData(datam);
                    setComment(comMap.flat());
                    setLoading(false);
                    setComMessage('');
                } else {
                    const message = await connect.text();
                    console.log('Non-JSON response:', message);
                    setComMessage(message);
                    setLoading(false);
                }
            } else {
                // Handle non-ok responses
                const errorMessage = await connect.text();
                console.error('API Error:', errorMessage);
                setComMessage(`Error: ${connect.status} - ${errorMessage}`);
                setLoading(false);
            }
        } catch (err) {
            console.error('Network Error:', err);
            setComMessage('Network error occurred');
            setLoading(false);
            // Don't throw - handle the error gracefully
        }
    }

    const removeComment = (commentToRemove) => {
        const updatedComments = comment.filter(c => c !== commentToRemove); 
        setComment(updatedComments);

        fetch('/api/usercomment', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: id,
                admin: admin,
                com: updatedComments // Send the updated array
            })
        })
        .then(response => {
            if (response.ok) {
                setMessage('კომენტარი წაიშალა');
                setTimeout(() => {getData()}, 1000)
            } else {
                setMessage('სამწუხაროდ ვერ წაიშალა კომენტარი');
            }
        })
        .catch(err => {
            setMessage(`Error: ${err.message}`);
        });
    }
    
    const removeNewComment = (itemToRemove) => { // Added parameter to identify which item to remove
        fetch('/api/usercomment/new', {
            method: 'DELETE',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: id,
                admin: admin,
                // You might need to pass more specific identifier here
                itemId: itemToRemove?.id || itemToRemove // depending on your API structure
            })
        })
        .then(response => {
            if (response.ok) {
                setMessage('კომენტარი წაიშალა');
                setTimeout(() => {getNewData()}, 1000)
            } else {
                setMessage('სამწუხაროდ ვერ წაიშალა კომენტარი');
            }
        })
        .catch(err => {
            setMessage(`Error: ${err.message}`);
        });
    }

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        const fetchFilteredData = async () => {
            if (props.filteredMshromeli) {
                // Clear existing data before fetching new data
                setData([]);
                setNewData([]);
    
                await getData();
                await getNewData();
            }
        };
    
        fetchFilteredData();
    }, [props.filteredMshromeli])

    return(
        <div className="my-5">
            {!loading ? 
                <div style={{
                    maxHeight: '40vh',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <button className="text-center rounded-xl px-1" onClick={getNewData}>
                        <FontAwesomeIcon icon={faRotate} style={{color: "white !important",}} />
                    </button>
                    
                    {/* Show error message if exists */}
                    {comMessage && (
                        <div className="text-red-500 my-2">{comMessage}</div>
                    )}
                    
                    {/* Show success message if exists */}
                    {message && (
                        <div className="text-green-500 my-2">{message}</div>
                    )}
                    
                    {newData.filter(item => item.pn == id).map((item, index) => (
                        <div className="flex flex-row my-3 justify-between w-full" key={`${id}-${index}-${item.id || item.admin}`}>
                            <div>
                                <h2 className="mx-5" style={{
                                    fontFamily: 'nino',
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                    textDecoration: 'underline'
                                }}>{item.admin}</h2>
                                <h2 className="mx-5" style={{
                                    fontFamily: 'nino',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    textDecoration: 'underline'
                                }}>{item.pn}</h2>
                                <h2 className="mx-5" style={{
                                    fontFamily: 'nino',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    textDecoration: 'underline'
                                }}>{item.date}</h2>
                            </div>
                            <div className="flex flex-col">
                                <p>{item.komentari}</p>
                                {item.admin === admin &&
                                    <button 
                                        className="text-red-800 mx-5" 
                                        onClick={() => removeNewComment(item)}
                                    >
                                        X წაშლა
                                    </button>
                                }
                            </div>
                        </div>
                    ))}
                </div>
            : <p>Loading...</p>
            }
        </div>
    )
}