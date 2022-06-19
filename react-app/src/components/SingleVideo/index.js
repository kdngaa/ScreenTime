import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as videoActions from '../../store/videos'
import ReactPlayer from "react-player";
import * as commentActions from '../../store/comments'
import './SingleVideo.css'
import PostComment from "../PostCommentForm";
import EditComment from "../EditCommentForm";
import EditVideo from "../EditVideoForm";
import * as likeActions from '../../store/likes'
import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';


const SingleVideo = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()

    const [show, setShow] = useState(false)
    const [showComment, setShowComment] = useState("")

    const video = useSelector(state => state.videos[id])
    const comments = useSelector(state => state.comments)
    const commentData = Object.values(comments)

    const sessionUser = useSelector((state) => state.session.user)

    useEffect(() => {
        dispatch(commentActions.loadComments(id))
        dispatch(videoActions.loadVideoThunk(id))
        dispatch(likeActions.loadLikesThunk())
    }, [dispatch]) //no dispatching comments?



    const allLikes = useSelector(state => state.likes)
    const allLikesArr = Object.values(allLikes)
    const likes = allLikesArr.filter((like) => {
        return like?.videoId === video?.id
    })

    let like = likes?.find((like) => {
        return sessionUser.id === like.userId
    })



    const handleLike = e => {
        e.preventDefault()
        if (like) {
            dispatch(likeActions.deleteLikeThunk(like?.id))
        } else {
            dispatch(likeActions.postLikeThunk(video?.id))
        }
    }





    // if (!comments) {
    //     return null
    // }

    const prop = { setShow, show }

    const commentProp = { setShowComment, showComment }


    return (
        <>
            <div className="singleBox">
                {/* VIDEO SECTION */}
                <div className="singleVideoContainer">
                    {video && (<div className="singleVideo">
                        {/* <p className="singleVidTitle">{`${video.title}`}</p> */}
                        <ReactPlayer
                            url={`${video.uploadFile}`}
                            controls
                            width='67%' height='550px'
                            className="singleVideo"
                        />
                        <div className="allVideoInfo">
                            <div>
                                <p className="singleVidTitle">{`${video.title}`}</p>
                                <p className="descriptionContent">{`${video.description}`}</p>
                            </div>
                            <div className="editAnddel">
                                {sessionUser.id === video.userId && (
                                    <>
                                        {/* <Popup trigger={<button> Trigger</button>} position="right center"> */}
                                        <button className="editVidBtn" onClick={(e) => {
                                            setShow(!show)
                                        }}>
                                            <img src="https://res.cloudinary.com/dv3gxfdon/image/upload/v1654838514/edit_2_pohiys.png" />

                                        </button>

                                        {/* </Popup> */}

                                        {show &&
                                            <EditVideo newVideo={video} prop={prop} />
                                        }




                                        <button className="deleteVidBtn" onClick={(e) => {
                                            dispatch(videoActions.removeAVideo(video.id))
                                            // dispatch(videoActions.loadAllVideosThunk(id))
                                            history.push(`/videos`)
                                        }}>

                                            <img src="https://res.cloudinary.com/dv3gxfdon/image/upload/v1654838514/trash-bin_r8pvlt.png" />

                                        </button>


                                    </>
                                )}
                            </div>
                        </div>
                        <div className="likeSection">
                            <p className="likeNum">
                                {like ? (
                                    <button className="likeBtn" onClick={handleLike}><img className="likeImg" src="https://res.cloudinary.com/dv3gxfdon/image/upload/v1654834311/heart_2_qwubjz.png"></img></button>
                                ) : (
                                    <button className="likeBtn" onClick={handleLike}><img className="likeImg" src="https://res.cloudinary.com/dv3gxfdon/image/upload/v1654834312/heart_1_kwdvzx.png"></img></button>
                                )}
                                {likes?.length}</p>
                        </div>
                        <div className="chatbox">
                            <PostComment video={video} />
                        </div>
                        {sessionUser.id === video.userId}
                    </div>)}
                </div>


                {/* COMMENT SECTION */}

                <div className="commentSection">
                    <h2 className="commHeader">COMMENT SECTION ({commentData.length})</h2>
                    {commentData.map((comment, idx) => (
                        <div key={comment.id} className="allCommentInfo">
                            <div className="subComment">
                                <p className="commentCreator">{comment.user.username} on {comment?.created_at?.split(" ").slice(0, 4).join(" ")}:</p>
                                <p key={idx} className="commentContent">{comment.content}</p>
                            </div>

                            <div>
                                {sessionUser.id === comment.userId && (
                                    <>

                                        <button className="commentEdit" onClick={(e) => {

                                            setShowComment(showComment == comment?.id ? "" : comment?.id)

                                        }}>

                                            <img src="https://res.cloudinary.com/dv3gxfdon/image/upload/v1654837513/edit_hnmb2l.png" style={{ width: '15px', height: '15px' }} />
                                        </button>

                                        {showComment == comment.id &&
                                            <EditComment newComment={comment} commentProp={commentProp} />
                                        }


                                        <button className="commentEdit" onClick={(e) => {
                                            dispatch(commentActions.removeAComment(comment.id))
                                            dispatch(commentActions.loadComments(id))
                                        }}>

                                            <img src="https://res.cloudinary.com/dv3gxfdon/image/upload/v1654837513/delete_huci8n.png" style={{ width: '15px', height: '15px' }} />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default SingleVideo;
