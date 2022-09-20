import { useDispatch } from "react-redux";
import { removeComment, searchComment } from "../../store/slices/commentSlice";
import "./comment.css"

export default function Comment(props) {
  const date = new Date(props.comment.createdAt);
  
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.preventDefault()
    dispatch(removeComment(props.comment._id));
  }

  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(searchComment(props.comment._id, dispatch));
  }

  return (
    <div className="comment">
        <p className="name valera">{props.comment.creador.nombre + " " + props.comment.creador.apellido}</p>
        <p className="text lora">{props.comment.comentario}</p>
        <p className="date josefin">{date.toLocaleString()}</p>
        {
          props.comment.creador.correo === JSON.parse(document.cookie.split("=").pop() || "{}").correo ? 
          <div className="comment-btns">
            <i className="fad fa-edit edit" title="Editar comentario" onClick={handleEdit}></i> 
            <i className="fad fa-trash delete" title="Eliminar comentario" onClick={handleDelete}></i> 
          </div>
          : 
          null
        }
    </div>
  )
}
