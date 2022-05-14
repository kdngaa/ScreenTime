import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as videoActions from '../../store/videos'
import { useHistory, useParams } from 'react-router-dom';
import './EditVideo.css'


function EditVideo({ newVideo }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()

    const [description, setDescription] = useState(newVideo.description)
    const [errors, setErrors] = useState([])


    const sessionUser = useSelector((state) => state.session.user)


    // const video = useSelector(state => state.videos)



    useEffect(() => {
        const errors = []

        if (!description) errors.push("Please provide video description")

        setErrors(errors)
    }, [description])


    if (!sessionUser) {
        return null
    }

    // console.log(newComment.id, "<=================================")

    const handleSubmit = async (e) => {
        e.preventDefault()

        const video = { id:newVideo.id, description }

        await dispatch(videoActions.editAVideo(video))

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
                    name="description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    placeholder='New description here...'
                />
                <button type="submit" className='editBtn' disabled={errors.length > 0}>Update Video</button>

            </form>
        </section>
    )
}



export default EditVideo;
