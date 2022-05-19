import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as videoActions from '../../store/videos'
import { useHistory, useParams } from 'react-router-dom';
import './EditVideo.css'


function EditVideo({ newVideo, prop }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()

    const [description, setDescription] = useState(newVideo.description)
    const [title, setTitle] = useState(newVideo.title)
    const [errors, setErrors] = useState([])


    const sessionUser = useSelector((state) => state.session.user)


    // const video = useSelector(state => state.videos)



    useEffect(() => {
        const errors = []

        if (!description) errors.push("Please provide video description")
        if (!title) errors.push("Please provide video title")
        if (title.length > 8) errors.push("Please keep title at 8 characters or less")
        if (description.length > 255) errors.push("Please keep description under 255 characters")

        setErrors(errors)
    }, [description, title])


    if (!sessionUser) {
        return null
    }

    // console.log(newComment.id, "<=================================")

    const handleSubmit = async (e) => {
        e.preventDefault()

        const video = { id: newVideo.id, description, title }

        await dispatch(videoActions.editAVideo(video))
        prop.setShow(false)

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
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        placeholder='New title here...'
                    />
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                        type="text"
                        name="description"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        placeholder='New description here...'
                        className="editDesc"
                    />
                </div>


                <button type="submit" className='editBtn' disabled={errors.length > 0}>Update Video</button>

            </form>
        </section>
    )
}



export default EditVideo;
