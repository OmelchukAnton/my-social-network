import { Route } from 'react-router-dom';
import './App.css';
import Dialogs from './components/Dialogs/Dialogs';
import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import Profile from './components/Profile/Profile';

const App = (props) => {
  return (
    <div className='app-wrapper'>
      <Header />
      <Navigation />
      <div className='app-wrapper-content'>
        <Route path='/profile' render={ () => <Profile profilePage={props.state.profilePage} 
                                                        dispatch={props.dispatch} /> }/>
        <Route path='/dialogs' render={ () => <Dialogs store={props.store}/> }/>
      </div>
    </div>
  );
}

export default App;
