import React, { useState, useEffect } from 'react';
import hero1 from '../assets/hero.png';
import hero2 from '../assets/location.png';
import hero3 from '../assets/logo.png';

const LandingPage = () => {
    const images = [hero1, hero2, hero3];
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage(prevImage => (prevImage + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval); 
    }, []);

    return (
        <div className='mt-1'>
            <div
                className="d-flex justify-content-center align-items-center text-center"
                style={{
                    backgroundImage: `url(${images[currentImage]})`,
                    height: '100vh', // Full viewport height
                    width: '100%', 
                    backgroundSize: 'cover', // Ensure image covers the section
                    backgroundPosition: 'center', // Center the image
                    backgroundRepeat: 'no-repeat', // Prevent tiling
                    transition: 'background-image 1s ease-in-out', // Smooth transition between images
                }}
            >
            </div>
        </div>
    );
};

export default LandingPage;
