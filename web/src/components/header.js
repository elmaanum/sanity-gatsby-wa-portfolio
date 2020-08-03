import { Link } from 'gatsby';
import React from 'react';
import styles from './header.module.css';

const Header = ({ headline }) => (
  <header className={styles.root}>
    <div style={{ 'background-color': 'white', height: '4em', 'border-bottom-style': 'solid' }}>
      <div>Dummy Logo</div>
      <nav>Dummy Nav</nav>
    </div>
    {headline && <div className={`${styles.headline} textH1`}>{headline}</div>}
  </header>
);

export default Header;
