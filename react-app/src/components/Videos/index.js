import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as videoActions from '../../store/videos'
import './Videos.css'
import ReactPlayer from 'react-player'
// import * as likeActions from '../../store/likes'

const Videos = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()
    const sessionUser = useSelector((state) => state.session.user)

    const videos = useSelector(state => state.videos);
    const videoData = Object.values(videos)

    useEffect(async () => {
        await dispatch(videoActions.loadAllVideosThunk())
        // await dispatch(likeActions.loadLikesThunk())
    }, [dispatch])



    // const vid = useSelector(state => state.videos[id])



    // const allLikes = useSelector(state => state.likes)
    // const allLikesArr = Object.values(allLikes)
    // const likes = allLikesArr.filter((like) => {
    //     return like?.videoId === vid?.id
    // })

    // let like = likes?.find((like) => {
    //     return sessionUser.id === like.userId
    // })



    // const handleLike = (e) => {
    //     e.preventDefault()
    //     if (like) {
    //         dispatch(likeActions.deleteLikeThunk(like?.id))
    //     } else {
    //         dispatch(likeActions.postLikeThunk(vid?.id))
    //     }
    // }



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
                                    <a href='#' className="vidLinkVideo">
                                        <ReactPlayer url={`${video?.uploadFile}`} controls width='110%' height='615px' className="oneVideo" />
                                    </a>
                                </div>
                            </div>


                            <div className="videoDetails">

                                <p className="videoTitle">{video?.title}</p>

                                <p className="videoDescription">{video?.description}</p>
                            </div>



                            {/* <div className="likeSection">
                                {like ? (
                                    <button className="likeBtn" onClick={handleLike()}><img src="https://res.cloudinary.com/dv3gxfdon/image/upload/v1654730104/icons8-heart-64_iqf9n2.png"></img></button>
                                ) : (
                                    <button className="likeBtn" onClick={handleLike()}><img src="https://res.cloudinary.com/dv3gxfdon/image/upload/v1654730102/icons8-heart-64_1_qvn6ii.png"></img></button>
                                )}
                            </div> */}
                        </div>
                    </a>


                ))}
            </div>
        </>
    )
}

export default Videos;
