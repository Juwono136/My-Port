import React from "react";
import { SectionSubtitle, SectionTitle } from "../../SectionTitleElements";
import {
    SkillBox,
    SkillContainer,
    SkillContent,
    SkillData,
    SkillGroup,
    SkillLevel,
    SkillName,
    SkillSection,
} from "./SkillsElements";
import { useSelector } from "react-redux";

const Skills = ({ darkMode }) => {
    const { skill } = useSelector((state) => state.skill)
    // console.log(skill)
    return (
        <SkillSection id="skills">
            <SectionSubtitle>Skills</SectionSubtitle>
            <SectionTitle>My Experience</SectionTitle>

            <SkillContainer>
                <SkillContent light={darkMode ? 1 : 0}>

                    <SkillBox>
                        <SkillGroup >
                            {skill.map((skill) => (
                                <SkillData light={darkMode ? 1 : 0} key={skill.id}>
                                    <i className="bx bxs-badge-check"></i>
                                    <div >
                                        <SkillName light={darkMode ? 1 : 0}>{skill.skill_name}</SkillName>
                                        <SkillLevel>{skill.level}</SkillLevel>
                                    </div>
                                </SkillData>
                            ))}
                        </SkillGroup>
                    </SkillBox>
                </SkillContent>
            </SkillContainer>
        </SkillSection>
    );
};

export default Skills;
