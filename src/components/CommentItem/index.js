// Write your code here
import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {commentDetails, updatedLikeIcon, deleteComments} = props
  const {id, name, comment, isLike, backgroundColorClass, date} = commentDetails

  const time = formatDistanceToNow(new Date(date))

  const onToggleLike = () => {
    updatedLikeIcon(id)
  }

  const onDeleteComments = () => {
    deleteComments(id)
  }

  const likeDisLike = isLike
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'

  const addlike = isLike ? '' : 'like'

  const firstLetter = name[0].toUpperCase()

  return (
    <li>
      <div className="main-container">
        <div className="first-container">
          <div className="first-row">
            <div className="first-letter-container">
              <h1 className={`heading2 ${backgroundColorClass}`}>
                {firstLetter}
              </h1>
            </div>
            <div className="time-comment-container">
              <div className="time-row">
                <h1 className="name">{name}</h1>
                <p className="time">{time} ago</p>
              </div>
              <p className="comment">{comment}</p>
            </div>
          </div>
          <div className="like-delete-container">
            <div className="like-container">
              <button
                className={`like-button ${addlike}`}
                onClick={onToggleLike}
              >
                <img src={likeDisLike} className="like-image" /> Like
              </button>
            </div>
            <div className="delete-container">
              <button className="delete-button" onClick={onDeleteComments}>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
                  alt="delete"
                  className="delete-image"
                />
              </button>
            </div>
          </div>
          <hr />
        </div>
      </div>
    </li>
  )
}

export default CommentItem
