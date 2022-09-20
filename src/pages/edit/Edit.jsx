import PostForm from '../../components/postForm/PostForm'
import './edit.css'

export default function Edit() {
  return (
    <div className='contenedor edit'>
      <h2 className='title'>Editar post</h2>
      <PostForm/>
    </div>
  )
}
