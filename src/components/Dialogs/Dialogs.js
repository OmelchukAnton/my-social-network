import DialogItem from './DialogItem/DialogItem';
import s from './Dialogs.module.css';
import Message from './Message/Message';
import { sendMessageCreator, updateNewMessageBodyCreator } from './../../redux/dialogsReducer';

const Dialogs = (props) => {

    let state = props.store.getState().dialogsPage;

    let dialogsElements = state.dialogs.map((d, i) => <DialogItem key={i} name={d.name} id={d.id} />);
    let messagesElements = state.messages.map((m, i) => <Message key={i} message={m.message} id={m.id}/>);
    let newMessageBody = state.newMessageBody;

    let onSendMessageClick = () => {
        props.store.dispatch(sendMessageCreator());
    } 
    let onNewMessageChange = (e) => {
        let body = e.target.value;
        body = props.store.dispatch(updateNewMessageBodyCreator(body));
    } 
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>

            <div className={s.messages}>
                <div>{messagesElements}</div>
                <div>
                    <div><textarea value={newMessageBody} onChange={onNewMessageChange} placeholder='Enter your message'/></div>
                    <div><button onClick={ onSendMessageClick }>send</button></div>
                </div>
            </div>
        </div>
    );
  }
  
  export default Dialogs;
  