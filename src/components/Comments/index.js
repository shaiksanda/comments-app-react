import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    inputValue: '',
    count: 0,
    commentsList: [],
    textarea: '',
  }

  onDelete = id => {
    const {commentsList} = this.state
    const filteredComments = commentsList.filter(each => each.id !== id)
    this.setState({
      commentsList: filteredComments,
      count: filteredComments.length,
    })
  }

  onClickLike = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(each =>
        each.id === id ? {...each, isLiked: !each.isLiked} : each,
      ),
    }))
  }

  handleSubmit = event => {
    event.preventDefault() // Prevent default form submission behavior
    const {inputValue, textarea} = this.state

    if (inputValue.trim() && textarea.trim()) {
      const newComment = {
        id: uuidv4(),
        name: inputValue,
        comment: textarea,
        dateTime: new Date().toLocaleString(),
        isLiked: false,
      }
      this.setState(prevState => ({
        commentsList: [...prevState.commentsList, newComment],
        inputValue: '',
        textarea: '',
        count: prevState.commentsList.length + 1,
      }))
    }
  }

  handleInputChange = event => {
    this.setState({inputValue: event.target.value})
  }

  handleTextareaChange = event => {
    this.setState({textarea: event.target.value})
  }

  render() {
    const {commentsList, inputValue, textarea, count} = this.state

    return (
      <div style={{padding: '20px'}}>
        <div className="comments-container">
          <div className="image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="comments-image"
            />
          </div>
          <form onSubmit={this.handleSubmit}>
            <h1>Comments</h1>
            <p>Say something about 4.0 Technologies</p>
            <input
              placeholder="Your Name"
              value={inputValue}
              onChange={this.handleInputChange}
              className="input"
              style={{height: '35px', width: '200px'}}
            />
            <br />
            <textarea
              placeholder="Your Comment"
              value={textarea}
              onChange={this.handleTextareaChange}
              className="input"
              rows="4"
              cols="23"
            />
            <br />
            <button type="submit">Add Comment</button>
          </form>
        </div>
        <hr className="custom-hr" />
        <ul className="ul">
          <p
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '10px',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                height: '30px',
                width: '30px',
                backgroundColor: 'lightblue',
              }}
              className="span"
            >
              {count}
            </span>
            Comments
          </p>
          {commentsList.map(each => (
            <CommentItem
              initialContainerBackgroundClassNames={
                initialContainerBackgroundClassNames
              }
              onDelete={this.onDelete}
              onClickLike={this.onClickLike}
              data={each}
              key={each.id}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Comments
