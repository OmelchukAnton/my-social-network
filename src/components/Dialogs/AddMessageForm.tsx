import {maxLengthCreator, required} from "../../utils/validators/validators";
import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Textarea} from "../common/FormsControls/FormsControls";
import {NewMessageFormValuesType} from "./Dialogs";

const maxLength50 = maxLengthCreator(50);

type NewMessageFormValuesKeysType = Extract<keyof NewMessageFormValuesType, string>
type PropsType = {}

const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType, PropsType> & PropsType> = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <>
                {createField<NewMessageFormValuesKeysType>("Enter your message", "newMessageBody", [required, maxLength50], Textarea)}
            </>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

// @ts-ignore
export default reduxForm<NewMessageFormValuesKeysType>({form: 'dialog-add-message-form'})(AddMessageForm);