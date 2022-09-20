import './header.css'
import { Link, useLocation} from "react-router-dom";

export default function Header() {
    let path = useLocation().pathname;
    
  return (
    <div className="header">
        <div className="content">
            <Link className="link" to="/">
                <div className="logo lora">
                    <h2><i className="fad fa-blog"></i> Blog</h2>
                </div>
            </Link>
            <div className="menu">
                <Link className="link" to="/" style={ path === "/" ? {fontWeight: "bold"} : {} }>
                    Inicio
                </Link>
                |
                <Link className="link" to="/create" style={ path === "/create" ? {fontWeight: "bold"} : {} }>
                    Crear post
                </Link>
                |
                <Link className="link" to="/misPosts" style={ path === "/misPosts" ? {fontWeight: "bold"} : {} }>
                    Mis posts
                </Link>
            </div>
        </div>
    </div>
  )
}
