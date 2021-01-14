import DialogItem from './DialogItem/DialogItem';
import s from './Dialogs.module.css';
import Message from './Message/Message';

const Dialogs = (props) => {
    let dialogsElements = props.state.dialogs.map((d, i) => <DialogItem key={i} name={d.name} id={d.id} />);
    let messagesElements = props.state.messages.map((m, i) => <Message key={i} message={m.message} id={m.id}/>);
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>

            <div className={s.messages}>
                {messagesElements}
            </div>
        </div>
    );
  }
  
  export default Dialogs;
  