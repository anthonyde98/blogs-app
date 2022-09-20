import { createSlice } from '@reduxjs/toolkit'
import Axios from 'axios';
import { api } from '../../api/apiRoute';
import { toast } from 'react-toastify';

const initialState = {
    posts: {
        posts: [],
        error: false
    },
    ultimoPost: {
        ultimoPost: [],
        error: false
    },
    post: {
        post: undefined,
        error: false
    },
    misPosts: {
        posts: [],
        error: false
    },
    createPost: {
        isCreating: false,
        isCreated: false,
        error: false
    },
    deletePost: {
        isDeleting: false,
        isDeleted: false,
        error: false
    },
    editPost: {
        isEditing: false,
        isEdited: false,
        error: false
    }
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPosts: (state, action) => {
        state.posts.posts = action.payload.error ? state.posts.posts : action.payload.posts;
        state.posts.error = action.payload.error;
    },
    setPost: (state, action) => {
        state.post.post = action.payload.error ? state.post.post : action.payload.post;
        state.post.error = action.payload.error;
    },
    setUltimoPost: (state, action) => {
        state.ultimoPost.ultimoPost = action.payload.error ? state.ultimoPost.ultimoPost : action.payload.ultimoPost;
        state.ultimoPost.error = action.payload.error;
    },
    createPost: (state, action) => {
        state.createPost.isCreating = action.payload.isCreating;
        state.createPost.isCreated = action.payload.isCreated;
        state.createPost.error = action.payload.error;
    },
    deletePost: (state, action) => {
        state.deletePost.isDeleting = action.payload.isDeleting;
        state.deletePost.isDeleted = action.payload.isDeleted;
        state.deletePost.error = action.payload.error;
    },
    editPost: (state, action) => {
        state.editPost.isEditing = action.payload.isEditing;
        state.editPost.isEdited = action.payload.isEdited;
        state.editPost.error = action.payload.error;
    }
  }
})

export const { setPosts, setPost, setUltimoPost, misPosts, createPost, deletePost, editPost } = postSlice.actions;

export default postSlice.reducer;

export const searchPosts = (path, filtro, dispatch) => async () => {
    const { categoria, titulo } = filtro;

    try {
        const postData = await Axios.get(`${api}app/${path === "/" ? "blog" : "user/blog"}`, { headers: { Authorization: `Bearer ${JSON.parse(document.cookie.split("=").pop() || "{}").token}` }, params: { categoria, titulo } });

        if(postData.status === 200){
            dispatch(setPosts({posts: postData.data, error: false}))
        }
        else{
            dispatch(setPosts({error: true}))
            toast("Hubo un error al obtener los posts.", {
                type: "error",
                theme: "dark",
            })
        }
    } catch (error) {
        searchPosts(path, filtro, dispatch);
        toast("Hubo un error al obtener los posts.", {
            type: "error",
            theme: "dark",
        })
    }
}

export const searchPost = (postId, dispatch) => async () => {
    try {
        const postData = await Axios.get(`${api}app/blog/${postId}`, { headers: { Authorization: `Bearer ${JSON.parse(document.cookie.split("=").pop() || "{}").token}` } });

        if(postData.status === 200){
            dispatch(setPost({post: postData.data, error: false}))
        }
        else{
            dispatch(setPost({error: true}))
            toast("Hubo un error al obtener el post.", {
                type: "error",
                theme: "dark",
            })
        }
    } catch (error) {
        if(error.response.status === 404){
            dispatch(setPost({error: true}))
            toast("No se encontró este post.", {
                type: "error",
                theme: "dark",
            })
        }
        else{
            dispatch(setPost({error: true}))
            toast("Hubo un error al obtener el post.", {
                type: "error",
                theme: "dark",
            })
        }
    }
}

