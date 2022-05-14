import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './UploadVideoForm.css'
import { postVideo } from "../../store/videos";
import { useHistory } from "react-router-dom";
// import { useEffect } from "react/cjs/react.production.min";

function Upload() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [description, setDescription] = useState("")
    const [uploadFile, setUploadFile] = useState(null)

    const [errors, setErrors] = useState([])

    const sessionUser = useSelector((state) => state.session.user)



    useEffect(() => {
        const errors = []

        if (!description) errors.push("Please provide description")
        if (!uploadFile) errors.push("Please include valid link")

        setErrors(errors)
    }, [description, uploadFile])


    // if (!sessionUser) {  //if user is not log in, form will not show
    //     return null;
    // }


    const handleSubmit = (e) => {
        e.preventDefault()

        const video = { userId: sessionUser.id, description, uploadFile }

        dispatch(postVideo(video))

        history.push('/videos') //redirect to home after added
    }


    const uploadVideo = (e) => {
        const video = e.target.files[0]
        setUploadFile(video)
    }



    return (
        <section>
            <form className="uploadVideoForm" onSubmit={handleSubmit}>
                <ul className="errors">
                    {errors.map((error, indx) => (
                        <li key={indx}>
                            {error}
                        </li>
                    ))}
                </ul>
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="fieldText"
                />



                {/* <label className="fileHead">Please use Cloudinary for your MP3/MP4 files</label> */}
                <input
                    type="file"
                    name="uploadFile"
                    // placeholder="MP3/MP4"
                    // value={uploadFile}
                    onChange={uploadVideo}
                    required
                    className="fileBtn"
                />
                <button className="updateBtn" type="Submit" disabled={errors.length > 0}>Post Video</button>
            </form>
        </section>
    )


}


export default Upload;
