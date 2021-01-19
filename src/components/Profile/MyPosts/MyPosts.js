import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = (props) => {
    let postsElements = props.posts.map((p, i) => <Post key={i} message={p.message} likesCount={p.likesCount} />);

    let newPostElement = React.createRef();

    let addPost = () => {
        props.addPost();
    }

    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.updateNewPostText(text);
    }

    return (
        <div className={s.postsBlock}>
            <h3>my posts</h3>
            <div> 
                <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText} />
            </div>
            <div><button onClick={addPost}>add post</button></div>
            <div>new post</div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    );
  }
  
  export default MyPosts;
  