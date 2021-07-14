import React from "react";
import s from './Post.module.css';

type PropsType = {
    message: string
    likesCount: number
}

const Post: React.FC<PropsType> = (props) => {
    return (
        <div className={s.item}>
            <img alt="img" src="https://dthezntil550i.cloudfront.net/kg/latest/kg1802132010216500004834729/1280_960/557d644f-12f3-49e1-bb66-23c16400540d.png"/>
            {props.message}
            <div>
                <span>{props.likesCount} like</span>
            </div>
        </div>
    );
  }
  
  export default Post;
  