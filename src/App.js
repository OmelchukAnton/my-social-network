import { Route } from 'react-router-dom';
import './App.css';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import Profile from './components/Profile/Profile';

const App = (props) => {
  return (
    <div className='app-wrapper'>
      <Header />
      <Navigation />
      <div className='app-wrapper-content'>
        <Route path='/profile' render={ () => <Profile /> }/>
        <Route path='/dialogs' render={ () => <DialogsContainer /> }/>
      </div>
    </div>
  );
}

export default App;
