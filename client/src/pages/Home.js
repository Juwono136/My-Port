import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Navbar from '../components/Home/Navbar/Navbar';
import HeroSection from '../components/Home/HeroSection/HeroSection';
import About from '../components/Home/About/About';
import Skills from '../components/Home/Skills/Skills';
import Work from '../components/Home/Work/Work';
import Contact from '../components/Home/Contact/Contact';
import Footer from '../components/Home/Footer/Footer';
import Scrollup from '../components/Home/Scrollup/Scrollup';

const Main = styled.div`
  background-color: ${(props) =>
        !props.light ? "hsl(355, 100%, 7%)" : "hsl(219, 100%, 99%)"};
  position: relative;
  min-height: 100vh;
  overflow: hidden;
`;

const Home = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDarkMode(prefersDarkMode);
    }, []);

    const handleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <>
            <Navbar handleDarkMode={handleDarkMode} darkMode={darkMode} />
            <Main light={!darkMode ? true : false}>
                <HeroSection darkMode={darkMode} />
                <About darkMode={darkMode} />
                <Skills darkMode={darkMode} />
                <Work darkMode={darkMode} />
                <Contact darkMode={darkMode} />
            </Main>
            <Footer />
            <Scrollup darkMode={darkMode} />
        </>
    )
}

export default Home