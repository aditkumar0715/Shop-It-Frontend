import React from "react";
import { Link } from "react-router";
import { Mail, Linkedin, Github, MessageCircle } from "lucide-react";

function Footer() {
  return (
    <div className="footer bg-background border-secondary text-foreground flex flex-wrap justify-center gap-4 border-t-2 px-4 py-4 md:flex-row md:justify-between">
      <div className="flex flex-wrap justify-center space-x-2 text-sm md:text-base">
        <Link to="/" className="text-primary font-bold">
          Shop-It
        </Link>
        <p>&copy; 2025 Shop-It. All rights reserved.</p>
      </div>
      <div className="flex space-x-2 text-sm md:text-base">
        <p className="cursor-pointer hover:underline">Privacy Policy</p>
        <p className="cursor-pointer hover:underline">Terms and Conditions</p>
      </div>
      <div className="flex space-x-4">
        <a
          href="mailto:aditkumar0715@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary"
        >
          <Mail className="h-5 w-5" />
        </a>
        <a
          href="https://wa.me/+919817889068"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary"
        >
          <MessageCircle className="h-5 w-5" />
        </a>
        <a
          href="https://www.linkedin.com/in/aditkumar0715"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary"
        >
          <Linkedin className="h-5 w-5" />
        </a>
        <a
          href="https://github.com/aditkumar0715"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary"
        >
          <Github className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}

export default Footer;
