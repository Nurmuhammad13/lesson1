import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PostItem from './PostItem';
import { fetchPosts, paginate } from '../slice/posts';

export default function Posts() {
  let dispatch = useDispatch();
  let { data, partData, limit, status, error } = useSelector(state => state.postsSlice);
  let btnParent = useRef();

  function unActivate(){
    for(let i=0;i<btnParent.current.children.length;i++){
      btnParent.current.children[i].classList.remove("active");
    }
  }

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const btns = [];

  for (let index = 0; index < (data.length / limit); index++) {
    btns.push(index);
  }

  return (
    <div className='section' id='section'>
      <h2>Posts</h2>
      <div className="section-content">
        {
          status == "loading" ? <h2>Loading . . .</h2>
          : status == "failed" ? <h2>{error}</h2>
          : partData.map(post => <PostItem key={post.id} post={post} />)
        }
      </div>
      <div className="pagination" ref={btnParent}>
        {
          btns.map(item => {
            return(
              <a href='#section'
                key={item}
                className={""}
                onClick={(e) => {
                  unActivate();
                  e.target.classList.add("active");
                  dispatch(paginate(item * limit));
                }}
              >
                  {item + 1}
              </a>
            )
          })
        }
      </div>
    </div>
  )
}