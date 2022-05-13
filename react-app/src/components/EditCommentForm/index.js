import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as commentActions from '../../store/comments'
import { useHistory, useParams } from 'react-router-dom';
import './EditComment.css'


function EditComment({ newComment }) {
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
                <input
                    type="text"
                    name="content"
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                    placeholder='Comment here...'
                />
                <button type="submit" className='editBtn' disabled={errors.length > 0}>Edit Comment</button>

            </form>
        </section>
    )
}



export default EditComment;