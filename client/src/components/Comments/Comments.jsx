import { useState } from "react";
import "./comments.css";
import { FaUser } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import PropTypes from "prop-types";

export default function Comments({ comments }) {
  const [commentValue, setCommentValue] = useState("");
  const [addComment, SetAddComment] = useState([]);
  const [readMore, setReadMore] = useState(null);

  const handleCommentValue = (e) => {
    setCommentValue(e.target.value);
  };

  const addNewComment = () => {
    if (!commentValue) {
      return;
    }
    SetAddComment([...addComment, { id: new Date(), comment: commentValue }]);
    setCommentValue("");
  };

  const keyPressed = (e) => {
    if (e.key === "Enter") {
      addNewComment();
    }
  };

  const deleteComment = (index) => {
    SetAddComment(addComment.filter((_, i) => i !== index));
  };

  const handleDelete = () => {
    setCommentValue("");
  };

  const handleShow = (index) => {
    setReadMore(index);
  };

  return (
    <div id="Comments">
      <h2>COMMENTS</h2>
      <div className="user-input-container">
        <input
          className="input-comments"
          type="text"
          value={commentValue}
          onInput={handleCommentValue}
          placeholder="Enter your comment..."
          onKeyDown={keyPressed}
        />
        <div className="buttons-container-comments">
          <button
            type="button"
            className="cancel-button"
            onClick={handleDelete}
          >
            Cancel
          </button>
          <button
            type="button"
            className={
              commentValue.length > 0 ? "add-button" : "add-button-none"
            }
            onClick={addNewComment}
          >
            Add comment
          </button>
        </div>
      </div>

      <div className="all-list-container">
        <div className="comments-list-container">
          {addComment &&
            addComment.map((add, index) => (
              <div key={add} className="list">
                <p className="username">
                  {" "}
                  <FaUser className="user-btn" />
                  You <span className="date"> posted just Now</span>
                </p>
                <p className="comment-content">{add.comment}</p>
                <button
                  type="button"
                  className="delete-comment"
                  onClick={() => deleteComment(index)}
                  aria-label="button-delete"
                >
                  <IoMdClose />
                </button>
              </div>
            ))}
        </div>

        <div className="comments-list-container">
          {comments.map((comment, index) => (
            <div key={comment.id} className="list">
              <p className="username">
                {" "}
                <FaUser className="user-btn" /> {comment.author}{" "}
                <span className="date">
                  posted on {comment.created_at.slice(0, 10)}
                </span>
              </p>{" "}
              <div className="show-more">
                {comment.content.length > 400 ? (
                  <p className="comment-content">
                    ? {comment.content.slice(0, 400)} ...{" "}
                  </p>
                ) : (
                  <p> {comment.content} </p>
                )}
                {readMore !== index && (
                  <p
                    className="show-more-button"
                    onClick={() => {
                      handleShow(index);
                    }}
                    role="presentation"
                  >
                    Show more
                  </p>
                )}
              </div>
              {readMore === index && (
                <div className="show-more">
                  <p className="comment-content">{comment.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Comments.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      author: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
    })
  ).isRequired,
};
