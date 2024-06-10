// src/ContactForm.tsx
import React, { useState } from 'react';
import './ContactForm.css'; // Create a CSS file for styling

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
  };

  return (
    <div className="contact-form">
      <h2>Entre em contato</h2>
      <p><span role="img" aria-label="phone">📞</span> (11) 9927... <a href="#ver-numero">ver número</a></p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Seu nome"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Seu e-mail"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Seu telefone (opcional)"
          value={formData.phone}
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="Escreva sua mensagem aqui"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <button type="submit">Enviar mensagem</button>
      </form>
      <p className="note">Ao clicar em enviar mensagem, seus dados serão compartilhados pela OLX com o anunciante. <a href="#saiba-mais">Saiba mais.</a></p>
    </div>
  );
};

export default ContactForm;
