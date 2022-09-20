import './create.css'
import PostForm from '../../components/postForm/PostForm';

export default function Create() {
  return (
    <div className='contenedor create'>
      <h2 className='title'>Crear post</h2>
      <PostForm />
    </div>
  )
}
