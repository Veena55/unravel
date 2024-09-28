import React from 'react'

const Image = ({ image }) => {
    // console.log(image);
    return (
        <img
            className='h-[250px] object-contain'
            width='100%'
            src={image.image_urls[0]} // Assuming each room has an 'image' field in db.json
            alt={image.display_name}
        />
    )
}

export default Image