import './sideBar.css'
import { useState, useEffect } from "react";
import Post from '../../components/post/Post'
import { useDispatch, useSelector } from "react-redux";
import { searchPosts, searchLastPost } from '../../store/slices/postSlice';

export default function SideBar() {
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("");
  const dispatch = useDispatch();

  const search = () => {
    dispatch(searchPosts(window.location.pathname, {categoria: categoria === "all" ? "" : categoria, titulo: busqueda}, dispatch))
  }

  useEffect(() => {
    dispatch(searchLastPost(dispatch));// eslint-disable-next-line
  }, [])

  const selector = useSelector((state) => state.postSlice)
    
  const blog = selector.ultimoPost.ultimoPost;
  
  useEffect(() => {
    search();// eslint-disable-next-line
  }, [categoria, busqueda]);

  const handleCategory = (e) => {
    if(e.target){
      
      if(e.target.textContent === "")
      {
        setCategoria("all")
      }
      else{
        setCategoria(e.target.textContent);
      }
    }
  }

  return (
    <div className='sideBar'>
      <div className="buscador card">
        <div className="input-group">
            <span className="input-group-text"><i className="fad fa-search"></i></span>
            <input type="text" className="form-control" placeholder="Busca un post" onChange={(e) => {setBusqueda(e.target.value);}}></input>
        </div>
      </div>
      <div className="categorias card">
        <p className="redo">
          <i className="fad fa-redo-alt" onClick={handleCategory}></i>
        </p>
        <div>
          <p onClick={handleCategory}>Deportes</p>
          <p onClick={handleCategory}>Videojuegos</p>
          <p onClick={handleCategory}>Tecnología</p>
        </div>
        <div>
          <p onClick={handleCategory}>Cotidiano</p>
          <p onClick={handleCategory}>Naturaleza</p>
          <p onClick={handleCategory}>Cocina</p>
        </div>
      </div>
      <div className='lastPost'>
        <h4>Post más reciente</h4>
        { blog.length > 0 ? <Post post={blog[0]} /> : null }
      </div>
    </div>
  )
}
