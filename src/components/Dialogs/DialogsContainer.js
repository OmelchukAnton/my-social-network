import { connect } from 'react-redux';
import { sendMessageCreator, updateNewMessageBodyCreator } from './../../redux/dialogsReducer';
import Dialogs from './Dialogs';

// const DialogsContainer = () => {
//     return (
//         <StoreContext.Consumer> 
//         { 
//             store => {
//                 let onSendMessageClick = () => {
//                     store.dispatch(sendMessageCreator());
//                 } 
//                 let onNewMessageChange = (body) => {
//                     body = store.dispatch(updateNewMessageBodyCreator(body));
//                 }

//                 return (<Dialogs dialogsPage={store.getState().dialogsPage} 
//                                 onSendMessageClick={onSendMessageClick} 
//                                 onNewMessageChange={onNewMessageChange} />)
//             }
//         }       
//         </StoreContext.Consumer>
//     );
//   }

  let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage
    }
  }

  let mapDispatchToProps = (dispatch) => {
    return {
        onSendMessageClick: () => {
            dispatch(sendMessageCreator())
        },
        onNewMessageChange: (body) => {
            body = dispatch(updateNewMessageBodyCreator(body));
        }
    }
  }

  const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);
  
  export default DialogsContainer;
  