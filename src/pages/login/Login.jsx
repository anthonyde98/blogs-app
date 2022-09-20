import "./login.css"
import UserLogo from "../../components/userLogo/UserLogo"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logUserFormAPI } from "../../store/slices/userSlice";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"
import Load from "../../components/load/Load";
import { toast } from "react-toastify"

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const selector = useSelector((state) => state.userSlice);

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
        else{
            cambiarColor(text.length < 1);
        }
    };

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(!validateEmail(email) || password.length < 5){
            toast("Todos los campos deben ser completados correctamente.", {
                type: "warning",
                theme: "dark"
            })
            return;
        }

        dispatch(logUserFormAPI({ correo: email, contrasena: password }, dispatch));
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
        <h2 className="formulario-title">Iniciar sesión</h2>
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
                <div className="btns-container">
                    <button type="submit" className="btn btn-primary">Iniciar</button>
                    <Link className="btn btn-success" to="/register">Registrar <i className="fad fa-arrow-alt-right"></i></Link>
                </div>
            </form>
        </div>
    </div>
  )
}