export const searchLastPost = (dispatch) => async () => {
    try {
        const postData = await Axios.get(`${api}app/last/blog`, { headers: { Authorization: `Bearer ${JSON.parse(document.cookie.split("=").pop() || "{}").token}` } });

        if(postData.status === 200){
            dispatch(setUltimoPost({ultimoPost: postData.data, error: false}))
        }
        else{
            dispatch(setUltimoPost({error: true}))
            toast("Hubo un error al obtener el post más reciente.", {
                type: "error",
                theme: "dark",
            })
        }
    } catch (error) {
        if(error.response.status === 404){
            dispatch(setUltimoPost({error: true}))
            toast("No se encontró ningun post más reciente.", {
                type: "error",
                theme: "dark",
            })
        }
        else{
            dispatch(setUltimoPost({error: true}))
            toast("Hubo un error al obtener el post más reciente.", {
                type: "error",
                theme: "dark",
            })
        }
    }
}

export const sendPost = (post, dispatch) => async () => {
    dispatch(createPost({isCreating: true, isCreated: false, error: false}));
    try {
        const postData = await Axios.post(`${api}app/blog`, post, { headers: { Authorization: `Bearer ${JSON.parse(document.cookie.split("=").pop() || "{}").token}` } });

        if(postData.status === 201){
            dispatch(createPost({isCreating: false, isCreated: true, error: false}));
            toast("Post creado.", {
                type: "success",
                theme: "dark",
            })
        }
        else{
            dispatch(createPost({isCreating: false, isCreated: false, error: true}));
            toast("Hubo un error al crear el post.", {
                type: "error",
                theme: "dark",
            })
        }
    } catch (error) {
        dispatch(createPost({isCreating: false, isCreated: false, error: true}));
        toast("Hubo un error al crear el post.", {
            type: "error",
            theme: "dark",
        })
    }
}

export const setDefaultCreatePost = (dispatch) => () => {
    dispatch(createPost({isCreating: false, isCreated: false, error: false}));
}

export const removePost = (postId, dispatch) => async () => {
    dispatch(deletePost({isDeleting: true, isDeleted: false, error: false}));
    try {
        const postData = await Axios.delete(`${api}app/blog/${postId}`, { headers: { Authorization: `Bearer ${JSON.parse(document.cookie.split("=").pop() || "{}").token}` } });
        
        if(postData.status === 200){
            dispatch(deletePost({isDeleting: false, isDeleted: true, error: false}));
            toast("Post eliminado.", {
                type: "success",
                theme: "dark",
            })
        }
        else{
            dispatch(deletePost({isDeleting: false, isDeleted: false, error: true}));
            toast("Hubo un error al eliminar el post.", {
                type: "error",
                theme: "dark",
            })
        }
    } catch (error) {
        dispatch(deletePost({isDeleting: false, isDeleted: false, error: true}));
        toast("Hubo un error al eliminar el post.", {
            type: "error",
            theme: "dark",
        })
    }
}

export const setDefaultRemovePost = (dispatch) => () => {
    dispatch(deletePost({isDeleting: false, isDeleted: false, error: false}));
}

export const updatePost = (postId, data, dispatch) => async () => {
    dispatch(editPost({isEditing: true, isEdited: false, error: false}));
    try {
        const postData = await Axios.put(`${api}app/blog/${postId}`, data, { headers: { Authorization: `Bearer ${JSON.parse(document.cookie.split("=").pop() || "{}").token}` } });

        if(postData.status === 200){
            dispatch(editPost({isEditing: false, isEdited: true, error: false}));
            toast("Post editado.", {
                type: "success",
                theme: "dark",
            })
        }
        else{
            dispatch(editPost({isEditing: false, isEdited: false, error: true}));
            toast("Hubo un error al editar el post.", {
                type: "error",
                theme: "dark",
            })
        }
    } catch (error) {
        dispatch(editPost({isEditing: false, isEdited: false, error: true}));
        toast("Hubo un error al editar el post.", {
            type: "error",
            theme: "dark",
        })
    }
}

export const setDefaultUpdatePost = (dispatch) => () => {
    dispatch(editPost({isEditing: false, isEdited: false, error: false}));
}