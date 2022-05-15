import './splash.css'
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

function SplashPage(){



return(
    <>
        <div>
        <img src="https://res.cloudinary.com/dv3gxfdon/image/upload/v1652615974/2_vx8nga.png" style={{ width: '750px', height: '750px' }} className="homePic"/>
        <img src="https://res.cloudinary.com/dv3gxfdon/image/upload/v1652615978/5_eupeqd.png" style={{ width: '750px', height: '750px' }} />
        </div>
    </>
)
}

export default SplashPage;
