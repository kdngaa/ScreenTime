const LOAD = 'videos/LOAD';
const LOAD_ONE_VIDEO = 'videos/LOAD_ONE_VIDEO';
const ADD_VIDEO = 'videos/ADD_VIDEO'
const EDIT_VIDEO = 'videos/EDIT_VIDEO'
const REMOVE_VIDEO = 'videos/REMOVE_VIDEO'




const load = videos => ({
  type: LOAD,
  videos
})


const loadOneVideo = video => ({
  type: LOAD_ONE_VIDEO,
  video
});


const addVideo = video => {
  return {
    type: ADD_VIDEO,
    video
  }
}


const removeVideo = id => {
  return {
    type: REMOVE_VIDEO,
    id
  }
}


const editVideo = video => ({
  type: EDIT_VIDEO,
  video
})







export const loadAllVideosThunk = () => async dispatch => {
  const result = await fetch('/api/videos/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (result.ok) {
    const videos = await result.json();
    dispatch(load(videos))
    return result;
  }
}


export const loadVideoThunk = id => async dispatch => {
  const result = await fetch(`/api/videos/${id}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (result.ok) {
    const data = await result.json();
    dispatch(loadOneVideo(data));
  }
}




// POST A VIDEO
export const postVideo = (videoId) => async dispatch => {
  const { userId, uploadFile, description, title } = videoId

  const formData = new FormData();

  formData.append('userId', userId)
  formData.append('description', description)
  formData.append('title', title)

  if (uploadFile) {
    formData.append('uploadFile', uploadFile)
  }

  // setVideoLoading(true);


  const res = await fetch(`/api/videos/new`, {
    method: 'POST',
    body: formData
  })
  if (res.ok) {
    const info = await res.json()
    dispatch(addVideo(info))
    // return res
  }
}






//EDIT VIDEO
export const editAVideo = video => async dispatch => {
  const res = await fetch(`/api/videos/${video.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(video)
  })

  if (res.ok) {
    const info = await res.json()
    await dispatch(editVideo(info))
    return res
  }
}






//REMOVE VIDEO
export const removeAVideo = id => async dispatch => {
  const res = await fetch(`/api/videos/${id}`, {
    method: 'DELETE',
  });

  if (res.ok) {
    // const info = await res.json()
    await dispatch(removeVideo(id));
    return res
  }
}





const initialState = {}

const videoReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_ONE_VIDEO:
      newState = {}
      newState[action.video.video.id] = action.video.video;
      return {
        ...state, ...newState
      };
    case LOAD:
      const allVideos = {};
      action.videos.videos.forEach(video => {
        allVideos[video.id] = video
      });
      return {
        ...state,
        ...allVideos
      };
    case ADD_VIDEO:
      if (!state[action.video.id]) {
        newState = {...state}
          // [action.video.id]: action.video
        newState[action.video.uploadFile.id] = action.video.uploadFile;
        return newState
      }
      return {
        ...state,
        [action.video.id]: {
          ...state[action.video.id],
          ...action.video
        }
      }
    case EDIT_VIDEO:
      newState = { ...state }
      newState[action.video.id] = action.video
      return newState
    case REMOVE_VIDEO:
      newState = { ...state }
      delete newState[action.id]
      return newState

    default:
      return state;
  }
}

export default videoReducer;
