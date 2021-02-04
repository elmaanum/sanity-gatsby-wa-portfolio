import React, { useState } from 'react';
import styles from './contact-us.module.css';
import iconClose from '../assets/close-button-grey.svg';
import Modal from '../components/modal.js';
import ContactUsForm from './contact-us-form.js';

const ContactUs = (props) => {
  const [showModal, setShowModal] = useState(false);

  const onClickContactUsButton = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div>
      <div onClick={onClickContactUsButton}>{props.children}</div>
      {showModal && (
        <Modal
          style={{
            width: '80%',
            height: '75%',
            maxWidth: '840px',
            maxHeight: '500px',
            top: '10%',
          }}
        >
          <div className={styles.mainContainer}>
            <div className={styles.leftFrame}>
              <div className={`${styles.leftText} textH2`}>Let's Talk!</div>
              <div className={`${styles.leftText} textBody`}>
                We’ve provided planning services to over 43 companies over the last 9 years and are
                excited to see what we can do for you!
              </div>
              <div className={`${styles.leftText} textBody`}>
                Please fill out the form to the right and we’ll get back to you, or you can contact
                us via email or phone below.
              </div>
              <div className={`${styles.leftText} textBody`}>
                <a className={styles.underline} href="tel:(612) 747-0771">
                  (612) 747-0771
                </a>
              </div>
              <div className={`${styles.leftText} textBody`}>
                <a className={styles.underline} href="mailto:info@whittenassociates.com">
                  info@whittenassociates.com
                </a>
              </div>
            </div>
            <div className={styles.rightFrame}>
              <div className={styles.formContainer}>
                <ContactUsForm closeModal={closeModal} />
              </div>
            </div>
            <img onClick={closeModal} className={styles.iconClose} src={iconClose} alt={'close'} />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ContactUs;
