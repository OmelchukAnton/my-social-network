import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import './App.css';
// import DialogsContainer from './components/Dialogs/DialogsContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import Navigation from './components/Navigation/Navigation';
import ProfileContainer from './components/Profile/ProfileContainer';
import UsersContainer from './components/Users/UsersContainer';
import { initializeApp } from './redux/appReducer';
import { connect, Provider } from 'react-redux';
import Preloader from './components/common/Preloader/Preloader';
import { compose } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/redux-store'
import { withSuspense } from './hoc/withSuspense';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
// const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

class App extends Component {
  componentDidMount() {
    this.props.initializeApp();
  }
  render() {
    if(!this.props.initialized) {
      return <Preloader />
    }
    return (
      <div className='app-wrapper'>
        <HeaderContainer />
        <Navigation />
        <div className='app-wrapper-content'>
          <Switch>
            <Route path='/' render={() => <Redirect to={"/profile"}/>} />
            <Route path='/profile/:userId' render={ () => <ProfileContainer/> }/>
            <Route path='/dialogs' render={ withSuspense(DialogsContainer)}/>
            <Route path='/users' render={() => <UsersContainer pageTitle={"SAMURAI"} />} />
            <Route path='/login' render={() => <Login />} />
            <Route path="*" render={() => <div>404 NOT FOUND</div>} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
});

let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, {initializeApp}))(App);

let MainApp = (props) => {
  return <BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
}

export default MainApp;
