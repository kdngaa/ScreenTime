// import './PostCommentForm.css'
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as commentActions from '../../store/comments'
import { useHistory, useParams } from 'react-router-dom';
import './CommentForm.css'


function PostComment({ video }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()
    console.log(id, "THIS IS AN ID ===>")
    const [content, setContent] = useState("")
    const [errors, setErrors] = useState([])


    const sessionUser = useSelector((state) => state.session.user)


    // const video = useSelector(state => state.videos)



    useEffect(() => {
        const errors = []

        if (!content) errors.push("Please provide comment")

        setErrors(errors)
    }, [content])


    if (!sessionUser) {
        return null
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        const comment = { content, videoId:id, userId: sessionUser.id }

        await dispatch(commentActions.postComment(comment, id))

        // history.push(`/videos/${video.id}`)
        setContent("")
    }

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <ul className="errors">
                    {/* {errors.map((error, indx) => (
                        <li key={indx}>
                            {error}
                        </li>
                    ))} */}
                </ul>
                <input
                    type="text"
                    name="content"
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                    placeholder='Comment here...'
                    className="commentBox"
                />
                <button type="submit" className='commentBtn' disabled={errors.length > 0}>Submit Comment</button>

            </form>
        </section>
    )
}



export default PostComment;
