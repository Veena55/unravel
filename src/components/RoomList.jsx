import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import RoomCard from './RoomCard'; // Your custom RoomCard component
import { FaSpinner } from 'react-icons/fa6';
import { LuLoader2 } from 'react-icons/lu';

const RoomList = () => {
    const [rooms, setRooms] = useState([]); // State to hold all the rooms data
    const [loading, setLoading] = useState(true); // Loading state for initial data load
    const [loadingMore, setLoadingMore] = useState(false); // Loading state for infinite scroll
    const [error, setError] = useState(null); // Error state
    const [page, setPage] = useState(1); // Page number
    const itemsPerPage = 10; // Number of items per page
    const observer = useRef(); // Ref for the intersection observer

    // Fetch the entire JSON data on component mount
    useEffect(() => {
        const fetchRooms = async () => {
            setLoading(true); // Show the initial loader
            try {
                const response = await axios.get('/db.json');
                setRooms(response.data.rooms_by_serial_no[0].rooms); // Store all rooms data
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false); // Hide the initial loader
            }
        };
        fetchRooms();
    }, []);

    // console.log(rooms, filteredRoom);


    // Paginate and fetch more rooms as the page increases
    const paginatedRooms = rooms.slice(0, page * itemsPerPage); // Show rooms based on the current page

    // Intersection Observer to detect when the last room is in view
    const lastRoomElementRef = useCallback(
        (node) => {
            if (loadingMore) return; // Don't trigger observer if loading more rooms
            if (observer.current) observer.current.disconnect(); // Disconnect previous observer

            // Create a new observer
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && paginatedRooms.length < rooms.length) {
                    setLoadingMore(true); // Show the loading spinner when fetching more rooms
                    setTimeout(() => {
                        setPage((prevPage) => prevPage + 1); // Load next page when last room is in view
                        setLoadingMore(false); // Hide the loading spinner after data is fetched
                    }, 1000); // Simulate delay for loading
                }
            });

            if (node) observer.current.observe(node); // Observe the last room card
        },
        [loadingMore, paginatedRooms, rooms]
    );

    // Display a loading spinner if the data is still loading
    if (loading) {
        return (
            <div className="flex justify-center h-screen items-center">
                <FaSpinner className="animate-spin text-green-500" size={50} />
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="bg-slate-200 p-5">
            <div className="py-5">
                <h1 className="text-center font-bold text-xl text-green-700">ROOM BOOKING SERVICE</h1>
            </div>
            <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-5 justify-between">
                {paginatedRooms.map((room, index) => {
                    if (loadingMore) {
                        return (
                            <div className='px-2 py-5'>
                                <div className='w-full gap-5 shadow bg-white rounded-lg p-5'>
                                    <div className="skeleton skeleton-img"></div>
                                    <div className="skeleton skeleton-text"></div>
                                    <div className="skeleton skeleton-text"></div>
                                    <div className="skeleton skeleton-btn"></div>
                                </div>
                            </div>
                        );
                    }
                    if (paginatedRooms.length === index + 1) {
                        // Attach observer to the last room card
                        return <RoomCard ref={lastRoomElementRef} key={index} room={room} />;
                    } else {
                        return <RoomCard key={index} isLoading={loading} room={room} />;
                    }
                })}
            </div>
        </div>
    );
};

export default RoomList;