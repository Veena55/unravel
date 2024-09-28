import React, { useEffect, useState } from 'react';
import { BiUser } from 'react-icons/bi';
import { FaBed } from 'react-icons/fa';
import { GiTeapotLeaves } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { filterRooms } from '../redux/slices/roomSlice';
import Video from './Video';

const RoomDetails = () => {
    const [loading, setLoading] = useState(true);
    const room = useSelector(state => state.rooms.filteredRoom);
    const dispatch = useDispatch();
    const { roomId } = useParams();
    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                if (roomId) {
                    await dispatch(filterRooms(roomId));
                }
            } catch (error) {
                console.error("Failed to fetch room details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRoomDetails();
    }, [dispatch, roomId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!room) {
        return <p>No room found</p>;
    }

    // const room = rooms.length > 0 ? rooms[0] : null;


    console.log(room);

    if (!room) {
        return <p>No room found</p>;
    }
    console.log(room.properties.bed_type);

    const images = room.properties.room_images || [];
    const video = room.properties.video_url;
    return (
        <div className='p-2'>
            <div className='w-full gap-5 shadow'>
                {video && <Video video={video} />}
                {images.map((image, index) => <Image key={index} image={image} />)}
                {/* <img className='rounded-lg h-72 object-fill' width="100%" src={room.imageUrl} alt={room.name} /> */}
                <div className="p-2 text-slate-500">
                    <div className='flex gap-2 p-2 items-center'>
                        <GiTeapotLeaves />
                        <p className=''>{room.name}</p>
                    </div>
                    <div className='flex gap-2 p-2 items-center'>
                        <FaBed />
                        <p>{room.properties?.bed_type}</p>
                    </div>
                    <div className='flex gap-2 p-2 items-center'>
                        <BiUser />
                        <p className=''>Upto {room.capacity} adults</p>
                    </div>
                </div>
                <div className='px-5'>
                    <p className='text-left text-slate-500'>Price for 1 night</p>
                </div>
                <div className='px-5 pt-3'>
                    <p className='text-left text-slate-500'>Includes taxes & fees</p>
                    <h3 className='text-lg font-bold text-left'>{room.variants[0].total_price.currency} {room.variants[0].total_price.total_price}</h3>
                </div>
                <div className='py-3 px-3 flex gap-3'>
                    <button className='bg-green-600 p-2 text-white rounded-lg shadow-xl'>Book Room</button>
                    <Link to="/" className='bg-slate-400 px-5 p-2 text-white rounded-lg shadow-xl'>Back</Link>
                </div>
            </div>
        </div>
    );
};

export default RoomDetails;
