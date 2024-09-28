import React, { forwardRef } from 'react';
import Video from './Video';
import Image from './Image';
import { Link } from 'react-router-dom';

const RoomCard = forwardRef(({ room }, ref) => {


    const images = room.properties.room_images || [];
    const video = room.properties.video_url;
    return (
        <div className='px-2 py-5 ' ref={ref}>
            <div className='w-full gap-5 shadow bg-white rounded-lg'>
                {video && <Video video={video} />}
                {images.map((image, index) => <Image key={index} image={image} />)}
                <div className='py-2 px-5'>
                    <div className="flex justify-between items-center pt-3">
                        <p className='text-lg font-semibold line-clamp-1'>{room.name}</p>
                        <p className='pb-2 text-lg text-slate-500'>Rs.1234</p>
                    </div>
                    <div className="text-center my-5">
                        {room.room_type_code}
                        <Link to={`/room-in-detail/${room.room_type_code}`} className='bg-green-600 text-white px-5 py-2 rounded-lg'>Book Room</Link>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default RoomCard;
