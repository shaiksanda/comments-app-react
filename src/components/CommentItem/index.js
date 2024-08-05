import {formatDistanceToNow} from 'date-fns'
import './index.css'

// Function to determine background color class based on initials
const getBackgroundColorClass = name => {
  const colors = [
    'amber',
    'blue',
    'orange',
    'emerald',
    'teal',
    'red',
    'light-blue',
  ]

  // Generate a consistent index based on the name
  const index = name.charCodeAt(0) % colors.length
  return colors[index]
}

const CommentItem = props => {
  const {
    data,

    onClickLike,
    onDelete,
  } = props
  const {name, comment, dateTime, isLiked, id} = data
  const initial = name[0]

  const handleClick = () => {
    onClickLike(id)
  }

  const handleDelete = () => {
    onDelete(id)
  }

  const likedImage = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  // Use the function to get a consistent background color class
  const backgroundColorClass = getBackgroundColorClass(name)

  return (
    <li style={{padding: '10px'}}>
      <div className="name-container">
        <h1 className={`initial-container ${backgroundColorClass}`}>
          {initial}
        </h1>
        <h1 className="name">{name}</h1>
        <p className="date">
          {formatDistanceToNow(new Date(dateTime), {addSuffix: true})}
        </p>
      </div>
      <div className="comment-container">
        <div style={{display: 'flex'}}>
          <img src={likedImage} alt="like" className="like-icon" />
          <button onClick={handleClick} type="button">
            Like
          </button>
        </div>
        <p>{comment}</p>
        <button
          onClick={handleDelete}
          className="button"
          type="button"
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default CommentItem
