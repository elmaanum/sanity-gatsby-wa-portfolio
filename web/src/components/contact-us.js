import React from 'react';
import { buildImageObj } from '../lib/helpers';
import { imageUrlFor } from '../lib/image-url';
import styles from './contact-us.module.css';
import BlockContent from '../components/block-content';
import iconClose from '../assets/close-button-grey.svg';

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
};

let mainText = `
We’ve provided planning services to over 43 companies over the last 9 years and are excited to see what we can do for you!

Please fill out the form to the right and we’ll get back to you, or you can contact us via email or phone below.

(612) 747-0771

info@whittenassociates.com
`;

class ContactUs extends React.Component {
  state = {
    formData: {
      name: '',
      email: '',
      message: '',
      company: '',
    },
  };

  submitClicked = (event) => {
    event.preventDefault();

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contact', ...this.state.formData }),
    })
      .then(() => alert('Success!'))
      .catch((error) => alert(error));
  };

  onInputChange = (event) => {
    event.persist();
    const oldState = this.state;
    this.setState((oldState) => ({
      formData: {
        ...oldState.formData,
        [event.target.name]: event.target.value,
      },
    }));
    console.log(this.state);
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    console.log('Conventional form submit detected!');
  };

  render() {
    return (
      <div className={styles.mainContainer}>
        <div className={styles.leftFrame}>
          <div className={`${styles.leftText} textH2`}>Let's Talk!</div>
          <div className={`${styles.leftText} textBody`}>{mainText}</div>
        </div>
        <div className={styles.rightFrame}>
          <div className={styles.formContainer}>
            <form className={styles.formItems} onSubmit={this.onFormSubmit}>
              <div className={styles.formSet}>
                <label className="textBody">Name</label>
                <input
                  className={styles.inputShort}
                  type="text"
                  name="name"
                  value={this.state.formData.name}
                  onChange={this.onInputChange}
                />
              </div>
              <div className={styles.formSet}>
                <label className="textBody">Email*</label>
                <input
                  className={styles.inputShort}
                  type="email"
                  name="email"
                  value={this.state.formData.email}
                  onChange={this.onInputChange}
                />
              </div>
              <div className={styles.formSet}>
                <label className="textBody">Company</label>
                <input
                  className={styles.inputShort}
                  type="text"
                  name="company"
                  value={this.state.formData.company}
                  onChange={this.onInputChange}
                />
              </div>
              <div className={styles.formSet}>
                <label className="textBody">Message</label>
                <textarea
                  className={styles.inputTall}
                  type="text"
                  name="message"
                  value={this.state.term}
                  onChange={this.onInputChange}
                />
              </div>
            </form>
            <button onClick={this.submitClicked} className={`${styles.submitButtom} button accent`}>
              Start the Conversation
            </button>
          </div>
        </div>
        <img
          // onClick={this._onButtonClicked}
          className={styles.iconClose}
          src={iconClose}
          alt={'close'}
        />
      </div>
    );
  }
}

export default ContactUs;
