import "./user.css"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getUser, logOut, setEditUser, setUserDefault, setEditDefault } from "../../store/slices/userSlice";
import { useState } from "react";
import Load from "../load/Load";
import { toast } from 'react-toastify';
import { useEffect } from "react";

export default function User() {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [iconDoor, setIconDoor] = useState("right")
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.userSlice)

  const handleLogOut = (e) => {
      e.preventDefault();
      dispatch(logOut(dispatch));
      navigate("/");
  }
  const nombre = JSON.parse(document.cookie.split("=").pop() || "{}").nombre

  const handleDoor = (e) => {
    e.preventDefault();
    const userContent = document.getElementById("userContent");
    const editUser = document.getElementById("editUser");
    const door = document.getElementById("door");
    if(userContent.style.display === "none"){
      userContent.style.display = "flex";
      door.style.animation = "getOut 1s";
      setIconDoor("left");
    }
    else{
      userContent.style.animation = "left 1s";
      door.style.animation = "left 1s";
      editUser.style.animation = "left 1s";
      setIconDoor("right")
      setTimeout(() => {
        door.style.animation = "";
        userContent.style.animation = "";
        userContent.style.display = "none";
        editUser.style.display = "none"
        editUser.style.animation = ""
        dispatch(setEditDefault(dispatch));
        setInputsDefault();
        setDefaultIcon();
      }, 900);
    }
  }

  const setInputsDefault = () => {
    setPassword("");
    setName("");
    setLastName("");
  }

  const setDefaultIcon = () => {
    document.getElementById("nombre").style.color = "black"
    document.getElementById("apellido").style.color = "black"
    document.getElementById("contra").style.color = "black"
  }

  const validadorLeft = (icon, text) => {
    const element = document.getElementById(icon);

    const cambiarColor = (result) => {
        if(result){
            element.style.color = "red"
        }
        else{
            element.style.color = "green"
        }
    }
    
    if(icon === "contra"){
        cambiarColor(text.length < 5);
    }
    else if(icon === "nombre"){
        cambiarColor(text.length < 1);
    }
    else if(icon === "apellido"){
        cambiarColor(text.length < 1);
    }
    else{
        cambiarColor(text.length < 1);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    
    if(password.length < 5 || name.length < 1 || lastName.length < 1){
        toast("Todos los campos deben ser completados correctamente.", {
            type: "warning",
            theme: "dark"
        })
        return;
    }

    dispatch(setEditUser({ contrasena: password, nombre: name, apellido: lastName }, dispatch));
  };

  const handleOpenEdit = (e) => {
    e.preventDefault();

    const editUser = document.getElementById("editUser");
    if(editUser.style.display === "none"){
      editUser.style.display = "flex";
      dispatch(getUser(dispatch));
    }
    else{
      editUser.style.animation = "left 1s";
      setTimeout(() => {
        editUser.style.animation = "";
        editUser.style.display = "none";
        dispatch(setEditDefault(dispatch));
        setInputsDefault();
        setDefaultIcon();
      }, 900);
    }
  };

  useEffect(() => {
    if(selector.user.user && !selector.user.isLoading){
      setPassword("*****");
      setName(selector.user.user.nombre);
      setLastName(selector.user.user.apellido);
      dispatch(setUserDefault(dispatch));
    }

    if(selector.editUser.isEdited){
      dispatch(setEditDefault(dispatch));
      const editUser = document.getElementById("editUser");
      editUser.style.animation = "left 1s";
      setTimeout(() => {
        editUser.style.animation = "";
        editUser.style.display = "none";
        setInputsDefault();
        setDefaultIcon();
      }, 900);
    }
    // eslint-disable-next-line
  }, [selector.user, selector.editUser])
  

  return (
    <>
    {
      selector.user.isLoading || selector.editUser.isEditing ? <Load /> : null
    }
    <div className="user-container">
      <div id="userContent" className="user-content" style={{display: "none"}}>
        <div className="userMiniLogo valera">
          {nombre[0].toUpperCase()}
        </div>
        <div className="userName">
          {nombre}
        </div>
        <div className="btn cerrarSesion mt-2" onClick={handleLogOut}>
          Cerrar sesión
        </div>
        <div className="btn editarUsuario mt-2" onClick={handleOpenEdit}>
          Editar usuario
        </div>
      </div>
      <i id="door" className={"fad fa-angle-" + iconDoor} onClick={handleDoor}></i>
      <div id="editUser" className="userEditContent" style={{display: "none"}}>
        <form onSubmit={handleEdit}>
          <div className="input-group mb-3">
              <span className="input-group-text"><i id="contra" className="fad fa-key"></i></span>
              <input type="password" className="form-control" placeholder="Contraseña" value={password} onBlur={(e) => {validadorLeft("contra", e.target.value)}} onChange={(e) => setPassword(e.target.value)}></input>
          </div>
          <div className="input-group mb-3">
              <span className="input-group-text"><i id="nombre" className="fad fa-address-card"></i></span>
              <input type="text" className="form-control" placeholder="Nombres" value={name} onBlur={(e) => {validadorLeft("nombre", e.target.value)}} onChange={(e) => setName(e.target.value)}></input>
          </div>
          <div className="input-group mb-3">
              <span className="input-group-text"><i id="apellido" className="fad fa-address-card"></i></span>
              <input type="text" className="form-control" placeholder="Apellidos" value={lastName} onBlur={(e) => {validadorLeft("apellido", e.target.value)}} onChange={(e) => setLastName(e.target.value)}></input>
          </div>
          <button type="submit" className="btn btn-primary mt-1">Editar</button>
          <button type="button" className="btn btn-danger mt-1 ms-2" onClick={handleOpenEdit}>Cancelar</button>
        </form>
      </div>
    </div>
    </>
  )
}
