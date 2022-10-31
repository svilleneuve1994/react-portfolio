import React, { useState, useEffect } from "react";
import vintage from "../assets/images/vintage-comic.png"
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState("Submit");

  const control = useAnimation()
	const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '100px 0px'
  })

  const sectionVariant = {
    hidden: { opacity: 0, scale: 0 },
    show: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        duration: .5
      } 
    }
  };

  useEffect(() => {
    if (inView) {
      console.log("Contact in view")
      control.start("show");
    } 
  }, [control, inView]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    const URL = "https://tempest-portfolio.herokuapp.com/contact"
    let response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(formState),
    });
    setStatus("Submit");
    resetForm();
    let result = await response.json();
    alert(result.status);
  };

  const resetForm = () => {
    setFormState({ name: '', email: '', message: '',})
  }

  return (
    <section 
      id="contact" 
      className="py-3">
      <motion.div 
        ref={ref}
        className="card p-4"
        variants={sectionVariant}
        initial="hidden"
        animate={control}>
        <img src={vintage} alt="Vintage comic-style woman on phone" className="card__image" />
        <div className="card-title">
          <span>CONTACT ME</span>
        </div>
        <form className="contact-form" onSubmit={handleSubmit} method="POST">
          <div className="input-container">
            <input 
              type="text" 
              aria-describedby="name"
              id="name" 
              name="name" 
              value={formState.name} 
              onChange={handleChange} 
              required="required"
            />
            <label htmlFor="name">Name</label>
            <div className="bar"></div>
          </div>
          <div className="input-container">
            <input 
              type="email" 
              aria-describedby="email"
              id="email" 
              name="email" 
              value={formState.email} 
              onChange={handleChange} 
              required="required"
            />
            <label htmlFor="email">Email</label>
            <div className="bar"></div>
          </div>
          <div className="input-container">
            <input 
              type="text"  
              aria-describedby="message"
              id="message" 
              name="message" 
              value={formState.message} 
              onChange={handleChange} 
              rows="4"
              required="required"
            />
            <label htmlFor="message">Message</label>
            <div className="bar"></div>
          </div>
          <div className="app-form-group buttons">
            <button 
              type="submit"
              className="btn">{status}</button>
          </div>
        </form>
      </motion.div>
    </section>
  );
};

export default Contact;