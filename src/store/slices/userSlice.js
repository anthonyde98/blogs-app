import { createSlice } from '@reduxjs/toolkit'
import { user } from '../../api/auth'
import { api } from '../../api/apiRoute';
import { toast } from 'react-toastify';
import Axios from 'axios';

const initialState = {
  auth: {
    isLoading: false,
    isAuth: false,
    error: false
  },
  user: {
    user: undefined,
    isLoading: false
  },
  editUser: {
    isEdited: false,
    isEditing: false,
    error: false
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginPending: (state) => {
        state.auth.isLoading = true;
    },
    loginSuccess: (state) => {
        state.auth.isLoading = false;
        state.auth.isAuth = true;
        state.auth.error = false;
    },
    loginFail: (state) => {
        state.auth.isLoading = false;
        state.auth.isAuth = false;
        state.auth.error = true;
    },
    loginOut: (state) => {
        state.auth.isLoading = false;
        state.auth.isAuth = false;
        state.auth.error = false;
    },
    setUser: (state, action) => {
        state.user.user = action.payload.user;
        state.user.isLoading = action.payload.isLoading;
    },
    setEdit: (state, action) => {
        state.editUser.isEditing = action.payload.isEditing;
        state.editUser.isEdited = action.payload.isEdited;
        state.editUser.error = action.payload.error;
    }
  },
})

export const { loginPending, loginSuccess, loginFail, loginOut, setUser, setEdit } = userSlice.actions;

export default userSlice.reducer;

const expires = (day) => {
    const d = new Date();
    d.setTime(d.getTime() + (day*24*60*60*1000));
    return d.toUTCString();
}

export const logUserFormAPI = (userCredentials, dispatch) => async () => {
    dispatch(loginPending());
    const credentials = userCredentials;

    try {
        const userData = await user.post('login', credentials);

        if(userData.status === 200){
            document.cookie = `user=${JSON.stringify(userData.data)}; expires=${expires(1)}; path=/;`
            dispatch(loginSuccess());
            toast("Bienvenido " + userData.data.nombre, {
                type: "success",
                theme: "dark"
            })
        }
        else{
            dispatch(loginFail());
            toast("Hubo un error al comparar credenciales.", {
                type: "error",
                theme: "dark"
            })
        }
    } catch (error) {
        if(error.response.status === 404){
            dispatch(loginFail());
            toast("Correo no encontrado.", {
                type: "error",
                theme: "dark"
            })
        }
        else if(error.response.status === 400){
            dispatch(loginFail());
            toast(error.response.data.message, {
                type: "error",
                theme: "dark"
            })
        }
        else{
            dispatch(loginFail());
            toast("Hubo un error al comparar credenciales.", {
                type: "error",
                theme: "dark"
            })
        }
    }
}

export const registerUserFormAPI = (userInfo, dispatch) => async () => {
    dispatch(loginPending());
    const newUserInfo = userInfo;
    try {
        const userData = await user.post('register', newUserInfo);
        if(userData.status === 201){
            document.cookie = `user=${JSON.stringify(userData.data)}; expires=${expires(1)}; path=/;`
            dispatch(loginSuccess()); 
            toast("Gracias por registrarte " + userData.data.nombre, {
                type: "success",
                theme: "dark"
            })
        }
        else{
            dispatch(loginFail());
            toast("Hubo un error al registrar este usuario.", {
                type: "error",
                theme: "dark"
            })
        }
    } catch (error) {
        if(error.response.status === 400){
            dispatch(loginFail());
            toast(error.response.data.message, {
                type: "error",
                theme: "dark"
            })
        }
        else{
            dispatch(loginFail());
            toast("Hubo un error al registrar este usuario.", {
                type: "error",
                theme: "dark"
            })
        }
    }
}

export const logOut = (dispatch) => async () => {
    document.cookie = `user=; expires=${expires(-1)}; path=/;`
    dispatch(loginOut());
}

export const getUser = (dispatch) => async () => {
    dispatch(setUser({user: undefined, isLoading: true}));
    try {
        const userData = await Axios.get(`${api}app/user`, { headers: { Authorization: `Bearer ${JSON.parse(document.cookie.split("=").pop() || "{}").token}` }});
        if(userData.status === 200){
            dispatch(setUser({user: userData.data, isLoading: false}));
        }
        else{
            dispatch(setUser({user: undefined, isLoading: false}));
            toast("Hubo un error al obtener los datos.", {
                type: "error",
                theme: "dark"
            })
        }
    } catch (error) {
        if(error.response.status === 404){
            dispatch(setUser({user: undefined, isLoading: false}));
            toast("No se encontró este usuario.", {
                type: "error",
                theme: "dark"
            })
        }
        else{
            dispatch(setUser({user: undefined, isLoading: false}));
            toast("Hubo un error al obtener los datos.", {
                type: "error",
                theme: "dark"
            })
        }
    }
}

export const setUserDefault = (dispatch) => async () => {
    dispatch(setUser({user: undefined, isLoading: false}));
}

export const setEditUser = (data, dispatch) => async () => {
    dispatch(setEdit({isEditing: true, isEdited: false, error: false}));
    let editData = {};
    const { contrasena, nombre, apellido  } = data;
    editData = { nombre, apellido };
    if(contrasena !== "*****"){
        editData.contrasena = contrasena;
    }
    try {
        const userData = await Axios.put(`${api}app/user`, editData, { headers: { Authorization: `Bearer ${JSON.parse(document.cookie.split("=").pop() || "{}").token}` }});
        if(userData.status === 200){
            dispatch(setEdit({isEditing: false, isEdited: true, error: false}));
            let data = JSON.parse(document.cookie.split("=").pop() || "{}");
            data.nombre = userData.data.nombre + " " + userData.data.apellido;
            document.cookie = `user=${JSON.stringify(data)}`;
            toast("Usuario editado.", {
                type: "success",
                theme: "dark"
            })
        }
        else{
            dispatch(setEdit({isEditing: false, isEdited: false, error: true}));
            toast("Hubo un error al editar el usuario.", {
                type: "error",
                theme: "dark"
            })
        }
    } catch (error) {
        if(error.response.status === 404){
            dispatch(setEdit({isEditing: false, isEdited: false, error: true}));
            toast("No se encontró este usuario.", {
                type: "error",
                theme: "dark"
            })
        }
        else{
            dispatch(setEdit({isEditing: false, isEdited: false, error: true}));
            toast("Hubo un error al editar el usuario.", {
                type: "error",
                theme: "dark"
            })
        }
    }
}


export const setEditDefault = (dispatch) => async () => {
    dispatch(setEdit({isEditing: false, isEdited: false, error: false}));
}