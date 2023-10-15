import styled from "styled-components";

export const AboutSection = styled.section`
  padding: 4.5rem 0 1rem;

  /* @media screen and (min-width: 992px) {
    padding: 6.5rem 0 1rem;
  } */
`;

export const AboutContainer = styled.div`
  max-width: 968px;
  margin-left: 1rem;
  margin-right: 1rem;
  display: grid;
  gap: 1.25rem;
  row-gap: 2.5rem;

  @media screen and (min-width: 992px) {
    margin-left: auto;
    margin-right: auto;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    column-gap: 4rem;
  }
`;

export const AboutImg = styled.img`
  width: 220px;
  border-radius: 1.5rem;
  justify-self: center;

  @media screen and (min-width: 992px) {
    width: 350px;
  }
`;

export const AboutData = styled.div`
  text-align: center;

  @media screen and (min-width: 992px) {
    text-align: initial;
  }
`;

export const AboutInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-bottom: 2rem;

  @media screen and (max-width: 320px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: 576px) {
    grid-template-columns: repeat(3, 140px);
    justify-content: center;
  }

  @media screen and (min-width: 992px) {
    justify-content: initial;
  }
`;

export const AboutBox = styled.div`
  background-color: ${(props) =>
        props.light ? "hsla(0, 13%, 14%, 1)" : "hsl(219, 100%, 99%)"};
  border-radius: 0.75rem;
  padding: 0.75rem 0.5rem;
  box-shadow: 0 2px 8px hsla(219, 48%, 8%, 0.1);

  @media screen and (min-width: 992px) {
    text-align: center;
    padding: 1rem 1.25rem;
  }
`;

export const AboutIcon = styled.div`
  font-size: 1.5rem;
  color: hsla(0, 100%, 30%, 1); // first color
  margin-bottom: 0.5rem;
`;

export const AboutTitle = styled.h3`
  font-size: 0.813rem;
  color: ${(props) =>
        props.light ? "hsl(219, 15%, 95%)" : "hsl(219, 15%, 15%)"};
`;

export const AboutSubTitle = styled.span`
  font-size: 0.625rem;
  color: ${(props) =>
        props.light ? "hsl(219, 15%, 95%)" : "hsl(219, 40%, 10%)"};
`;

export const AboutDesc = styled.p`
  margin-bottom: 2rem;
  color: ${(props) =>
        props.light ? "hsl(219, 15%, 95%)" : "hsl(219, 40%, 10%)"};

  @media screen and (min-width: 576px) {
    padding: 0 5rem;
  }

  @media screen and (min-width: 992px) {
    padding: 0 4rem 0 0;
    margin-bottom: 2.5rem;
    text-align: justify;
  }
`;
