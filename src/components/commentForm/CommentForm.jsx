import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./commentForm.css"
import { sendComment, setDefaultSetComment, updateComment, setDefaultEditComment } from "../../store/slices/commentSlice";
import { useEffect, useState } from "react";
import Load from "../load/Load";
import { toast } from "react-toastify"

export default function CommentForm() {
    const [comment, setComment] = useState("");
    const [tipoComponente, setTipoComponente] = useState("Comentar");
    const [currentPosition, setCurrentPosition] = useState(0);

    const { id } = useParams();

    const dispatch = useDispatch();

    const selector = useSelector((state) => state.commentSlice);

    useEffect(() => {
      if(selector.setComment.isCreated){
        setComment("");
        dispatch(setDefaultSetComment(dispatch));
      }// eslint-disable-next-line
    }, [selector.setComment])
    
    useEffect(() => {
      if(selector.editComment.isEditing && selector.editComment.comment){
        setComment(selector.editComment.comment.comentario);// eslint-disable-next-line
        setTipoComponente("Editar");
        setCurrentPosition(document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop)
        document.body.scrollTop = document.body.clientHeight; 
        document.documentElement.scrollTop = document.body.clientHeight;
      }
      if(selector.editComment.isEdited){
        editToComent();
        document.body.scrollTop = currentPosition; 
        document.documentElement.scrollTop = currentPosition;
        setCurrentPosition(0);
      }
      // eslint-disable-next-line
    }, [selector.editComment])
    
    const handlerComment = (e) => {
      e.preventDefault();
      
      if(comment.length < 1){
        toast("No puedes enviar un comentario vacío.", {
          type: "warning",
          theme: "dark"
        })
        return;
      }

      if(id && tipoComponente === "Comentar"){
        dispatch(sendComment(id, comment, dispatch));
      }
      else if(id && tipoComponente === "Editar"){
        dispatch(updateComment(selector.editComment.comment._id, comment, dispatch))
      }
    }

    const handleCancel = (e) => {
      e.preventDefault();
      editToComent();
    }

    const editToComent = () => {
      setComment("");
      setTipoComponente("Comentar");
      dispatch(setDefaultEditComment(dispatch));
    }

  return (
    <div className="addComment">
        <h6>{ tipoComponente === "Comentar" ? "Agrega un" : "Editar" } comentario</h6>
        <form onSubmit={handlerComment}>
            <div className="input-group">
                <textarea className="titulo form-control" aria-label="With textarea" value={comment} onChange={e => setComment(e.target.value)}></textarea>
            </div>
            <button type="submit" className="btn btn-primary mt-2">{tipoComponente}</button>
            { tipoComponente === "Editar" ? <button type="button" onClick={handleCancel} className="btn btn-danger mt-2 ms-2">Cancelar</button> : null }
        </form>
        {
            selector.setComment.isCreating ? <Load /> : null
        }
    </div>
  )
}
