
import { useState, useEffect, useRef } from "react"
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import { Container, Row, Col } from 'react-bootstrap'
import { ContactFormInput } from '../ContactFormInput'
import {
  name_validation,
  email_validation,
  msg_validation
} from '../../utils/inputValidations'
import { FormProvider, useForm } from 'react-hook-form'

export const ContactForm = ({ formInputs, btnLabel }) => {
  const form = useRef();
  const methods = useForm()

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const { name, email, message } = e.target.elements;
  //   let details = {
  //     name: name.value,
  //     email: email.value,
  //     message: message.value,
  //   };
  //   let response = await fetch("/contact", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json;charset=utf-8",
  //     },
  //     body: JSON.stringify(details),
  //   });
  //   let result = await response.json();
  //   alert(result.status);
  // };


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { name, email, message } = e.target.elements;
//     let details = {
//       name: name.value,
//       email: email.value,
//       message: message.value,
//     };
//     let response = await fetch('/contact', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(details),
//   })
//     .then(response => response.json())
//     .then(data => console.log('Success:', data))
//     .catch(error => console.error('Error:', error));
// }
 
  
  const onSubmit = methods.handleSubmit(data => {
    let serviceID = "service_adwgep2"
    let templateID = "template_j9jc5hc"
    let publicKey = "kUTSNfIe7Ye4FJvjn"
    // const { name, email, message } = e.target.elements;
    // let details = {
    //   name: name.value,
    //   email: email.value,
    //   message: message.value,
    // };
    emailjs.sendForm(serviceID, templateID, form.current, {
      publicKey: publicKey
    })
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Message Sent Successfully'
        })
      }, (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops, something went wrong',
          text: error.text,
        })
      });
      // try {
      //   const response = await fetch('/contact', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify(form.current),
      //   });
    
      //   if (response.ok) {
      //     alert('Message sent successfully!');
      //   } else {
      //     alert('There was an error sending your message.');
      //   }
      // } catch (error) {
      //   alert('An unexpected error occurred.');
      //   console.error(error);
      // }

    methods.reset()
  })

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={e => e.preventDefault()}
        ref={form}
        noValidate
        autoComplete="off"
        className="contact-form"
      >
        <ContactFormInput {...name_validation} />
        <ContactFormInput {...email_validation} />
        <ContactFormInput {...msg_validation} />
        <div className="mt-5">
          <button
            onClick={onSubmit}
            className="btn"
          >
            Submit
          </button>
        </div>
      </form>
    </FormProvider>


  // <form ref={form} className="contact-form" onSubmit={handleSubmit}>
  //   {formInputs.map((input) => 
  //     <ContactFormInput {...input}/>)}


  //   <div className="text-center mb-2">
  //     <button 
  //       type="submit"
  //       className="btn">
  //         {btnLabel}
  //     </button>
  //   </div>

  // </form>
  );
}