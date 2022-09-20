import "./singlePost.css"
import { useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removePost, searchPost, setDefaultRemovePost } from "../../store/slices/postSlice";
import Load from "../../components/load/Load";
import CommentForm from "../../components/commentForm/CommentForm";
import Comments from "../../components/comments/Comments";

export default function Post() {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { id } = useParams();
    
    
    useEffect(() => {
        dispatch(searchPost(id, dispatch));// eslint-disable-next-line
    }, [])

    const selector = useSelector((state) => state.postSlice)
    
    const blog = selector.post.post;

    const handleDelete = (e) => {
        e.preventDefault();

        dispatch(removePost(id, dispatch));
    }

    useEffect(() => {
        if(selector.deletePost.isDeleted){
            dispatch(setDefaultRemovePost(dispatch));
            navigate("/");
        }// eslint-disable-next-line
    }, [selector.deletePost])

    const handleEdit = (e) => {
        e.preventDefault();

        navigate(`/edit/${blog._id}`)
    }

    const date = new Date(blog ? blog.updatedAt : "");
  return (
    <div className="contenedor singlePost">
        {
            blog ? 
            <>
                <div className="bigPost">
                    <img className="bigPostImage" src={blog.imagen} alt={blog.titulo}/>
                    <p className="bigPostDate valera">Ultima actualización: {date.toLocaleString()}</p>
                    <p className="bigPostAuthor valera">Autor: <span>{blog.creador.nombre + " " + blog.creador.apellido}</span></p>
                    <p className="bigPostTitle">{blog.titulo}</p>
                    <p className="bigPostCategoria josefin">Categoria: <span>{blog.categoria}</span></p>
                    { 
                        blog.creador.correo === JSON.parse(document.cookie.split("=").pop() || "{}").correo ?
                        <div className="btns">
                            <i className="fad fa-edit edit" title="Editar post" onClick={handleEdit}></i>
                            <i className="fad fa-trash delete" title="Eliminar post" onClick={handleDelete}></i>
                        </div>
                        :
                        null
                    }
                    <p className="bigPostDesc lora">
                        {blog.desarrollo}
                    </p>
                </div>
                <div className="comments-title">
                    <h5>Comentarios</h5>
                </div>
                <Comments />
                <CommentForm />
            </>
            :
            null
        }
        {
            selector.deletePost.isDeleting ? 
            <Load />
            :
            null
       }
    </div>
  )
}
