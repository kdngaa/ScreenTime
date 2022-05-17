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
    const [videoLoading, setVideoLoading] = useState(false);

    const [errors, setErrors] = useState([])

    const sessionUser = useSelector((state) => state.session.user)



    // useEffect(() => {
    //     const errors = []

    //     if (!description) errors.push("Please provide description")
    //     if (!uploadFile) errors.push("Please use an MP4 file")

    //     setErrors(errors)
    // }, [description, uploadFile])


    // if (!sessionUser) {  //if user is not log in, form will not show
    //     return null;
    // }


    const handleSubmit = async (e) => {
        e.preventDefault()


        const errors = []

        if (!description) errors.push("Please provide description")
        if (!uploadFile) errors.push("Please use an MP4 file")

        if (errors.length) {
            setErrors(errors)
            return
        }

        setVideoLoading(true);
        const video = { userId: sessionUser.id, description, uploadFile }

        console.log(video, "<<<<<=========VIDEO")
        await dispatch(postVideo(video))

        setVideoLoading(false);

        setErrors([])

        history.push(`/videos`) //redirect to home after added
    }


    const uploadVideo = (e) => {
        const video = e.target.files[0]
        setUploadFile(video)
    }



    return (
        <body className="uploadBody">
            <section className="container">
                <form className="uploadVideoForm" onSubmit={handleSubmit}>
                    <div class="brand-logo"></div>
                    {/* <div class="brand-title">Upload</div> */}
                    <ul className="errors">
                        {errors.map((error, indx) => (
                            <li key={indx}>
                                {error}
                            </li>
                        ))}
                    </ul>
                    <div className="uploadInput">
                        <label >CAPTION</label>
                        <div className="miniDiv">
                            <input
                                type="text"
                                placeholder="Type here..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                // required
                                className="postInput"
                            />
                        </div>


                        {/* <label className="fileHead">Please use Cloudinary for your MP3/MP4 files</label> */}
                        <label>FILE UPLOAD</label>
                        <div className="miniDiv">
                            <input
                                type="file"
                                name="uploadFile"
                                // placeholder="MP3/MP4"
                                // value={uploadFile}
                                accept="video/*"
                                onChange={uploadVideo}
                                // required
                                className="postInput"
                            />
                        </div>
                    </div>
                        <button className="updateBtn" type="Submit" disabled={errors.length > 0}>Upload Video</button>
                        {(videoLoading) &&
                            <img src="https://res.cloudinary.com/dv3gxfdon/image/upload/v1652780250/Tag-For-Moving-Gif-With-Transparent-Background-Loading-Bar-_xkkqi7.gif" className="loadingImg"/>
                        }
                </form>
            </section>
        </body>
    )
}
export default Upload;
