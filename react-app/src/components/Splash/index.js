import './splash.css'
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

function SplashPage() {
    return (

        <div className='mainSplash'>
            <img src="https://res.cloudinary.com/dv3gxfdon/image/upload/v1652615974/2_vx8nga.png" style={{ width: '750px', height: '750px' }} className="homePic" />
            <a href="https://www.apple.com/app-store/">
            <img src="https://res.cloudinary.com/dv3gxfdon/image/upload/v1652767943/4_ko8ioj.png" style={{ width: '750px', height: '750px' }} />
            </a>
        </div>

    )
}

export default SplashPage;
