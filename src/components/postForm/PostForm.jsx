import './postForm.css'
import { useState, useRef, useEffect } from 'react';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Load from '../load/Load';
import { searchPost, sendPost, setDefaultCreatePost, setDefaultUpdatePost, updatePost } from '../../store/slices/postSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify"

export default function PostForm() {
    const [categoria, setCategoria] = useState("Deportes");
    const [titulo, setTitulo] = useState("");
    const [desarrollo, setDesarrollo] = useState("");
    const [imagen, setImagen] = useState("https://compresorescopeland.com/wp-content/uploads/2017/06/no-disponible.jpg");
    const [tipoComponente, setTipoComponente] = useState("Publicar")

    const { id } = useParams(); 
    
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const selector = useSelector((state) => state.postSlice);

    let blog;

    useEffect(() => {
      if(id){
        dispatch(searchPost(id, dispatch));
      }// eslint-disable-next-line
    }, [])

    useEffect(() => {
      if(selector.post.post){
        // eslint-disable-next-line
        blog = selector.post.post._id === id && selector.post.post;
      }

      if(id && blog){
        if(blog.creador.correo === JSON.parse(document.cookie.split("=").pop() || "{}").correo){
          setCategoria(blog.categoria);
          setTitulo(blog.titulo);
          setDesarrollo(blog.desarrollo);
          setImagen(blog.imagen);
          setTipoComponente("Editar");
        }
        else{
          navigate("/")
        }
      }
    }, [selector.post])
    
    useEffect(() => {
      if(selector.editPost.isEdited){
        dispatch(setDefaultUpdatePost(dispatch));
        defaultInput();
        navigate("/")
      }// eslint-disable-next-line
    }, [selector.editPost])
    
    useEffect(() => {
      if(selector.createPost.isCreated){
        dispatch(setDefaultCreatePost(dispatch));
        defaultInput();
      }// eslint-disable-next-line
    }, [selector.createPost])
    
    const inputRef = useRef(null);
    const defaultInput = () => {
      setCategoria("Deportes");
      setTitulo("");
      setDesarrollo("");
      setImagen("https://compresorescopeland.com/wp-content/uploads/2017/06/no-disponible.jpg")
    }

    const handleChange = (e) => {
        e.preventDefault();
        const imageFile = e.target.files[0];
        if (e.target.files && e.target.files[0]) {
          const formData = new FormData();
          formData.append('file', imageFile);
          formData.append('upload_preset', "j9fch8tz");

          Axios.post("https://api.cloudinary.com/v1_1/dlobfizxs/image/upload", formData).then((response) => {
            setImagen(response.data.secure_url)
          }).catch((error) => {
            toast("Hubo un error al subir la imagen al servidor.", {
              type: "error",
              theme: "dark"
            })
          })
        }
    };

    const handleClick = (e) => {
        e.preventDefault();
        inputRef.current.click();
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(categoria.length < 1 || titulo.length < 1 || desarrollo.length < 1){
          toast("Todos los campos deben ser completados correctamente.", {
            type: "warning",
            theme: "dark"
        })
          return;
        }
        
        if(tipoComponente === "Editar"){
          dispatch(updatePost(id, {categoria, titulo, desarrollo, imagen}, dispatch));
        }
        else{
          dispatch(sendPost({categoria, titulo, desarrollo, imagen}, dispatch));
        }
    }
    
    useEffect(() => {
      if(selector.createPost.isCreated){
        dispatch(setDefaultCreatePost(dispatch));
        setCategoria("Deportes");
        setTitulo("");
        setDesarrollo("");
        setImagen("https://compresorescopeland.com/wp-content/uploads/2017/06/no-disponible.jpg")
      }// eslint-disable-next-line
  }, [selector.createPost])
  return (
    <div className="create-form card">
      {
            selector.createPost.isCreating || selector.editPost.isEditing  ? 
            <Load />
            :
            null
       }
        <form className="formulario" onSubmit={handleSubmit}>
          <div className="image-cont">
            <input
              className='image-input'
              type='file'
              id='image'
              accept='image/*'
              ref={inputRef}
              onChange={handleChange}
            />
            <button className='boton' onClick={handleClick}>
              <i className="fad fa-image"></i>
            </button> <span>Selecciona una imagen</span> 
            <img src={imagen} alt="preview" title='Preview'/>
          </div>

          <h4 className='josefin'>Selecciona una categoria</h4>
          <select className="form-select" aria-label="Default select example" onChange={e => setCategoria(e.target.value)} value={categoria}>
            <option value="Deportes">Deportes</option>
            <option value="Tecnología">Tecnología</option>
            <option value="Videojuegos">Videojuegos</option>
            <option value="Cocina">Cocina</option>
            <option value="Naturaleza">Naturaleza</option>
            <option value="Cotidiano">Cotidiano</option>
          </select>

          <h4 className='josefin'>Coloca un titulo</h4>
          <div className="input-group">
            <textarea className="titulo form-control" aria-label="With textarea" value={titulo} onChange={e => setTitulo(e.target.value)}></textarea>
          </div>
          <h4 className='josefin'>Coloca el desarrollo de tu post</h4>
          <div className="input-group">
            <textarea className="desc form-control" aria-label="With textarea" value={desarrollo} onChange={e => setDesarrollo(e.target.value)}></textarea>
          </div>
          <button type='submit' className='mt-3 btn btn-primary d-block mx-auto'>{tipoComponente}</button>
        </form>
      </div>
  )
}
