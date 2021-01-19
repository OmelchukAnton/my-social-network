import s from './Post.module.css';

const Post = (props) => {

    return (
        <div className={s.item}>
            <img alt="image" src="https://dthezntil550i.cloudfront.net/kg/latest/kg1802132010216500004834729/1280_960/557d644f-12f3-49e1-bb66-23c16400540d.png"/>
            {props.message}
            <div>
                <span>{props.likesCount} like</span>
            </div>
        </div>
    );
  }
  
  export default Post;
  