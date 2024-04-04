
import React from 'react';
import styles from './contact.module.scss';
import FAQ from '../../Components/faq/faq';
import ContactForm from '../../Components/contactform/contactform';

const Contact = () => {
    return(
<div className={styles.contact}>
         <div className={styles.form}> 
         <h3>Contact Form</h3>
            <ContactForm/>
         </div>
      <div className={styles.faq}>
        <h3>FAQ</h3>
        <FAQ/>
      </div>
    <div className={styles.Data}>
      <div className={styles.ContactData}>
        <h3>Phone number</h3>
        <p>+48 123 456 789</p>
        <h3>Address e-mail</h3>
        <p>Esattocall@esatto.help.com</p>
        <h3>Adres</h3>
        <p>Krakow xxxxxxxxxx, 20-202</p>
      </div>
        <div className={styles.map}>
      <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1280.4953863124979!2d19.905920161571938!3d50.06773445324485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47165bbb6b03b2ef%3A0xd8090ae9836d8c63!2sKlub%20STUDIO!5e0!3m2!1spl!2spl!4v1711914346965!5m2!1spl!2spl"
          width="100%"
          height="100%"
          loading="lazy"
        ></iframe>
        </div>
    </div>
  </div>
  );
};

export default Contact;
