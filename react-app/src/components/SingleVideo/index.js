import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as videoActions from '../../store/videos'
import ReactPlayer from "react-player";
import * as commentActions from '../../store/comments'
import './SingleVideo.css'
import PostComment from "../PostCommentForm";

const SingleVideo = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()

    const video = useSelector(state => state.videos[id])
    const comments = useSelector(state => state.comments)
    const commentData = Object.values(comments)
    console.log(comments, "<================")


    const sessionUser = useSelector((state) => state.session.user)

    useEffect(() => {
        dispatch(commentActions.loadComments(id))
        dispatch(videoActions.loadVideoThunk(id))
    }, [dispatch]) //no dispatching comments?


    if (!comments) {
        return null
    }

    return (
        <>
            {/* VIDEO SECTION */}
            <div>
                {video && (<div className="singleVideo">
                    <ReactPlayer
                        url={`${video.uploadFile}`}
                        controls
                        width='60%' height='500px'
                        className="singgleVideo"
                    />
                    <p>{`${video.description}`}</p>
                    <PostComment video={video} />
                    {sessionUser.id === video.userId}
                </div>)}
            </div>


            {/* COMMENT SECTION */}

            <div className="commentSection">
                <h2>COMMENTS</h2>
                {commentData.map((comment, idx) => (
                    <div key={comment.id}>
                        <div  className="subComment">
                            {/* <p className="commentCreator">{comment.User.username} said:</p> */}
                            <p key={idx} className="commentContent">{comment.content}</p>
                        </div>
                        <div>
                            {sessionUser.id === comment.userId && (
                                <button className="deleteBtn grow" onClick={(e) => dispatch(commentActions.removeAComment(comment.id))}>Remove Comment</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default SingleVideo;
