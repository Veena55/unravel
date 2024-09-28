import React from 'react'

const Video = ({ video }) => {
    // console.log(video);
    return (
        <video className='h-[250px] w-full' controls autoPlay muted loop >
            <source src={video.med}></source>
        </video>
    )
}

export default Video