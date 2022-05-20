import './splash.css'
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

function SplashPage() {
    return (

        <div className='mainSplash'>
            <img src="https://res.cloudinary.com/dv3gxfdon/image/upload/v1652615974/2_vx8nga.png" style={{ width: '750px', height: '750px' }} className="homePic" />
            <a href="/videos/new">
            <img src="https://res.cloudinary.com/dv3gxfdon/image/upload/v1653069336/capture_your_moments_ak465y.png" style={{ width: '750px', height: '750px' }} />
            </a>
        </div>

    )
}

export default SplashPage;
