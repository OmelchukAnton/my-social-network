import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Dialogs from './components/Dialogs/Dialogs';
import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import Profile from './components/Profile/Profile';

const App = (props) => {
  return (
    <BrowserRouter>
    <div className='app-wrapper'>
      <Header />
      <Navigation />
      <div className='app-wrapper-content'>
        <Route path='/profile' render={ () => <Profile state={props.state.profilePage}/> }/>
        <Route path='/dialogs' render={ () => <Dialogs state={props.state.messagesPage}/> }/>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
