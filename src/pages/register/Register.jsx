import "./register.css"
import UserLogo from "../../components/userLogo/UserLogo"
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUserFormAPI } from "../../store/slices/userSlice";
import Load from "../../components/load/Load";
import { toast } from 'react-toastify';

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");

    const selector = useSelector((state) => state.userSlice);
    const dispatch = useDispatch();

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i; // eslint-disable-line
        return re.test(email);
    };

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
        
        if(icon === "correo"){
            cambiarColor(!validateEmail(text));
        }
        else if(icon === "contra"){
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(!validateEmail(email) || password.length < 5 || name.length < 1 || lastName.length < 1){
            toast("Todos los campos deben ser completados correctamente.", {
                type: "warning",
                theme: "dark"
            })
            return;
        }

        dispatch(registerUserFormAPI({ correo: email, contrasena: password, nombre: name, apellido: lastName }, dispatch));
    };

  return (
    <div className="container">
        {
            selector.isLoading ? 
            <Load />
            :
            null
       }
        <UserLogo />
        <h2 className="formulario-title">Registrarse</h2>
        <div className="formulario-container card">
            <form className="formulario" onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                    <span className="input-group-text"><i id="correo" className="fad fa-at"></i></span>
                    <input type="email" className="form-control" placeholder="Correo" onBlur={(e) => {validadorLeft("correo", e.target.value)}} onChange={(e) => {setEmail(e.target.value)}}></input>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text"><i id="contra" className="fad fa-key"></i></span>
                    <input type="password" className="form-control" placeholder="Contraseña" onBlur={(e) => {validadorLeft("contra", e.target.value)}} onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text"><i id="nombre" className="fad fa-address-card"></i></span>
                    <input type="text" className="form-control" placeholder="Nombres" onBlur={(e) => {validadorLeft("nombre", e.target.value)}} onChange={(e) => setName(e.target.value)}></input>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text"><i id="apellido" className="fad fa-address-card"></i></span>
                    <input type="text" className="form-control" placeholder="Apellidos" onBlur={(e) => {validadorLeft("apellido", e.target.value)}} onChange={(e) => setLastName(e.target.value)}></input>
                </div>
                <div className="btns-container">
                    <button type="submit" className="btn btn-success">Registrarse</button>
                </div>
            </form>
        </div>
        <Link className="btn btn-light login" to="/"><i className="fad fa-arrow-alt-left"></i> Login</Link>
    </div>
  )
}
