import React, { useState } from 'react';
import * as styles from './contact-us.module.css';
import Swal from 'sweetalert2';

const isEmail = (email) =>
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
};

const ContactUsForm = ({ closeModal }) => {
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isEmail(formData.email)) {
      setInvalidEmail(true);
      return;
    }

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contact', formData }),
    })
      .then(() => {
        Swal.fire({
          title: 'Thank you!',
          text: "We'll be in touch soon!",
          icon: 'success',
          customClass: { popup: styles.swaltest },
          confirmButtonColor: '#31c17c',
        }).then(() => {
          setFormData({ name: '', email: '', company: '', message: '' });
          closeModal();
        });
      })
      .catch((error) => alert(error));
  };

  const handleChange = (event) => {
    event.persist();
    setFormData({ ...formData, [event.target.name]: event.target.value });
    if (isEmail(formData.email)) {
      setInvalidEmail(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formItems}>
      <label className={`${styles.formSet} textBody`}>
        Name
        <input
          value={formData.name}
          className={styles.inputShort}
          type="text"
          name="name"
          onChange={handleChange}
        />
      </label>
      <label className={`${styles.formSet} textBody`}>
        Email*
        <input
          value={formData.email}
          className={styles.inputShort}
          style={{ border: invalidEmail ? '2px solid red' : '' }}
          type="text"
          name="email"
          onChange={handleChange}
        />
      </label>
      <label className={`${styles.formSet} textBody`}>
        Company
        <input
          value={formData.company}
          className={styles.inputShort}
          type="text"
          name="company"
          onChange={handleChange}
        />
      </label>
      <label className={`${styles.formSet} textBody`}>
        Message
        <textarea
          value={formData.message}
          className={styles.inputTall}
          type="text"
          name="message"
          onChange={handleChange}
        />
      </label>
      <button type="submit" className={`${styles.submitButtom} button accent`}>
        Start the Conversation
      </button>
    </form>
  );
};

export default ContactUsForm;
