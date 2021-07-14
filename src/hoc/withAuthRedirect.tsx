import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import {AppStateType} from '../redux/redux-store';

let mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
});

type MapPropsType = {
    isAuth: boolean
}

type DispatchPropsType = {
}

export function withAuthRedirect<WrappedComponentProps> (WrappedComponent: React.ComponentType) {

    const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = (props) => {
        let {isAuth, ...restProps} = props;

        if(!isAuth) return <Redirect to='/login' />

        return <WrappedComponent />
    }

    let ConnectedAuthRedirectComponent = connect<MapPropsType, DispatchPropsType, WrappedComponentProps, AppStateType>(
        mapStateToPropsForRedirect)
    (RedirectComponent)

    return ConnectedAuthRedirectComponent;
}