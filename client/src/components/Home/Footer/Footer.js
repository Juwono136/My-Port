import React from "react";
import {
    FooterContainer,
    FooterCopy,
    FooterLink,
    FooterList,
    FooterMain,
    FooterSocial,
    FooterSocialLink,
    FooterTitle,
} from "./FooterElements";

const Footer = () => {
    return (
        <FooterMain>
            <FooterContainer>
                <FooterTitle>Juwono</FooterTitle>

                <FooterList>
                    <li>
                        <FooterLink to="about">About</FooterLink>
                    </li>

                    <li>
                        <FooterLink to="skills">Skills</FooterLink>
                    </li>

                    <li>
                        <FooterLink to="works">Projects</FooterLink>
                    </li>
                </FooterList>

                <FooterSocial>
                    <FooterSocialLink
                        href="https://www.linkedin.com/in/juwono136"
                        target={"_blank"}
                    >
                        <i className="bx bxl-linkedin-square"></i>
                    </FooterSocialLink>

                    <FooterSocialLink
                        href="https://github.com/Juwono136"
                        target={"_blank"}
                    >
                        <i className="bx bxl-github"></i>
                    </FooterSocialLink>

                    <FooterSocialLink
                        href="https://codepen.io/juwono136"
                        target={"_blank"}
                    >
                        <i className="bx bxl-codepen"></i>
                    </FooterSocialLink>
                </FooterSocial>

                <FooterCopy>
                    Copyright &#169; {new Date().getFullYear()} My_Port v1.0
                </FooterCopy>
            </FooterContainer>
        </FooterMain>
    );
};

export default Footer;
