import React from 'react';
import styles from './footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerWrapper}>
        <div className={styles.footerElement}>
          {/* TODO: Grab org info from GraphQL API when implemented */}
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
        {/* TODO: Link to "Contact Us" modal when complete */}
        <div className={styles.footerElement}>
          <div className="button primary">Contact Us</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
