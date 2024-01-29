import React, { useEffect } from 'react'
import PostItem from './PostItem'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserPosts } from '../slice/myPosts';

export default function MyPosts() {
  let state = useSelector(state => state.myPostsSlice);
  let {user} = useSelector(state => state.authReducer);
  let dispatch = useDispatch();

  useEffect(()=>{
    if(user){
      dispatch(fetchUserPosts(user.id));
    }
  },[dispatch,user]);
  return (
    <div className='section' id='section'>
      <h2>My Posts</h2>
      <div className="section-content">
        {
          state.data ? state.data.map(post => <PostItem key={post.id} user={user.username} post={post} />) : "loading . . ."
        }
      </div>
    </div>
  )
}