import { Link, graphql } from 'gatsby';
import React from 'react';
import styles from './header.module.css';

const Header = ({ headline, services }) => {
  console.log(services);
  return (
    <header className={styles.root}>
      <nav className={styles.topBar}>
        <div className={styles.logo}>Whitten Associates</div>
        <ul className={`${styles.navContainer} ${styles.navContainerServices}`}>
          {services.map((service) => (
            <li className={styles.navItem}>{service.title}</li>
          ))}
        </ul>
        <div className={styles.navSpacer}></div>
        <ul className={styles.navContainer}>
          <li className={styles.navItem}>Portfolio</li>
          <li className={styles.navItem}>About Us</li>
        </ul>
      </nav>
      {headline && <div className={`${styles.headline} textH1`}>{headline}</div>}
    </header>
  );
};
export default Header;
