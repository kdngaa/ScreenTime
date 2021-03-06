import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import * as videoActions from '../../store/videos'
import ReactPlayer from 'react-player'
import * as likeActions from '../../store/likes'
import './userProf.css'

export const UserProfile = () => {
    const { id } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()

    // const videos = useSelector(state => state.videos)
    // const videosArr = Object.values(videos)


    useEffect(async () => {
        await dispatch(videoActions.loadAllVideosThunk())
        await dispatch(likeActions.loadLikesThunk(id))
    }, [dispatch])


    const sessionUser = useSelector(state => state.session.user)

    if (!sessionUser) {
        history.push('/forbidden')
    }

    const videos = useSelector(state => Object.values(state.videos))
    const allLikes = useSelector(state => state.likes)
    const allLikesArr = Object.values(allLikes)

    const myUploads = videos.filter(video => video.userId === +sessionUser.id)
    const myLikes = allLikesArr.filter(like => like.userId === +sessionUser.id)

    return (
        <>
            <div className="uploads">
                <h1 className="userHeader">Welcome, {sessionUser.username}</h1>
                <h2 className="userSubHeader">Uploads</h2>
                <div className="vidList">
                    {myUploads.reverse().map((upload, idx) => (
                        <>
                            <a href={`/videos/${upload.id}`}>
                                <p key={idx} className='linkTextProf'>{upload.title}</p>
                                <p> <ReactPlayer url={`${upload?.uploadFile}`} controls width='65%' height='460px' className="oneVideo" /></p>
                            </a>
                        </>
                    ))}
                </div>

                {/* <h2 className="userSubHeader">Liked</h2> */}
                {/* <div className="vidList">
                {myLikes.reverse().map((like, idx) => (
                        <a href={`/videos/${like.id}`}>
                            <p key={idx} className='linkText'>{like.videoId}</p>
                        </a>
                    ))}
                </div> */}
            </div>
        </>
    )
}
