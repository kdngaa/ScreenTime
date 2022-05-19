import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './UploadVideoForm.css'
import { postVideo } from "../../store/videos";
import { useHistory } from "react-router-dom";

function Upload() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [description, setDescription] = useState("")
    const [title, setTitle] = useState("")
    const [uploadFile, setUploadFile] = useState(null)
    const [videoLoading, setVideoLoading] = useState(false);
    const [errorVisible, setErrorVisible] = useState(false)
    const [errors, setErrors] = useState([])

    const sessionUser = useSelector((state) => state.session.user)



    useEffect(() => {
        const errorsArr = []
        const fileType = ["mp4", "3gp", "mov", "m4a", "m4v"];

        if (!description) errorsArr.push("Please provide description")
        if (description.length > 255) errorsArr.push("Please keep description at 255 characters or less")
        if (!title) errorsArr.push("Please provide title")
        if (title.length > 8) errorsArr.push("Please keep title at 8 characters or less")
        if (!uploadFile) errorsArr.push("Can't leave field empty")
        if (!fileType.includes(uploadFile?.name?.split(".").pop())) {
            errorsArr.push("Valid file type required");
        }

        setErrors(errorsArr)
    }, [description, uploadFile, title])


    if (!sessionUser) {  //if user is not log in, form will not show
        return null;
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        setErrorVisible(true)


        const video = { userId: sessionUser.id, description, uploadFile, title }



        if (errors.length === 0) {
            setVideoLoading(true);

            await dispatch(postVideo(video))

            setVideoLoading(false);

            history.push(`/videos`) //redirect to home after added
        }

        setErrorVisible([])
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
                    {errorVisible && (<ul className="errors">
                        {errors.map((error, indx) => (
                            <li key={indx}>
                                {error}
                            </li>
                        ))}
                    </ul>)}
                    <div className="uploadInput">
                        <label >TITLE</label>
                        <div className="miniDiv">
                            <input
                                type="text"
                                placeholder="Title..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                // required
                                className="postInput"
                            />
                        </div>




                        <label >CAPTION</label>
                        <div className="miniDiv">
                            <textarea
                                type="text"
                                placeholder="Type here..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                maxLength="256"
                                // required
                                className="captionInput"
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
                        <button className="updateBtn" type="Submit">Upload Video</button>
                        {(videoLoading) &&
                            <img src="https://res.cloudinary.com/dv3gxfdon/image/upload/v1652780250/Tag-For-Moving-Gif-With-Transparent-Background-Loading-Bar-_xkkqi7.gif" className="loadingImg" style={{ width: '250px', height: '250px' }} />
                        }
                    </div>
                </form>
            </section>
        </body>
    )
}
export default Upload;
