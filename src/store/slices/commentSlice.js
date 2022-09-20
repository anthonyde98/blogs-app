import { createSlice } from '@reduxjs/toolkit'
import Axios from 'axios';
import { api } from '../../api/apiRoute';
import { toast } from 'react-toastify';

const initialState = {
    setComment: {
        isCreating: false,
        isCreated: false,
        error: false
    },
    comments: [],
    editComment: {
        comment: undefined,
        isEditing: false,
        isEdited: false,
        error: false
    }
};

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setComment: (state, action) => {
        state.setComment.isCreating = action.payload.isCreating;
        state.setComment.isCreated = action.payload.isCreated;
        state.setComment.error = action.payload.error;
    },
    getComments: (state, action) => {
        state.comments = action.payload;
    },
    editComment: (state, action) => {
        state.editComment.comment = action.payload.comment;
        state.editComment.isEditing = action.payload.isEditing;
        state.editComment.isEdited = action.payload.isEdited;
        state.editComment.error = action.payload.error;
    }
  }
})

export const { setComment, getComments, editComment } = commentSlice.actions;

export default commentSlice.reducer;

export const sendComment = (postId, text, dispatch) => async () => {
    dispatch(setComment({isCreating: true, isCreated: false, error: false}))
    try {
        const postData = await Axios.post(`${api}app/comment`, {blog: postId, comentario: text}, { headers: { Authorization: `Bearer ${JSON.parse(document.cookie.split("=").pop() || "{}").token}` }});

        if(postData.status === 201){
            dispatch(setComment({isCreating: false, isCreated: true, error: false}))
            toast("Comentario agregado.", {
                type: "success",
                theme: "dark"
            })
        }
        else{
            dispatch(setComment({isCreating: false, isCreated: false, error: true}))
            toast("Hubo un error al agregar el comentario.", {
                type: "error",
                theme: "dark"
            })
        }
    } catch (error) {
        dispatch(setComment({isCreating: false, isCreated: false, error: true}))
        toast("Hubo un error al agregar el comentario.", {
            type: "error",
            theme: "dark"
        })
    }
}

export const setDefaultSetComment = (dispatch) => () => {
    dispatch(setComment({isCreating: false, isCreated: false, error: false}));
}

export const tryComments = (postId, dispatch) => async () => {
    try {
        const postData = await Axios.get(`${api}app/comments/${postId}`, { headers: { Authorization: `Bearer ${JSON.parse(document.cookie.split("=").pop() || "{}").token}` }});
       
        if(postData.status === 200){
            dispatch(getComments(postData.data))
        }
        else{
            toast("Hubo un error al obtener los comentarios.", {
                type: "error",
                theme: "dark"
            })
        }
    } catch (error) {
        toast("Hubo un error al obtener los comentarios.", {
            type: "error",
            theme: "dark"
        })
    }
}

export const searchComment = (commentId, dispatch) => async () => {
    try {
        const postData = await Axios.get(`${api}app/comment/${commentId}`, { headers: { Authorization: `Bearer ${JSON.parse(document.cookie.split("=").pop() || "{}").token}` }});

        if(postData.status === 200){
            dispatch(editComment({comment: postData.data, isEditing: true, isEdited: false, error: false}))
        }
        else{
            toast("Hubo un error al obtener el comentario.", {
                type: "error",
                theme: "dark"
            })
        }
    } catch (error) {
        toast("Hubo un error al obtener el comentario.", {
            type: "error",
            theme: "dark"
        })
    }
}

export const updateComment = (commentId, text, dispatch) => async () => {
    try {
        const postData = await Axios.put(`${api}app/comment/${commentId}`, { comentario: text }, { headers: { Authorization: `Bearer ${JSON.parse(document.cookie.split("=").pop() || "{}").token}` }});

        if(postData.status === 200){
            dispatch(editComment({comment: undefined, isEditing: false, isEdited: true, error: false}));
            toast("Comentario editado.", {
                type: "success",
                theme: "dark"
            })
        }
        else{
            dispatch(editComment({comment: undefined, isEditing: false, isEdited: false, error: true}))
            toast("Hubo un error al obtener el comentario.", {
                type: "error",
                theme: "dark"
            })
        }
    } catch (error) {
        dispatch(editComment({comment: undefined, isEditing: false, isEdited: false, error: true}))
        toast("Hubo un error al obtener el comentario.", {
            type: "error",
            theme: "dark"
        })
    }
}

export const setDefaultEditComment = (dispatch) => () => {
    dispatch(editComment({comment: undefined, isEditing: false, isEdited: false, error: false}));
}

export const removeComment = (commentId) => async () => {
    try {
        const postData = await Axios.delete(`${api}app/comment/${commentId}`, { headers: { Authorization: `Bearer ${JSON.parse(document.cookie.split("=").pop() || "{}").token}` }});

        if(postData.status === 200){
            toast("Comentario eliminado.", {
                type: "success",
                theme: "dark"
            })
        }
        else{
            toast("Hubo un error al eliminar el comentario.", {
                type: "error",
                theme: "dark"
            })
        }
    } catch (error) {
        toast("Hubo un error al eliminar el comentario.", {
            type: "error",
            theme: "dark"
        })
    }
}

