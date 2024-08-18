import React from 'react';
import img1 from '../Images/g1.jpg';
import img2 from '../Images/g2.jpg';
import img3 from '../Images/g3.jpg';
import img4 from '../Images/g4.jpg';
import img5 from '../Images/g5.jpg';
import img6 from '../Images/g6.jpg';
import img7 from '../Images/g7.jpg';
import img8 from '../Images/g8.jpg';
import img9 from '../Images/g9.jpg';
import img10 from '../Images/g10.jpg';
import img11 from '../Images/g11.jpg';
import img12 from '../Images/g12.jpg';

const Gallery = () => {

    const gallery = [
        {
            img: img1
        },
        {
            img: img2
        },
        {
            img: img3
        },
        {
            img: img4
        }, {
            img: img5
        },
        {
            img: img6
        },
        {
            img: img7
        },
        {
            img: img8
        },
        {
            img: img9
        },
        {
            img: img10
        },
        {
            img: img11
        },
        {
            img: img12
        }
    ]
    return (
        <div>
            <div className='h-auto bg-color1'>
                <h1 className='text-black text-xl bold text-center p-4'>Unforgettable Memories with PM DRONES</h1>
                <h1 className='text-black text-2xl bold text-center p-4'>Explore our captivating agriculture drone gallery, showcasing the beauty and efficiency of drone technology in modern farming.</h1>
                <div className='flex flex-row flex-wrap pl-7'>
                    {gallery.map((photo) => (
                        <img src={photo.img} className='w-72 h-52 p-4' />
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Gallery
