import { useNavigate } from 'react-router-dom'
import './post.css'

export default function Post(props) {

  let navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/post/${props.post._id}`)
  }

  return (
    <div className="miniPost" title={props.post.titulo} onClick={handleClick}>
        <img className="miniPostImage" src={props.post.imagen || "https://www.giulianisgrupo.com/wp-content/uploads/2018/05/nodisponible.png"} alt="props.post.tile"/>
        <p className="miniPostAuthor valera">Autor: <span>{props.post.creador.nombre + " " + props.post.creador.apellido}</span></p>
        <p className="miniPostTitle">{props.post.titulo}</p>
        <p className="miniPostDesc lora">
            {props.post.desarrollo}
        </p>
    </div>
  )
}
