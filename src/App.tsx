import React, {Component, ComponentType} from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import {LoginPage} from './components/Login/LoginPage';
import Navigation from './components/Navigation/Navigation';
import { initializeApp } from './redux/appReducer';
import { connect, Provider } from 'react-redux';
import Preloader from './components/common/Preloader/Preloader';
import { compose } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import store, {AppStateType} from './redux/redux-store'
import { withSuspense } from './hoc/withSuspense';
import {UsersPage} from "./components/Users/UsersContainer";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}

const SuspendedDialogs = withSuspense(DialogsContainer);
const SuspendedProfile = withSuspense(ProfileContainer);

class App extends Component<MapPropsType & DispatchPropsType> {
  componentDidMount() {
    this.props.initializeApp();
  }
  render() {
    if(!this.props.initialized) {
      return <Preloader />
    }
    return (
        <div className='app-wrapper'>
          <HeaderContainer/>
          <Navigation/>
          <div className='app-wrapper-content'>
            <Switch>
              <Route exact path='/'
                     render={() => <Redirect to={"/profile"}/>}/>
              <Route path='/dialogs'
                     render={() => <SuspendedDialogs /> }/>
              <Route path='/profile/:userId?'
                     render={() => <SuspendedProfile /> }/>
              <Route path='/users'
                     render={() => <UsersPage pageTitle={"Самураи"}/>}/>
              <Route path='/login'
                     render={() => <LoginPage/>}/>
              <Route path='*'
                     render={() => <div>404 NOT FOUND</div>}/>
            </Switch>
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
});

let AppContainer = compose<ComponentType>(
  withRouter,
  connect(mapStateToProps, {initializeApp}))(App);

let MainApp: React.FC = () => {
  return <BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
}

export default MainApp;
