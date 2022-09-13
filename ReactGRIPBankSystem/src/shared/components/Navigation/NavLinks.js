import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';

const NavLinks = props =>{
    return (
        <ul className='nav-links'>
            <li>
                <NavLink to ="/" exact>Home</NavLink>
            </li>
            <li>
                <NavLink to ="/customers">Customers</NavLink>
            </li>
            <li>
                <NavLink to ="/transactions">Transactions</NavLink>
            </li>
        </ul>
    );
};

export default NavLinks;