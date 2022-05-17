import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as videoActions from '../../store/videos'
import './Videos.css'
import ReactPlayer from 'react-player'

const Videos = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(async () => {
        await dispatch(videoActions.loadAllVideosThunk())
    }, [dispatch])


    const videos = useSelector(state => state.videos);
    const videoData = Object.values(videos)

    return (
        <>
            <img src="https://res.cloudinary.com/dv3gxfdon/image/upload/v1652768294/5_fmd6yn.png" style={{ width: '350px', height: '70px' }} className="allVideosHeader"/>
            <div className="allVideos">
                {videoData.map((video, idx) => (
                    <div className="allVidsContainer">
                        <a href={`/videos/${video.id}`} className="vidLink">
                            See More
                        </a>
                        <p className="contentCreator">{video.user.username} posted:</p>
                            <div className='videoContainer'>
                                {/* <p>{video?.title}</p> */}
                                {/* <img src={video?.thumbnail} style={{ height: "200px", width: "300px" }}/> */}
                                <ReactPlayer url={`${video?.uploadFile}`} controls width='30%' height='700px' className="oneVideo"/>
                            </div>
                                {/* <p className="videoCreator">{video.User.username} posted:</p> */}
                                <p className="videoDescription">{video?.description}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Videos;
