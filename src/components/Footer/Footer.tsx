import * as React from "react";
import Logo from "../../images/logo.svg";
import { useNavigate } from "react-router-dom";
import "../footer.css";
import { FaLinkedin } from "react-icons/fa";
import { Icon } from "@chakra-ui/react";
import { MdEmail } from "react-icons/md";

const Footer: React.FC = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <h3>Shall We Talk</h3>
        <p>
          We are an online platform which gives you a hesitation free
          environment to talk to strangers in your co-working space.
        </p>
        <ul className="socials">
          <li>
            <Icon as={FaLinkedin} />
          </li>
          <li>
            <Icon as={MdEmail} />
          </li>
        </ul>
      </div>
      <div className="footer-bottom">
        <p>copyright &copy;2022 SWT. designed by <span>Chinmay anand (RCI India)</span></p>
      </div>
    </footer>
  );
};

export default Footer;
