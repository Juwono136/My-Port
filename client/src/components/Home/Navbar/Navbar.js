import React, { useState, useEffect } from "react";
import {
    HeaderNav,
    NavContainer,
    NavItem,
    NavList,
    NavMenu,
    NavLogo,
    NavLink,
    ThemeIcon,
} from "./NavbarElements";

const Navbar = ({ darkMode, handleDarkMode }) => {
    const [scrollNav, setScrollNav] = useState(false);

    const changeNav = () => {
        if (window.scrollY >= 80) {
            setScrollNav(true);
        } else {
            setScrollNav(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", changeNav);
    }, []);

    return (
        <HeaderNav light={darkMode ? 1 : 0} id="header" scrollNav={scrollNav}>
            <NavContainer>
                <NavLogo to="home">My_Port</NavLogo>

                <NavMenu light={darkMode ? 1 : 0}>
                    <NavList>
                        <NavItem>
                            <NavLink
                                to="home"
                                light={darkMode ? 1 : 0}
                                smooth={true}
                                duration={100}
                                spy={true}
                                offset={-80}
                            >
                                <i className="bx bx-home-alt"></i>
                            </NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink
                                to="about"
                                light={darkMode ? 1 : 0}
                                smooth={true}
                                duration={100}
                                spy={true}
                                offset={-80}
                            >
                                <i className="bx bx-user"></i>
                            </NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink
                                to="skills"
                                light={darkMode ? 1 : 0}
                                smooth={true}
                                duration={100}
                                spy={true}
                                offset={-80}
                            >
                                <i className="bx bx-book"></i>
                            </NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink
                                to="works"
                                light={darkMode ? 1 : 0}
                                smooth={true}
                                duration={100}
                                spy={true}
                                offset={-80}
                            >
                                <i className="bx bx-briefcase-alt-2"></i>
                            </NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink
                                to="contact"
                                light={darkMode ? 1 : 0}
                                smooth={true}
                                duration={100}
                                spy={true}
                                offset={-80}
                            >
                                <i className="bx bx-message-square-detail"></i>
                            </NavLink>
                        </NavItem>
                    </NavList>
                </NavMenu>

                <ThemeIcon onClick={handleDarkMode} darkMode={darkMode}>
                    {/* Theme change button */}
                    <i
                        className={!darkMode ? "bx bx-moon" : "bx bx-sun"}
                        id="theme-button"
                    ></i>
                </ThemeIcon>
                {/* <ButtonLogin to="/auth">Login</ButtonLogin> */}
            </NavContainer>
        </HeaderNav>
    );
};

export default Navbar;
