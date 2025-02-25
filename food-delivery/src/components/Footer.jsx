import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
        <div className="footerr">
            <div className="footer-logo">
                <Link to="/">Food Delivery</Link>
            </div>
      
            <div className="footer-social">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            </div>

        </div>
      
        <div className="footer-contact">
            <p>Email: support@fooddelivery.com</p>
            <p>Phone: +220 3113609</p>
        </div>
      
      <div className="footer-tagline">
        <p>&copy; 2025 Food Delivery. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
