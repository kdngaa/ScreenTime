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


            <img src="https://res.cloudinary.com/dv3gxfdon/image/upload/v1652768294/5_fmd6yn.png" style={{ width: '350px', height: '70px' }} className="allVideosHeader" />
            <div className="allVideos">
                {videoData.reverse().map((video, idx) => (

                    <a href={`/videos/${video.id}`} className="vidLink">
                        <div className="allVidsContainer">


                            <div>
                                <div className="createdInfo">
                                    <p className="contentCreator">@{video.user.username} posted:</p>
                                    <p className="dateCreated">{video?.created_at?.split(" ").slice(0, 4).join(" ")}</p>
                                </div>

                                <div className='videoContainer'>
                                    <a href={`/videos/${video.id}`} className="vidLinkVideo">
                                        <ReactPlayer url={`${video?.uploadFile}`} controls width='110%' height='615px' className="oneVideo" />
                                    </a>
                                </div>
                            </div>


                            <div className="videoDetails">

                                <p className="videoTitle">{video?.title}</p>

                                <p className="videoDescription">{video?.description}</p>
                            </div>

                        </div>
                    </a>

                ))}
            </div>
        </>
    )
}

export default Videos;
