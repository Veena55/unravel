import React, { useCallback, useEffect, useRef, useState } from 'react';
import RoomCard from './RoomCard'; // Your custom RoomCard component
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa6';

const RoomList = () => {
    const [rooms, setRooms] = useState([]); // State to hold the rooms data
    const [loading, setLoading] = useState(true); // State to track loading status
    const [error, setError] = useState(null); // State to track any errors
    const [page, setPage] = useState(1);// Current page number
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef(); //to track the last element in the list


    // fetch rooms based on the current page
    const fetchRooms = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/db.json?page=${page}`);
            const newRooms = response.data.rooms_by_serial_no[0].rooms;
            setRooms((prevRooms) => [...prevRooms, ...newRooms]);
            if (newRooms.length === 0) {
                setHasMore(false);
            }
            setPage(prevPage => prevPage + 1);
        } catch (error) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [page]);

    // Fetch the JSON data from the public folder
    useEffect(() => {
        // axios.get('/db.json')
        //     .then(response => {
        //         setRooms(response.data.rooms_by_serial_no[0].rooms); // Set the rooms data from JSON
        //         setLoading(false); // Set loading to false when data is fetched
        //     })
        //     .catch(err => {
        //         setError(err.message); // Set the error message if something goes wrong
        //         setLoading(false); // Set loading to false even on error
        //     });

        fetchRooms();
    }, []);


    // Intersection Observer to detect when the last RoomCard is visible

    const lastRoomElementRef = useCallback(() => { }, [])

    // Display a loading message or error if needed
    if (loading) {
        return <div className="flex justify-center h-screen items-center"><FaSpinner className='animate-spin text-green-500' size={50} /></div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='bg-slate-200 p-5'>
            <div className='py-5'>
                <h1 className='text-center font-bold text-xl text-green-700'>ROOM BOOKING SERVICE</h1>
            </div>
            <div className='grid grid-cols-3 gap-5 justify-between '>
                {rooms.map((room, index) => (
                    <RoomCard key={index} room={room} /> // Render RoomCard component for each room
                ))}
            </div>
        </div>
    );
};

export default RoomList;
