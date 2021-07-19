import React from 'react';
import {InjectedFormProps, reduxForm} from 'redux-form';
import {required} from '../../utils/validators/validators';
import {createField, Input} from '../common/FormsControls/FormsControls';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../redux/authReducer';
import {Redirect} from 'react-router-dom';

import style from "./../common/FormsControls/FormControls.module.css";
import {AppStateType} from '../../redux/redux-store';

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType>> = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<LoginFormValuesTypeKeys>("Email", "email", [required], Input)}
            {createField<LoginFormValuesTypeKeys>("Password", "password", [required], Input, {type: "password"})}
            {createField<LoginFormValuesTypeKeys>(undefined, "rememberMe", [], Input, {type: "checkbox"}, "remember me")}
            {error && <div className={style.formSummaryError}>
                {error}
            </div>}
            <div>
                <button> Log in</button>
            </div>
        </form>)
}

const LoginReduxForm = reduxForm<LoginFormValuesType>({form: 'login'})(LoginForm);

export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
}

type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>

export const LoginPage: React.FC = (props) => {
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);

    const dispatch = useDispatch();


    const onSubmit = (formData: any) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe));
    }

    if (isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return <div>
        <h1>login page</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}
