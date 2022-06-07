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

    const [content, setContent] = useState("")
    const [errors, setErrors] = useState([])

    const [errorVisible, setErrorVisible] = useState(false)

    const sessionUser = useSelector((state) => state.session.user)


    // const video = useSelector(state => state.videos)



    useEffect(() => {
        const errorsArr = []

        if (!content) errorsArr.push("Please provide comment")
        if (content.length > 255) errorsArr.push("Please keep content under 255 characters")


        setErrors(errorsArr)
    }, [content])


    if (!sessionUser) {
        return null
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        setErrorVisible(true)

        const comment = { content, videoId:id, userId: sessionUser.id }


        if (errors.length === 0) {


        await dispatch(commentActions.postComment(comment, id))

        setContent("")
        setErrors([])
        setErrorVisible(false)
        }
        // history.push(`/videos/${video.id}`)

    }

    return (
        <section>
            <form onSubmit={handleSubmit}>
            <div className="errors">
            {errorVisible && (<ul>
                        {errors.map((error, indx) => (
                            <li key={indx}>
                                {error}
                            </li>
                        ))}
                    </ul>)}
                    </div>
                <textarea
                    type="text"
                    name="content"
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                    maxLength="256"
                    placeholder='Comment here...'
                    className="commentBox"
                />
                <p>
                <button type="submit" className='commentBtn'>Post Comment</button>
                </p>
            </form>
        </section>
    )
}



export default PostComment;
