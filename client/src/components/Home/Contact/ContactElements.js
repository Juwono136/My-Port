import styled from "styled-components";

export const ContactSection = styled.section`
  padding: 4.5rem 0 1rem;
`;

export const ContactContainer = styled.div`
  max-width: 968px;
  margin-left: 1rem;
  margin-right: 1rem;
  display: grid;
  gap: 1.25rem;
  row-gap: 3rem;
  padding-bottom: 3px;

  @media screen and (min-width: 767px) {
    grid-template-columns: repeat(2, max-content);
    justify-content: center;
    column-gap: 3rem;
  }

  @media screen and (min-width: 992px) {
    margin-left: auto;
    margin-right: auto;
    column-gap: 6rem;
  }
`;

export const ContactTitle = styled.h3`
  text-align: center;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  color: ${(props) =>
        props.light ? "hsla(219, 15%, 95%, 1)" : "hsla(219, 15%, 15%, 1)"};
`;

export const ContactInfo = styled.div`
  display: grid;
  gap: 1rem;

  @media screen and (min-width: 576px) {
    grid-template-columns: 300px;
    justify-content: center;
  }
`;

export const ContactCard = styled.div`
  background-color: ${(props) =>
        props.light ? "hsla(0, 13%, 14%, 1)" : "hsl(219, 100%, 99%)"};
  padding: 1rem;
  border-radius: 0.75rem;
  text-align: center;
  box-shadow: 0 2px 16px hsla(219, 48%, 8%, 0.1);
`;

export const ContactCardIcon = styled.div`
  font-size: 2rem;
  color: hsla(0, 100%, 45%, 1);
  margin-bottom: 0.25rem;
`;

export const ContactCardTitle = styled.h3`
  font-size: 0.813rem;
  font-weight: 600;
  color: ${(props) =>
        props.light ? "hsla(219, 15%, 95%, 1)" : "hsla(219, 15%, 15%, 1)"};
`;

export const ContactCardData = styled.span`
  font-size: 0.813rem;
  display: block;
  margin-bottom: 0.75rem;
  color: ${(props) =>
        props.light ? "hsla(219, 15%, 78%, 1)" : "hsla(219, 15%, 15%, 1)"};
`;

export const ContactButton = styled.a`
  color: hsla(0, 100%, 45%, 1);
  font-size: 0.813rem;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 0.25rem;
  transition: 0.4s;

  &:hover {
    transform: translateX(0.25rem);
  }
`;

export const ContactButtonIcon = styled.div`
  font-size: 1rem;
`;

export const ContactForm = styled.form`
  display: block;
  flex-direction: row;
  padding: 0 0.5rem;
  overflow: auto;
  @media screen and (min-width: 576px) {
    width: 360px;
    margin: 0 auto;
    padding: 0.5rem;
  }

  @media screen and (max-width: 570px) {
    padding: 0.5rem;
  }
`;

export const ContactFormDiv = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
  height: 4rem;
`;

export const ContactFormTag = styled.label`
  position: absolute;
  top: -0.75rem;
  left: 1.25rem;
  font-size: 0.813rem;
  padding: 0.25rem;
  color: ${(props) =>
        props.light ? "hsla(219, 15%, 95%, 1)" : "hsla(219, 15%, 15%, 1)"};
  background-color: ${(props) =>
        props.light ? "hsl(355, 100%, 7%)" : "hsl(219, 100%, 99%)"};
  z-index: 10;
`;

export const ContactFormInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px solid hsl(219, 4%, 55%);
  background: none;
  color: ${(props) =>
        props.light ? "hsla(219, 15%, 78%, 1)" : "hsla(219, 15%, 15%, 1)"};
  outline: none;
  font-size: 0.813rem;
  padding: 1.5rem;
  border-radius: 0.75rem;
  z-index: 1;
`;

export const ContactTextArea = styled.textarea`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px solid hsl(219, 4%, 55%);
  background: none;
  color: ${(props) =>
        props.light ? "hsla(219, 15%, 78%, 1)" : "hsla(219, 15%, 15%, 1)"};
  font-size: 0.813rem;
  outline: none;
  padding: 1.5rem;
  border-radius: 0.75rem;
  z-index: 1;
  resize: none;
`;

export const ContactFormArea = styled.div`
  position: relative;
  margin-bottom: 2rem;
  height: 4rem;
  height: 11rem;
`;

export const ButtonEmail = styled.button`
  display: inline-block;
  background-color: hsla(0, 100%, 45%, 1); // first color
  color: hsl(219, 15%, 95%); // body color
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: 0.4s;
  cursor: pointer;

  &:hover {
    background-color: hsla(0, 60%, 35%, 1);
    color: hsl(219, 15%, 95%);
  }
`;
