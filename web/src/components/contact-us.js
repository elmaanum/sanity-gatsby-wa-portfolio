import React, { useState } from 'react';
import styles from './contact-us.module.css';
import iconClose from '../assets/close-button-grey.svg';
import Modal from '../components/modal.js';

const isEmail = (email) =>
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
};

const ContactUs = (props) => {
  const [invalidEmail, setInvalidEmail] = useState({});
  const [showModal, setShowModal] = useState({});
  const [formData, setFormData] = useState({});

  const submitClicked = (event) => {
    event.preventDefault();
    if (!isEmail(formData.email)) {
      console.log(`${formData.email} is not an email`);
      setInvalidEmail(true);
      return;
    }

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contact', formData }),
    })
      .then(() => alert('Success!'))
      .catch((error) => alert(error));
  };

  const handleChange = (event) => {
    const updateObj = {
      ...formData,
      [event.target.name]: event.target.value,
    };
    console.log(updateObj);
    // console.log({
    //   ...formData,
    //   [event.target.name]: event.target.value,
    // });
    setFormData(updateObj);

    if (isEmail(formData.email)) {
      setInvalidEmail(false);
    }
  };

  const onClickContactUsButton = () => setShowModal(true);
  const onClickClose = () => setShowModal(false);

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
                <form className={styles.formItems} onSubmit={submitClicked}>
                  <label className={`${styles.formSet} textBody`}>
                    Name
                    <input
                      value={formData.name}
                      onChange={handleChange}
                      className={styles.inputShort}
                      type="text"
                      name="formName"
                    />
                  </label>
                  <label className={`${styles.formSet} textBody`}>
                    Email*
                    <input
                      value={formData.email}
                      className={styles.inputShort}
                      style={{ border: invalidEmail ? '2px solid red' : '' }}
                      type="text"
                      name="formEmail"
                      onChange={handleChange}
                    />
                  </label>
                  <label className={`${styles.formSet} textBody`}>
                    Company
                    <input
                      value={formData.company}
                      className={styles.inputShort}
                      type="text"
                      name="formCompany"
                      onChange={handleChange}
                    />
                  </label>
                  <label className={`${styles.formSet} textBody`}>
                    Message
                    <textarea
                      value={formData.message}
                      className={styles.inputTall}
                      type="text"
                      name="formMessage"
                      onChange={handleChange}
                    />
                  </label>
                  <button type="submit" className={`${styles.submitButtom} button accent`}>
                    Start the Conversation
                  </button>
                </form>
              </div>
            </div>
            <img
              onClick={onClickClose}
              className={styles.iconClose}
              src={iconClose}
              alt={'close'}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ContactUs;
