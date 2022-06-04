import './seach.css'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'


const Search = () => {
    const history = useHistory()
    const videos = useSelector((state) => state.videos)
    const vids = Object.values(videos).map((video) => [
        video.title,
        video.description,
        video.id,
    ])






}
