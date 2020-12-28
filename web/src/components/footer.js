import React from 'react';
import styles from './footer.module.css';
import { StaticQuery, graphql } from 'gatsby';
import ContactUs from './contact-us.js';
import Modal from '../components/modal.js';

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
            <div className="button primary">Contact Us</div>
          </div>
        </div>
        {true && (
          <Modal
            style={{
              width: '80%',
              height: '75%',
              maxWidth: '840px',
              maxHeight: '500px',
              top: '10%',
            }}
          >
            <ContactUs />
          </Modal>
        )}
      </footer>
    )}
  />
);

export default Footer;
