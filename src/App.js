import { Route } from 'react-router-dom';
import './App.css';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Navigation from './components/Navigation/Navigation';
import ProfileContainer from './components/Profile/ProfileContainer';
import UsersContainer from './components/Users/UsersContainer.jsx';

const App = () => {
  return (
    <div className='app-wrapper'>
      <HeaderContainer />
      <Navigation />
      <div className='app-wrapper-content'>
        <Route path='/profile/:userId' render={ () => <ProfileContainer/> }/>
        <Route path='/dialogs' render={ () => <DialogsContainer /> }/>
        <Route path='/users' render={() => <UsersContainer />} />
      </div>
    </div>
  );
}

export default App;
