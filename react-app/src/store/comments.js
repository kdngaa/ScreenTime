const LOAD = 'comments/LOAD'

const ADD_COMMENT = 'comments/ADD_COMMENT'

const REMOVE_COMMENT = 'comments/REMOVE_COMMENT'

const LOAD_ONE_COMMENT = 'comments/LOAD_ONE_COMMENT';

const EDIT_COMMENT = 'comments/EDIT_COMMENT'


const load = comments => {
    return {
        type: LOAD,
        comments
    }
}



const loadOneComment = comment => ({
    type: LOAD_ONE_COMMENT,
    comment
});


const editComment = comment => ({
    type: EDIT_COMMENT,
    comment
})



const addComment = comment => {
    return {
        type: ADD_COMMENT,
        comment
    }
}


const removeComment = id => {
    return {
        type: REMOVE_COMMENT,
        id
    }
}


//THIS IS TO GET ALL COMMENTS
// export const getComments = () => async dispatch => {
//     const result = await fetch('/api/comments/', {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     if (result.ok) {
//         const comments = await result.json()
//         dispatch(load(comments))
//         return result
//     }
// }





// POST A COMMENT
export const postComment = (comment, id) => async dispatch => {
    const res = await fetch(`/api/comments/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    })
    if (res.ok) {
        const info = await res.json()
        dispatch(addComment(info))
        return info
    }
}




// // GET COMMENT BY ID
export const loadComments = id => async dispatch => {
    const result = await fetch(`/api/comments/${id}`);
    if (result.ok) {
        const data = await result.json();
        dispatch(load(data));
        return data
    }
}





//REMOVE COMMENT
export const removeAComment = id => async dispatch => {
    const res = await fetch(`/api/comments/${id}`, {
        method: 'DELETE',
    });

    if (res.ok) {
        // const info = await res.json()
        await dispatch(removeComment(id));
        return res
    }
}




//EDIT COMMENT
export const editAComment = comment => async dispatch => {
    const res = await fetch(`/api/comments/${comment.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    })

    if(res.ok){
        const info = await res.json()
        await dispatch(editComment(info))
        return res
    }
}




// COMMENTS REDUCER
// const initialState = { comments: [] }

const initialState = {}

const commentReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD:
            const allComments = {};
            action.comments.comments.forEach(comment => {
                allComments[comment.id] = comment
            });
            return {
                ...state,
                ...allComments
            };
        // case LOAD_ONE_COMMENT:
        //     const newState = {}
        //     newState[action.comment.comment.id] = action.comment.comment;
        //     return {
        //         ...state, ...newState
        //     };

        case ADD_COMMENT:
            if (!state[action.comment.id]) {
                newState = {
                    ...state,
                    [action.comment.id]: action.comment
                }
                return newState
            }
            return {
                ...state,
                [action.comment.id]: {
                    ...state[action.comment.id],
                    ...action.comment
                }
            }
        case REMOVE_COMMENT:
            newState = { ...state }
            delete newState[action.id]
            return newState

        case EDIT_COMMENT:
            newState = {...state}
            newState[action.comment.id] = action.comment
            return newState
        default:
            return state
    }
}


export default commentReducer;
