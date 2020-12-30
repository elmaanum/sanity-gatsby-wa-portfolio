import React, { useState } from 'react';
import styles from './contact-us.module.css';
import iconClose from '../assets/close-button-grey.svg';
import Modal from '../components/modal.js';

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
};

const ContactUs = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    company: '',
  });

  const submitClicked = (event) => {
    event.preventDefault();

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contact', ...formData }),
    })
      .then(() => alert('Success!'))
      .catch((error) => alert(error));
  };

  const onInputChange = (event) => {
    event.persist();
    console.log('old', formData);
    const updatedFormData = {
      ...formData,
      [event.target.name]: event.target.value,
    };
    console.log('update to', updatedFormData);
    setFormData(updatedFormData);
    console.log('updated', formData);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    console.log('Conventional form submit detected!');
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
            {console.log('render', formData)}
            <div className={styles.rightFrame}>
              <div className={styles.formContainer}>
                <form className={styles.formItems} onSubmit={onFormSubmit}>
                  <div className={styles.formSet}>
                    <label className="textBody">Name</label>
                    <input
                      onChange={onInputChange}
                      className={styles.inputShort}
                      type="text"
                      name="name"
                    />
                  </div>
                  <div className={styles.formSet}>
                    <label className="textBody">Email*</label>
                    <input
                      className={styles.inputShort}
                      type="email"
                      name="email"
                      onChange={onInputChange}
                    />
                  </div>
                  <div className={styles.formSet}>
                    <label className="textBody">Company</label>
                    <input
                      className={styles.inputShort}
                      type="text"
                      name="company"
                      onChange={onInputChange}
                    />
                  </div>
                  <div className={styles.formSet}>
                    <label className="textBody">Message</label>
                    <textarea
                      className={styles.inputTall}
                      type="text"
                      name="message"
                      onChange={onInputChange}
                    />
                  </div>
                </form>
                <button onClick={submitClicked} className={`${styles.submitButtom} button accent`}>
                  Start the Conversation
                </button>
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
