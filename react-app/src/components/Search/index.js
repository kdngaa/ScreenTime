import './seach.css'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'


const Search = () => {
    const history = useHistory()
    const videos = useSelector((state) => state.videos)
    const vids = Object.values(videos).map((video) => [
        video.title,
        video.description,
        video.id,
    ])

    const [search, setSearch] = useState("")
    const [filteredList, setFilteredList] = useState([])
    const [show, setShow] = useState(false)


    useEffect(() => {
        setFilteredList(
            vids.filter(
                (video) =>
                video[0].toLowerCase().includes(search.toLowerCase()) ||
                video[1].toLowerCase().includes(search.toLowerCase())
            )
        )
    }, [search])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(filteredList.length > 0){
            setShow(true)
            history.push(`./videos/${filteredList[0][2]}`)  //index 2 for video ID
        }
    }

    return(
        <div className="search-bar">
        <form onSubmit={handleSubmit}>
          <input
            className="search-bar-input"
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        {search && (
          <div className="search-result">
            <ul className="searchresult-list">
              {filteredList.map((video) => (
                <li
                  key={video.id}
                  value={video.title}
                  onClick={() => {
                    history.push(`/videos/${video[2]}`);
                    setSearch("");
                  }}
                >
                  {video[0]}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )


}

export default Search;
