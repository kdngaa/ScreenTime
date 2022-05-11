const LOAD = 'videos/LOAD';
const LOAD_ONE_VIDEO = 'videos/LOAD_ONE_VIDEO';

const load = videos => ({
    type: LOAD,
    videos
  })


const loadOneVideo = video => ({
    type: LOAD_ONE_VIDEO,
    video
  });


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


  const initialState = {}

  const videoReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOAD_ONE_VIDEO:
        const newState = {}
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
    //   case ADD_GROUP:
    //     const newGroup = {  };
    //     newGroup[action.group.group.id] = action.group.group;
    //     //return newGroup;
    //     return {...state, ...newGroup};
    //   case EDIT_ONE_GROUP:
    //     return {
    //       ...state,
    //       [action.group.id]: action.group
    //     };
    //   case DELETE_ONE_GROUP:
    //     const deletedState = {...state};
    //     delete deletedState[action.group];
    //     return deletedState
      default:
        return state;
    }
  }

  export default videoReducer;
