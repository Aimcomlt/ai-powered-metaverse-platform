import React from 'react';
import '../styles/Testimonials.css';

const Testimonials = () => {
  const testimonials = [
    { text: 'The Metaverse-platform has transformed how we collaborate and innovate.', user: 'User A' },
    // Add more testimonials as needed
  ];

  return (
    <section className="testimonials">
      <h2>Testimonials</h2>
      <div className="testimonials-carousel">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <p>"{testimonial.text}"</p>
            <span>- {testimonial.user}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
