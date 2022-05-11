import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as videoActions from '../../store/videos'
import './Videos.css'
import ReactPlayer from 'react-player'

const Videos = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(async() => {
        await dispatch(videoActions.loadAllVideosThunk())
    }, [dispatch])


    const videos = useSelector(state => state.videos);
    const videoData = Object.values(videos)

    return (
        <>
            <h1>ALL VIDEOS</h1>
            <div>
                {videoData.map((video, idx) => (
                    <div className="videoContainer">
                    <a href={`/videos/${video.id}`} className='singleVideo'>
                        <div>
                        {/* <p>{video?.title}</p> */}
                        {/* <img src={video?.thumbnail} style={{ height: "200px", width: "300px" }}/> */}
                        <p>{video?.description}</p>
                        </div>
                        <ReactPlayer url={`${video?.uploadFile}`} controls width='10%'/>
                    </a>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Videos;