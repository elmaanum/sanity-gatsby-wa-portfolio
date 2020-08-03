import { Link, graphql } from 'gatsby';
import React from 'react';
import styles from './header.module.css';

// Weird issue with clashing styles if you call "styles.xxx" from activeStyle on Link
// So I'm creating the style directly in the code
// TODO: Put activeLinkStyle in header.module.css

// const rootElement = window.document.querySelector(':root');
// const accentColor = getComputedStyle(rootElement).getPropertyValue('--color-accent');
// const activeLinkStyle = {
//   color: accentColor,
// };

const createLinkItem = (title, link, key) => (
  <Link activeStyle={{ color: '#31c17c' }} to={link} key={key}>
    <li className={styles.navItem}>{title}</li>
  </Link>
);

const Header = ({ headline, services }) => (
  <header className={styles.root}>
    <nav className={styles.topBar}>
      <Link to={`/`}>
        <div className={styles.logo}>Whitten Associates</div>
      </Link>
      <ul className={`${styles.navContainer} ${styles.navContainerServices}`}>
        {services.map((service) =>
          createLinkItem(service.title, `/service/${service.slug.current}`, service.slug.current),
        )}
      </ul>
      <div className={styles.navSpacer}></div>
      <ul className={styles.navContainer}>
        {createLinkItem('Portfolio', `/portfolio`, 'portfolio')}
        {createLinkItem('About Us', `/about-us`, 'about-us')}
      </ul>
    </nav>
    {headline && <div className={`${styles.headline} textH1`}>{headline}</div>}
  </header>
);

export default Header;
