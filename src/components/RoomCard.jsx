import React, { useEffect, useState } from 'react';
import Video from './Video';
import Image from './Image';
import { Link } from 'react-router-dom';

const RoomCard = ({ room }) => {
    const images = room.properties.room_images || [];
    const video = room.properties.video_url;

    // const [images, setImages] = useState([]);
    // const [video, setVideo] = useState(); // Changed to a singular "video" and useState(null) instead of undefined

    // useEffect(() => {
    //     // if (room && room.properties) {
    //     // console.log(room.properties.room_images);
    //     setImages(room.properties.room_images); // Assuming room_images is an array of image URLs
    //     setVideo(room.properties.video_url); // Assuming video_url is a string
    //     // }
    // }, [room]); // Added room as a dependency

    return (
        <div className='px-2 py-5'>
            <div className='w-full gap-5 shadow bg-white rounded-lg'>
                {video && <Video video={video} />}
                {images.map((image, index) => <Image key={index} image={image} />)}
                <div className='py-2 px-5'>
                    <div className="flex justify-between items-center pt-3">
                        <p className='text-lg font-semibold line-clamp-1'>{room.name}</p>
                        <p className='pb-2 text-lg text-slate-500'>Rs.1234</p>
                    </div>
                    <div className="text-center my-5">
                        <Link className='bg-green-600 text-white px-5 py-2 rounded-lg'>Book Room</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomCard;
