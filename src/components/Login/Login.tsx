import React from 'react';
import {InjectedFormProps, reduxForm} from 'redux-form';
import {required} from '../../utils/validators/validators';
import {createField, Input} from '../common/FormsControls/FormsControls';
import {connect} from 'react-redux';
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
                {error }
            </div>}
            <div>
                <button> Log in </button>
            </div>
        </form>)
}

const LoginReduxForm = reduxForm<LoginFormValuesType>({form: 'login'})(LoginForm);

type MapStatePropsType = {
    isAuth: boolean
}

type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean) => void
}

export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
}

type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>

const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    const onSubmit = (formData: any) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if(props.isAuth) {
        return <Redirect to={"/profile"} />
    }

    return <div>
        <h1>login page</h1>
        <LoginReduxForm onSubmit={onSubmit} />
    </div>
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth
});
export default connect(mapStateToProps, {login})(Login);