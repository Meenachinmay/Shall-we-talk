import * as React from "react";
import "../footer.css";
import { FaLinkedin } from "react-icons/fa";
import { Icon } from "@chakra-ui/react";

const Footer: React.FC = () => {

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <h3>Shall We Talk</h3>
        <a href="https://www.real-cnt.net/" target="_blank" rel="noreferrer" style={{ textDecoration: "underline"}}>
          Shall We Talk はリアルコネクト株式会社によって運営されています
        </a>
        <ul className="socials">
          <li>
            <a
              href="https://www.linkedin.com/company/78436150/admin/"
              target="_blank" rel="noreferrer"
            >
              <Icon cursor={"pointer"} as={FaLinkedin} />
            </a>
          </li>
          {/* <li>
            <a href="https://www.real-cnt.net/" target="_blank">
              <Icon cursor={"pointer"} as={MdEmail} />
            </a>
          </li> */}
        </ul>
      </div>
      <div className="footer-bottom">
        <p>copyright &copy;2023 SWT.</p>
      </div>
    </footer>
  );
};

export default Footer;
