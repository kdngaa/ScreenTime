import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as commentActions from '../../store/comments'
import { useHistory, useParams } from 'react-router-dom';
import './EditComment.css'


function EditComment({ newComment, commentProp }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()

    const [content, setContent] = useState(newComment.content)
    const [errors, setErrors] = useState([])

    const sessionUser = useSelector((state) => state.session.user)


    // const video = useSelector(state => state.videos)



    useEffect(() => {
        const errors = []

        if (!content) errors.push("Please provide comment")
        if (content.length > 255) errors.push("Please keep content under 255 characters")

        setErrors(errors)
    }, [content])


    if (!sessionUser) {
        return null
    }

    console.log(newComment.id, "<=================================")

    const handleSubmit = async (e) => {
        e.preventDefault()

        const comment = { id:newComment.id, content }

        await dispatch(commentActions.editAComment(comment))

        commentProp.setShowComment("")

        // history.push(`/videos/${video.id}`)
        // setContent("")
    }

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <ul className="errors">
                    {errors.map((error, indx) => (
                        <li key={indx}>
                            {error}
                        </li>
                    ))}
                </ul>
                <textarea
                    type="text"
                    name="content"
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                    maxLength="256"
                    placeholder='Comment here...'
                />
                <button type="submit" className='editBtn' disabled={errors.length > 0}>Update</button>

            </form>
        </section>
    )
}



export default EditComment;
