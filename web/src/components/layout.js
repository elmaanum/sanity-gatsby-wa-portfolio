import React from 'react';
import Header from './header';
import Footer from './footer';

import '../styles/layout.css';
import styles from './layout.module.css';

const Layout = ({ children, headline, services }) => {
  return (
    <div className={styles.pageContainer}>
      <Header headline={headline} services={services} />
      <div className={styles.content}>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
