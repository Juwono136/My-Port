import React, { useState, useEffect } from "react";
import { ScrollupIcon, ScrollupMain } from "./ScrollupElements";

const Scrollup = ({ darkMode }) => {
    const [isScrollup, setScrollup] = useState(false);

    const changeScrollUp = () => {
        if (window.scrollY >= 500) {
            setScrollup(true);
        } else {
            setScrollup(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", changeScrollUp);
    }, []);

    return (
        <>
            <ScrollupMain
                to="home"
                isscrollup={isScrollup ? 1 : 0}
                light={darkMode ? 1 : 0}
            >
                <ScrollupIcon className="bx bx-up-arrow-alt"></ScrollupIcon>
            </ScrollupMain>
        </>
    );
};

export default Scrollup;
