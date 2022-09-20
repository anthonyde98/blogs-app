import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { tryComments } from "../../store/slices/commentSlice";
import Comment from "../comment/Comment"
import "./comments.css"

export default function Comments() {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  const selector = useSelector((state) => state.commentSlice);
  const selectorDelete = useSelector((state) => state.postSlice);

  useEffect(() => {
    if(!selectorDelete.deletePost.isDeleted && !selectorDelete.deletePost.isDeleting)
    {
      dispatch(tryComments(id, dispatch));
    }
    // eslint-disable-next-line
  }, [selector.comments])

  return (
     <div className="comments">
        {
            selector.comments.length > 0 ? selector.comments.map(comment => <Comment key={comment._id} comment={comment} />) : null
        }
    </div>
  )
}
