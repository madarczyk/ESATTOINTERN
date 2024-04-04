'use client'
import React, { useState } from 'react';
import styles from './contactform.module.scss';
import { useForm } from 'react-hook-form';



const ContactForm = () => {
  const {register, handleSubmit, formState: { errors }} = useForm({});
  const onSubmit = data => console.log(data);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  return (
    <div className={styles.formmaindiv}>
       {isFormSubmitted && <p className={styles.aprove}>Form has been successfully sent!</p>}
	<form id="ContactCreator" className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.phone}>
          <label htmlFor="phonenumber">Phone Number:</label>
          <input 
            required
            type="tel"
            id="phonenumberID"
             {...register("PhoneNumber", 
             {  
              required: "Phone number is required",
              pattern: {
              value: /^[0-9]{9}$/,
              message: "invalid phone number pattern"}
             })}
          />
        </div>
        <div className={styles.email}>
          <label htmlFor="email">E-mail:</label>
          <input required
             type="email"
             id="email"
             {...register("Email")}
          />
        </div>
        <div className={styles.topic}>
          <label htmlFor="topic">Topic:</label>
          <input required
            type="text"
            id="topic"
            {...register("Topic")}
          />
        </div>
        <div className={styles.details}>
         <label htmlFor="details">Insert your details:</label>
          <textarea required id="details"{...register("Details")}/>
        </div>
        <div className={styles.sendbutton}>
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
};
export default ContactForm;