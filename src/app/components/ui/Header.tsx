'use client';
import React from 'react';
import './Header.scss'
import { Bell, User } from 'lucide-react';
import Sidebar from './Sidebar';
import SearchBox from '../common/SearchBox';

const Header = () => {
    return (
        <header className="header">
            <div className="header-headline">
                <h1 className="headline-text">AnimeNews</h1>
                <ul className="header-nav">
                    <li className="header-navlist">
                        <SearchBox />
                    </li>
                    <li className="header-navlist">
                        <Bell />
                    </li>
                    <li className="header-navlist">
                        <User />
                    </li>
                </ul>
            </div>
            <section>
                <div className="sidevar">
                    <nav className="nav-container">
                        <Sidebar />
                    </nav>
                </div>
            </section>
        </header>
    );
};

export default Header;