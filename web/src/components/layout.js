import React from 'react';
import Header from './header';

import '../styles/layout.css';
import styles from './layout.module.css';

// const Layout = ({ children, onHideNav, onShowNav, showNav, siteTitle }) => (
const Layout = ({ children }) => (
  <div className={styles.pageContainer}>
    <header style={{ 'background-color': 'dodgerblue', height: '5em' }}>Dummy Header</header>
    <div className={styles.content}>{children}</div>
    <footer className={styles.footer}>
      <div className={styles.footerWrapper}>
        <div className={styles.footerElement}>
          <span className={styles.contactInfo}>
            <a target="_blank" href="https://goo.gl/maps/hwHKpixcufFHyZWGA">
              4159 Heatherton Place, Minnetonka, MN 55345
            </a>
          </span>
          <span className={styles.textDivider}>|</span>
          <span className={styles.contactInfo}>
            <a href="tel:612-747-0771">(612) 747-0771</a>
          </span>
          <span className={styles.textDivider}>|</span>
          <span className={styles.contactInfo}>
            <a href="mailto: info@whittenassociates.com">info@whittenassociates.com</a>
          </span>
        </div>
        <div className={styles.footerElement}>
          <div className={styles.button}>Contact Us</div>
        </div>
      </div>
    </footer>
  </div>
);

export default Layout;
