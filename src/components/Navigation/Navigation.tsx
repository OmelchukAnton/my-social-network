import React from 'react';
import s from './Navigation.module.css';
import {NavLink} from "react-router-dom";

const Navigation: React.FC = () => {
    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <NavLink to="/profile" activeClassName={s.activeLink}>Profile</NavLink>
            </div>
            <div className={`${s.item} ${s.active}`}>
                <NavLink to="/dialogs" activeClassName={s.activeLink}>Messages</NavLink>
            </div>
            <div className={`${s.item} ${s.active}`}>
                <NavLink to="/users" activeClassName={s.activeLink}>Users</NavLink>
            </div>

            <div className={s.item}>
                <a href="#news">News</a>
            </div>
            <div className={s.item}>
                <a href="#music">Music</a>
            </div>
            <div className={s.item}>
                <a href="#settings">Settings</a>
            </div>
        </nav>
    )
}

export default Navigation;