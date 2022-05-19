import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import * as videoActions from '../../store/videos'

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
                <h1>My Videos</h1>
                {myUploads.map((upload, idx) => (
                    <a href={`/videos/${upload.id}`}>
                        <p key={idx} className='linkText'>{upload.title}</p>
                    </a>
                ))}
            </div>

        </>
    )
}
