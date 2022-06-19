import React from 'react';
import './comments_stile.css'

const Comment = (props) => {
    return (
        <div className="post_inner">
            <div className="post_inner_button"></div>
            <p className="post_inner_text">{props.comment}</p>
        </div>

    )
};

export default Comment;