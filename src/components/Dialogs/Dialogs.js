import { Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../utils/validators/validators';
import { Textarea } from '../common/FormsControls/FormsControls';
import DialogItem from './DialogItem/DialogItem';
import s from './Dialogs.module.css';
import Message from './Message/Message';

const maxLength50 = maxLengthCreator(50);

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field 
                    name={"newMessageBody"}
                    placeholder={"Enter your message"} 
                    component={Textarea}
                    validate={[required, maxLength50]}/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const Dialogs = (props) => {
    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map((d, i) => <DialogItem key={i} name={d.name} id={d.id} />);
    let messagesElements = state.messages.map((m, i) => <Message key={i} message={m.message} id={m.id}/>);
    let newMessageBody = state.newMessageBody;

    let addNewMessage = (values) => {
        props.onSendMessageClick(values.newMessageBody);
    }

    if(!props.isAuth) return <Redirect to={'/login'} />

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div> { messagesElements } </div>
            </div>
            <AddMessageFormRedux onSubmit={addNewMessage} />
        </div>
    );
  }

  const AddMessageFormRedux = reduxForm({form: "dialogAddMessageForm"})(AddMessageForm);
  
  export default Dialogs;