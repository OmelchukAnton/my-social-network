import { NavLink } from 'react-router-dom';
import s from './Header.module.css';

const Header = (props) => {
  return (
    <header className={s.header}>
        <img alt='avatar' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIRrM-JiGKm1J6OrqFwgDalUTMoyb-TVN-IQ&usqp=CAU'/>

        <div className={s.loginBlock}>
          { props.isAuth ? props.login : <NavLink to={'/login'}>Login</NavLink>

          }
        </div>
    </header>
  );
}

export default Header;
