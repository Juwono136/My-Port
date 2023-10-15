import React from "react";
import { Button } from "../../ButtonElements";
import {
    ButtonCV,
    HeroButtons,
    HeroContainer,
    HeroData,
    HeroEducation,
    HeroGreeting,
    HeroHandle,
    HeroImg,
    HeroName,
    HeroScroll,
    HeroScrollName,
    HeroSectionMain,
    HeroSocial,
    HeroSocialLink,
} from "./HeroSectionElements";
import HeroImage from "../../../assets/images/heroImg.png";
import myCV from "../../../assets/cv/cv_juwono.pdf";
import { useSelector } from "react-redux";

const HeroSection = ({ darkMode }) => {
    const { user } = useSelector((state) => state.user)

    const openPdfInNewTab = () => {
        window.open(myCV, '_blank')
    }

    return (
        <HeroSectionMain id="home">
            <HeroContainer>
                <HeroData>
                    <HeroGreeting light={darkMode ? 1 : 0}>Hello, I'm</HeroGreeting>
                    <HeroName light={darkMode ? 1 : 0}>{user.name}</HeroName>
                    <HeroEducation light={darkMode ? 1 : 0}>
                        {user.stack}
                    </HeroEducation>
                    {/* <HeroEducation light={darkMode ? 1 : 0}>
                        And I Like Onigiri 🍙😋
                    </HeroEducation> */}

                    <HeroButtons>
                        <ButtonCV className="hero_ghost" onClick={openPdfInNewTab}>
                            Download CV
                        </ButtonCV>
                        <Button to="about">About Me</Button>
                    </HeroButtons>
                </HeroData>

                <HeroHandle>
                    <HeroImg src={HeroImage} alt="hero_image" />
                </HeroHandle>

                <HeroSocial>
                    <HeroSocialLink
                        href="https://www.linkedin.com/in/juwono136"
                        target={"_blank"}
                    >
                        <i className="bx bxl-linkedin-square"></i>
                    </HeroSocialLink>

                    <HeroSocialLink href="https://github.com/Juwono136" target={"_blank"}>
                        <i className="bx bxl-github"></i>
                    </HeroSocialLink>

                    <HeroSocialLink href="https://codepen.io/juwono136" target={"_blank"}>
                        <i className="bx bxl-codepen"></i>
                    </HeroSocialLink>
                </HeroSocial>

                <HeroScroll to="about">
                    <i className="bx bx-mouse home__scroll-icon"></i>
                    <HeroScrollName>Scroll Down</HeroScrollName>
                </HeroScroll>
            </HeroContainer>
        </HeroSectionMain>
    );
};

export default HeroSection;
