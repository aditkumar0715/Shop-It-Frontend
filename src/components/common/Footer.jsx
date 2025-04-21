import React from "react";
import { Link } from "react-router";
import { Mail, Linkedin, Github, MessageCircle } from "lucide-react";

function Footer(){
  return (
    <div className="footer bg-background border-t-2 border-secondary text-foreground py-4 flex md:flex-row md:justify-between justify-center flex-wrap gap-4 px-4">
      <div className="text-sm md:text-base flex space-x-2 flex-wrap justify-center">
        <Link to="/" className="font-bold text-primary">
          Shop-It
        </Link>
        <p>&copy; 2025 Shop-It. All rights reserved.</p>
      </div>
      <div className="text-sm md:text-base flex space-x-2 ">
        <p className="hover:underline cursor-pointer">Privacy Policy</p>
        <p className="hover:underline cursor-pointer">Terms and Conditions</p>
      </div>
      <div className="flex space-x-4">
        <a
          href="mailto:aditkumar0715@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary"
        >
          <Mail className="w-5 h-5" />
        </a>
        <a
          href="https://wa.me/+919817889068"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary"
        >
          <MessageCircle className="w-5 h-5" />
        </a>
        <a
          href="https://www.linkedin.com/in/aditkumar0715"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary"
        >
          <Linkedin className="w-5 h-5" />
        </a>
        <a
          href="https://github.com/aditkumar0715"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary"
        >
          <Github className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
};

export default Footer;