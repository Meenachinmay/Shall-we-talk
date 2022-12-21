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
        <Flex alignItems={"center"}>
          <Image
            onClick={() => navigate("/")}
            cursor={"pointer"}
            src={Logo}
            alt="user logo"
            height="50px"
            bg={"white"}
          />
        </Flex>
        <p>自分のコワーキングスペースでご存知のない方にご遠慮なく話しかけるアプリをご紹介させていただいております。</p>
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
          copyright &copy;2022 SWT. designed by{" "}
          <span>Chinmay anand (RCI India)</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
