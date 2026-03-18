import {Component} from 'react'

import CommentItem from '../CommentItem'
import {v4 as uuidv4} from 'uuid'
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
    commentsList: [],
    name: '',
    comment: '',
    searchInput: '',
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangeComment = event => {
    this.setState({comment: event.target.value})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onAddComment = () => {
    const {name, comment, commentsList} = this.state

    if (name === '' || comment === '') {
      return alert('Please Enter the  Name and Comment')
    }

    if (comment.length > 200) {
      return alert('Maximum 200  Chareters are allowed')
    }

    const randomIndex = Math.floor(
      Math.random() * initialContainerBackgroundClassNames.length,
    )

    const backgroundColorClass =
      initialContainerBackgroundClassNames[randomIndex]

    const newComment = {
      id: uuidv4(),
      name,
      comment,
      isLike: true,
      backgroundColorClass,
      date: new Date(),
    }

    this.setState({
      commentsList: [...commentsList, newComment],
      name: '',
      comment: '',
    })
  }

  updatedLikeIcon = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLike: !eachComment.isLike}
        } else {
          return eachComment
        }
      }),
    }))
  }

  deleteComments = id => {
    const {commentsList} = this.state
    const deleteComments = commentsList.filter(
      eachComment => eachComment.id !== id,
    )

    this.setState({commentsList: deleteComments})
  }
  render() {
    const {name, comment, commentsList, searchInput} = this.state
    const filterdProjects = commentsList.filter(eachComment =>
      eachComment.name.toLowerCase().includes(searchInput.toLowerCase()),
    )

    let sortedComments = [...filterdProjects].reverse()
    return (
      <div className="comment-container">
        <div className="comment-container2">
          <h1 className="heading">Comments</h1>
          <div className="comment-container3">
            <div className="image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
                alt="comments"
                className="comment-image"
              />
            </div>
            <div className="information-container">
              <p className="para">Say Something About 4.0 Technologies</p>
              <input
                type="search"
                placeholder="Your Name"
                value={name}
                className="input"
                onChange={this.onChangeName}
              />
              <textarea
                rows="8"
                cols="30"
                placeholder="Your Comment"
                value={comment}
                className="big-input"
                onChange={this.onChangeComment}
              ></textarea>
              <button className="comment-button" onClick={this.onAddComment}>
                Add Comment
              </button>
            </div>
          </div>
          <hr className="line" />
          <div className="length-search-container">
            <h2 className="comment-count">
              <span className="count">{commentsList.length}</span> Comments
            </h2>
            <input
              type="search"
              placeholder="Search Comment"
              className="input-search"
              value={searchInput}
              onChange={this.onChangeSearchInput}
            />
          </div>
          <ul className="comments-list">
            {sortedComments.map(eachComment => (
              <CommentItem
                key={eachComment.id}
                commentDetails={eachComment}
                updatedLikeIcon={this.updatedLikeIcon}
                deleteComments={this.deleteComments}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
