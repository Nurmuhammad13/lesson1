import React from 'react'

export default function PostItem({post,user}) {
    return (
        <div className="item">
            <div className="post-header">
                <h4>{post.id}. {post.title}</h4>
                <h4>{user}</h4>
            </div>
            <div className="post-body">
                {post.body}
            </div>
        </div>
    )
}