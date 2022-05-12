import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as videoActions from '../../store/videos'
import ReactPlayer from "react-player";
import * as commentActions from '../../store/comments'
import './SingleVideo.css'

const SingleVideo = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()

    const video = useSelector(state => state.videos[id])
    const comments = useSelector(state => state.comments)
    const commentData = Object.values(comments)
    console.log(comments, "<================")


    // const sessionUser = useSelector((state) => state.session.user)

    useEffect(() => {
        dispatch(commentActions.getComments())
        dispatch(commentActions.postComment())
        dispatch(commentActions.loadComment(id))
        dispatch(videoActions.loadVideoThunk(id))
    }, [dispatch, comments])


    if(!comments){
        return null
    }



    return (
        <>
            <div>
                {video && (<div className="singleVideo">
                    <ReactPlayer
                        url={`${video.uploadFile}`}
                        controls
                        width='60%' height='500px'
                        className="singgleVideo"
                    />
                    <p>{`${video.description}`}</p>
                </div>)}
            </div>
            <div className="commentSection">
                <h2>COMMENTS</h2>
                {commentData.map((comment, idx) => (
                    <>
                        <div className="subComment">
                            {/* <p className="commentCreator">{comment.User.username} said:</p> */}
                            <p key={idx} className="commentContent">{comment.content}</p>
                        </div>
                        <div>
                            {/* {sessionUser.id === comment.userId && (
                                <button className="deleteBtn grow" onClick={(e) => dispatch(removeAComment(comment.id))}>Remove Comment</button>
                            )} */}
                        </div>
                    </>
                ))}
            </div>
        </>


    )



}

export default SingleVideo;
