import { connect } from 'react-redux';
import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../redux/profileReducer';
import MyPosts from './MyPosts';

// const MyPostsContainer = () => {
//     return (
//         <StoreContext.Consumer> 
//         {
//             (store) => {
//                 let state = store.getState();

//                 let onAddPost = () => {
//                     store.dispatch(addPostActionCreator());
//                 }
            
//                 let onPostChange = (text) => {
//                     let action = updateNewPostTextActionCreator(text);
//                     store.dispatch(action);
//                 }

//                 return (<MyPosts posts={store.getState().profilePage.posts} 
//                                 newPostText={store.getState().profilePage.newPostText} 
//                                 updateNewPostText={onPostChange} 
//                                 addPost={onAddPost}/>)
//             }
//         }
//         </StoreContext.Consumer>
//     );
//   }

  let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
  }

  let mapDispatchToProps = (dispatch) => {
    return {
        updateNewPostText: (text) => {
            dispatch(updateNewPostTextActionCreator(text))
        },
        addPost: () => {
            dispatch(addPostActionCreator());
        }
    }
  }

  const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);
  
  export default MyPostsContainer;
  