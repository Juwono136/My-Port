import React, { useRef, useState } from "react";
import { SectionSubtitle, SectionTitle } from "../../SectionTitleElements";
import {
    ContactButton,
    ContactButtonIcon,
    ContactCard,
    ContactCardData,
    ContactCardIcon,
    ContactCardTitle,
    ContactContainer,
    ContactForm,
    ContactFormDiv,
    ContactFormTag,
    ContactInfo,
    ContactSection,
    ContactTitle,
    ContactFormInput,
    ContactFormArea,
    ContactTextArea,
    ButtonEmail,
} from "./ContactElements";
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';

const Contact = ({ darkMode }) => {
    const form = useRef()
    const [isSending, setIsSending] = useState(false)
    const emailServiceId = process.env.REACT_APP_EMAIL_SERVICE_ID;
    const emailTemplateId = process.env.REACT_APP_EMAIL_TEMPLATE_ID;
    const emailUserId = process.env.REACT_APP_EMAIL_USER_ID;

    const sendEmail = (e) => {
        e.preventDefault()

        const name = form.current.from_name.value
        const email = form.current.from_email.value
        const message = form.current.message.value

        if (!name || !email || !message) {
            toast.error('Please fill in all fields.');
            return
        }

        const currentDate = new Date().toISOString().split('T')[0]
        const sentCount = parseInt(localStorage.getItem(`sentCount_${email}`)) || 0
        const lastSentDate = localStorage.getItem(`lastSentDate_${email}`)

        if (lastSentDate === currentDate && sentCount >= 3) {
            toast.error('You have reached the email sending limit for today.');
            return;
        }

        setIsSending(true)

        emailjs.sendForm(emailServiceId, emailTemplateId, form.current, emailUserId)
            .then((result) => {
                console.log(result.text)
                setIsSending(false)
                toast.success("Email sent!👍")

                localStorage.setItem(`sentCount_${email}`, sentCount + 1)
                localStorage.setItem(`lastSentDate_${email}`, currentDate)

                form.current.reset()
            }, (error) => {
                console.log(error.text)
                setIsSending(false)
                toast.error("Error, please try again!")
            })
    }

    return (
        <ContactSection id="contact">
            <SectionSubtitle>Get in touch</SectionSubtitle>
            <SectionTitle>Contact Me</SectionTitle>

            <ContactContainer>
                <div className="contact_content">
                    <ContactTitle light={darkMode ? 1 : 0}>Let's talk</ContactTitle>

                    <ContactInfo>
                        <ContactCard light={darkMode ? 1 : 0}>
                            <ContactCardIcon light={darkMode ? 1 : 0}>
                                <i className="bx bx-mail-send"></i>
                            </ContactCardIcon>
                            <ContactCardTitle light={darkMode ? 1 : 0}>
                                Email
                            </ContactCardTitle>
                            <ContactCardData light={darkMode ? 1 : 0}>
                                juwonoindonesia@gmail.com
                            </ContactCardData>
                            <ContactButton
                                href="mailto:juwonoindonesia@gmail.com"
                                target={"_blank"}
                            >
                                Write me
                                <ContactButtonIcon>
                                    <i className="bx bx-right-arrow-alt"></i>
                                </ContactButtonIcon>
                            </ContactButton>
                        </ContactCard>

                        <ContactCard light={darkMode ? 1 : 0}>
                            <ContactCardIcon light={darkMode ? 1 : 0}>
                                <i className="bx bxl-instagram"></i>
                            </ContactCardIcon>
                            <ContactCardTitle light={darkMode ? 1 : 0}>
                                Instagram
                            </ContactCardTitle>
                            <ContactCardData light={darkMode ? 1 : 0}>
                                @uno_136
                            </ContactCardData>
                            <ContactButton
                                href="https://www.instagram.com/uno_136/"
                                target={"_blank"}
                            >
                                Write me
                                <ContactButtonIcon>
                                    <i className="bx bx-right-arrow-alt"></i>
                                </ContactButtonIcon>
                            </ContactButton>
                        </ContactCard>
                    </ContactInfo>
                </div>

                <div>
                    <ContactTitle light={darkMode ? 1 : 0}>
                        Write me your project
                    </ContactTitle>

                    <ContactForm ref={form} onSubmit={sendEmail}>
                        <ContactFormDiv>
                            <ContactFormTag htmlFor="" light={darkMode ? 1 : 0}>
                                Name
                            </ContactFormTag>
                            <ContactFormInput
                                light={darkMode ? 1 : 0}
                                type="text"
                                name="from_name"
                                placeholder="Insert your name"
                                required
                            />
                        </ContactFormDiv>

                        <ContactFormDiv>
                            <ContactFormTag htmlFor="" light={darkMode ? 1 : 0}>
                                Email
                            </ContactFormTag>
                            <ContactFormInput
                                light={darkMode ? 1 : 0}
                                type="email"
                                name="from_email"
                                placeholder="Insert your email"
                                required
                            />
                        </ContactFormDiv>

                        <ContactFormArea>
                            <ContactFormTag htmlFor="" light={darkMode ? 1 : 0}>
                                Project
                            </ContactFormTag>
                            <ContactTextArea
                                name="message"
                                required
                                cols="30"
                                rows="10"
                                placeholder="Write your project here"
                                light={darkMode ? 1 : 0}
                            />
                        </ContactFormArea>

                        <ButtonEmail type="submit" value="send" disabled={isSending}>
                            {isSending ? "Sending..." : "Send Message"}
                        </ButtonEmail>
                    </ContactForm>
                </div>
            </ContactContainer>
        </ContactSection>
    );
};

export default Contact;
