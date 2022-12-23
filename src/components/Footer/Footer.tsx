import * as React from "react";
import Logo from "../../images/logo.svg";
import { useNavigate } from "react-router-dom";
import "../footer.css";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Icon, Flex, Image } from "@chakra-ui/react";

const Footer: React.FC = () => {
  const navigate = useNavigate();
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <h3>Shall We Talk</h3>
        <p>We are an online platform which gives you a hesitation free environment to talk to strangers in your co-working space.");
        </p>
        <ul className="socials">
          <li>
            <a
              href="https://www.linkedin.com/company/78436150/admin/"
              target="_blank"
            >
              <Icon cursor={"pointer"} as={FaLinkedin} />
            </a>
          </li>
          <li>
            <a href="https://www.real-cnt.net/" target="_blank">
              <Icon cursor={"pointer"} as={MdEmail} />
            </a>
          </li>
        </ul>
      </div>
      <div className="footer-bottom">
        <p>
          copyright &copy;2022 SWT. 
        </p>
      </div>
    </footer>
  );
};

export default Footer;
