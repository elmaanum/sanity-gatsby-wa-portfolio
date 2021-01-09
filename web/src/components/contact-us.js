import React, { useState, useEffect } from 'react';
import styles from './contact-us.module.css';
import iconClose from '../assets/close-button-grey.svg';
import Modal from '../components/modal.js';
import { render } from 'react-dom';

const isEmail = (email) =>
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
};

// const ContactUs = (props) => {
//   const [invalidEmail, setInvalidEmail] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: '',
//     company: '',
//   });

class ContactUs extends React.Component {
  state = {
    invalidEmail: false,
    showModal: false,
    formData: {
      name: '',
      email: '',
      message: '',
      company: '',
    },
  };

  submitClicked = (event) => {
    // event.preventDefault();

    if (!isEmail(this.state.formData.email)) {
      console.log(`${this.state.formData.email} is not an email`);
      this.setState({ invalidEmail: true });
      return;
    }

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contact', ...this.state.formData }),
    })
      .then(() => alert('Success!'))
      .catch((error) => alert(error));
  };

  UNSAFE_componentWillUpdate = () => {
    console.log('will update');
  };

  handleChange = (e) => {
    // const freshFormData = {
    //   ...formData,
    //   [e.target.name]: e.target.value,
    // };

    // console.log(freshFormData);
    // this.setState({ name: event.target.value });
    e.persist();
    console.log(e.target.name, e.target.value);

    this.setState((prevState) => ({
      ...prevState,
      formData: { [e.target.name]: e.target.value },
    }));

    // let freshFormData = { ...this.state.formData, [e.target.name]: e.target.value };
    // setFormData(freshFormData);

    // console.log(`fresh: ${JSON.stringify(freshFormData)}`);
    // this.setState({ formData: freshFormData });

    if (isEmail(this.state.formData.email)) {
      this.setState({ invalidEmail: false });
    }
  };

  onClickContactUsButton = () => this.setState({ showModal: true });
  onClickClose = () => setShowModal(false);

  render() {
    const { name, email, message, company } = this.state.formData;
    return (
      <div>
        <div onClick={this.onClickContactUsButton}>{this.props.children}</div>
        {this.state.showModal && (
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
                  We’ve provided planning services to over 43 companies over the last 9 years and
                  are excited to see what we can do for you!
                </div>
                <div className={`${styles.leftText} textBody`}>
                  Please fill out the form to the right and we’ll get back to you, or you can
                  contact us via email or phone below.
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
                  <form className={styles.formItems} onSubmit={this.submitClicked}>
                    <div className={styles.formSet}>
                      <label className="textBody">Name</label>
                      {console.log(name)}
                      <input
                        value={name}
                        onChange={this.handleChange}
                        className={styles.inputShort}
                        type="text"
                        name="name"
                      />
                    </div>
                    <div className={styles.formSet}>
                      <label className="textBody">Email*</label>
                      {/* {console.log(invalidEmail ? '2px solid red' : '')} */}
                      <input
                        value={email}
                        className={styles.inputShort}
                        style={{ border: this.state.invalidEmail ? '2px solid red' : '' }}
                        // style={{ border: '2px solid red' }}
                        type="text"
                        name="email"
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className={styles.formSet}>
                      <label className="textBody">Company</label>
                      <input
                        value={company}
                        className={styles.inputShort}
                        type="text"
                        name="company"
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className={styles.formSet}>
                      <label className="textBody">Message</label>
                      <textarea
                        value={message}
                        className={styles.inputTall}
                        type="text"
                        name="message"
                        onChange={this.handleChange}
                      />
                    </div>
                    <button type="submit" className={`${styles.submitButtom} button accent`}>
                      Start the Conversation
                    </button>
                  </form>
                </div>
              </div>
              <img
                onClick={this.onClickClose}
                className={styles.iconClose}
                src={iconClose}
                alt={'close'}
              />
            </div>
          </Modal>
        )}
      </div>
    );
  }
}

export default ContactUs;
