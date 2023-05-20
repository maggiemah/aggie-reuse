import React from 'react';
import logo from '../../assets/ar-logo.png';

import './Header.css';

const Header = () => {
	return (
		<header>
			<div className='header-container'>
				<img src={logo} id='logo' alt='logo' />
				<h1>Aggie Reuse Store - Inventory</h1>
				<h2>ASUCD</h2>
			</div>
		</header>
	)
}

export default Header;