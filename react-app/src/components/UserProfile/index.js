import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import * as videoActions from '../../store/videos'
import ReactPlayer from 'react-player'
import './userProf.css'

export const UserProfile = () => {
    const { id } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()

    // const videos = useSelector(state => state.videos)
    // const videosArr = Object.values(videos)


    useEffect(async () => {
        await dispatch(videoActions.loadAllVideosThunk())
    }, [dispatch])


    const sessionUser = useSelector(state => state.session.user)

    if (!sessionUser) {
        history.push('/forbidden')
    }

    const videos = useSelector(state => Object.values(state.videos))

    const myUploads = videos.filter(video => video.userId === +sessionUser.id)

    return (
        <>
            <div className="uploads">
                <h1>Welcome {sessionUser.username}</h1>
                <h2>My Videos</h2>
                <div className="vidList">
                    {myUploads.reverse().map((upload, idx) => (
                        <a href={`/videos/${upload.id}`}>
                            {/* <li key={idx} className='linkText'>{upload.title}</li> */}
                            <ReactPlayer url={`${upload?.uploadFile}`} controls width='65%' height='460px' className="oneVideo" />
                        </a>
                    ))}
                </div>
            </div>

        </>
    )
}
