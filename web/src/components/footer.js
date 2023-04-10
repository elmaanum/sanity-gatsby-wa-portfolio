import React from 'react';
import * as styles from './footer.module.css';
import { StaticQuery, graphql } from 'gatsby';
import ContactUs from './contact-us.js';

const Footer = () => (
  <StaticQuery
    query={graphql`
      query FooterQuery {
        site: sanitySiteSettings {
          phonenumber
          email
          address
        }
      }
    `}
    render={({ site: { address, phonenumber, email } }) => (
      <footer className={styles.footer}>
        <div className={styles.footerWrapper}>
          <div className={styles.footerElement}>
            <span className={styles.contactInfo}>
              <a
                target="_blank"
                href={`https://www.google.com/maps/search/?api=1&query=${address}`}
              >
                {address}
              </a>
            </span>
            <span className={styles.textDivider}>|</span>
            <span className={styles.contactInfo}>
              <a href={`tel:${phonenumber}`}>{phonenumber}</a>
            </span>
            <span className={styles.textDivider}>|</span>
            <span className={styles.contactInfo}>
              <a href={`mailto:${email}`}>{email}</a>
            </span>
          </div>
          {/* TODO: Link to "Contact Us" modal when complete */}
          <div className={styles.footerElement}>
            <ContactUs>
              <div className={`${styles.contactUsButton} button primary`}>Contact Us</div>
            </ContactUs>
          </div>
        </div>
      </footer>
    )}
  />
);

export default Footer;
