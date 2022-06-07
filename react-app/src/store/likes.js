const LOAD = 'likes/LOAD'

const ADD_LIKE = 'likes/ADD_LIKE'

const REMOVE_LIKE = 'likes/REMOVE_LIKE'


const load = likes => ({
    type: LOAD,
    likes
});


const postLike = like => ({
    type: ADD_LIKE,
    like
});

const deleteLike = like => ({
    type: REMOVE_LIKE,
    like
});



export const loadLikesThunk = () => async dispatch => {
    const response = await fetch(`/api/likes/`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const likes = await response.json()
        dispatch(load(likes))
    }
}



export const postLikeThunk = id => async dispatch => {
    const response = await fetch(`/api/likes/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            videoId: id
        })
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(postLike(data))
    }
}



export const deleteLikeThunk = id => async dispatch => {
    const response = await fetch(`/api/likes/${id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        dispatch(deleteLike(id))
    }
}


