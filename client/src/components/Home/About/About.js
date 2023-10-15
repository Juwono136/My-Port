import React from "react";
import { SectionSubtitle, SectionTitle } from "../../SectionTitleElements";
import {
    AboutBox,
    AboutContainer,
    AboutData,
    AboutDesc,
    AboutIcon,
    AboutImg,
    AboutInfo,
    AboutSection,
    AboutSubTitle,
    AboutTitle,
} from "./AboutElements";
import { Button } from "../../ButtonElements";
import { useSelector } from "react-redux";

const About = ({ darkMode }) => {
    const { user } = useSelector((state) => state.user)
    const { portfolio } = useSelector((state) => state.portfolio)

    return (
        <AboutSection id="about">
            <SectionSubtitle>My Intro</SectionSubtitle>
            <SectionTitle>About Me</SectionTitle>

            <AboutContainer>
                <AboutImg src={user.avatar} alt="about_me" />

                <AboutData>
                    <AboutInfo>
                        <AboutBox light={darkMode ? 1 : 0}>
                            <AboutIcon>
                                <i className="bx bx-award"></i>
                            </AboutIcon>
                            <AboutTitle light={darkMode ? 1 : 0}>Experience</AboutTitle>
                            <AboutSubTitle light={darkMode ? 1 : 0}>
                                {user.experience}
                            </AboutSubTitle>
                        </AboutBox>

                        <AboutBox light={darkMode ? 1 : 0}>
                            <AboutIcon>
                                <i className="bx bx-briefcase-alt"></i>
                            </AboutIcon>
                            <AboutTitle light={darkMode ? 1 : 0}>Completed</AboutTitle>
                            <AboutSubTitle light={darkMode ? 1 : 0}>
                                {portfolio.length}+ Projects
                            </AboutSubTitle>
                        </AboutBox>

                        <AboutBox light={darkMode ? 1 : 0}>
                            <AboutIcon>
                                <i className="bx bx-support"></i>
                            </AboutIcon>
                            <AboutTitle light={darkMode ? 1 : 0}>Support</AboutTitle>
                            <AboutSubTitle light={darkMode ? 1 : 0}>{user.support}</AboutSubTitle>
                        </AboutBox>
                    </AboutInfo>

                    <AboutDesc light={darkMode ? 1 : 0}>
                        {user.description}
                    </AboutDesc>

                    <Button to="contact">Contact Me</Button>
                </AboutData>
            </AboutContainer>
        </AboutSection>
    );
};

export default About;
