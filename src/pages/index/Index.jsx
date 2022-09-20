import "./index.css"
import SideBar from '../../components/sideBar/SideBar'
import Post from "../../components/post/Post"
import { useSelector } from "react-redux";
import NoPost from "../../components/noPost/NoPost";

export default function Index() {

  const selector = useSelector((state) => state.postSlice);

  return (
    <div className="contenedor">
      <div className="posts">
        {
          selector.posts.posts.length > 0 ?
            selector.posts.posts.map(post => <Post key={post._id} post={post}/>)
          :
          <NoPost />
        }
        </div>
      <SideBar/>
    </div>
  )
}
