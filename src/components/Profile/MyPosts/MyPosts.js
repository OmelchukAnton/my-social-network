import s from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = (props) => {

    let postsElements = props.posts.map((p, i) => <Post key={i} message={p.message} likesCount={p.likesCount} />);

    return (
        <div className={s.postsBlock}>
            <h3>my posts</h3>
            <div> <textarea></textarea> </div>
            <div><button>add post</button></div>
            <div>new post</div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    );
  }
  
  export default MyPosts;
  