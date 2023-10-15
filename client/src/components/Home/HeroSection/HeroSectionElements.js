import styled from "styled-components";
import { Link as LinkS } from "react-scroll";

export const HeroSectionMain = styled.section`
  padding: 4.5rem 0 1rem;

  /* @media screen and (min-width: 992px) {
    padding: 6.5rem 0 1rem;
  } */
`;

export const HeroContainer = styled.div`
  max-width: 968px;
  margin-left: 1rem;
  margin-right: 1rem;
  display: grid;
  gap: 1.25rem;
  position: relative;
  row-gap: 1.5rem;
  padding-top: 2rem;

  @media screen and (min-width: 992px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

export const HeroData = styled.div`
  text-align: center;
`;

export const HeroGreeting = styled.span`
  display: block;
  color: ${(props) =>
    props.light
      ? "hsl(219, 15%, 95%)"
      : "hsla(360, 100%, 34%, 1)"}; // title color
  margin-bottom: 0.25rem;
  font-size: 0.813rem;
  font-weight: 500;
`;

export const HeroName = styled.h1`
  font-size: 2.5rem;
  color: ${(props) =>
    props.light
      ? "hsl(219, 15%, 95%)"
      : "hsla(360, 100%, 48%, 1)"}; // title color
`;

export const HeroEducation = styled.h3`
  color: ${(props) =>
    props.light ? "hsl(219, 8%, 75%)" : "hsla(219, 8%, 19%, 1)"}; //text-color
  margin-bottom: 1.5rem;
`;

export const HeroButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;

  @media screen and (max-width: 320px) {
    flex-direction: column;
  }
`;

export const HeroHandle = styled.div`
  justify-self: center;
  width: 280px;
  height: 300px;
  background: linear-gradient(
    180deg,
    hsla(0, 94%, 46%, 1),
    hsla(0, 66%, 75%, 0.2)
  );
  border-radius: 33% 67% 70% 30% / 30% 30% 70% 70%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* overflow: hidden; */

  @media screen and (max-width: 320px) {
    width: 180px;
    height: 225px;
    border-radius: 27% 73% 67% 33% / 55% 50% 50% 45%;
    transition: 0.4s;
  }

  @media screen and (min-width: 992px) {
    width: 290px;
    height: 300px;
  }
`;

export const HeroImg = styled.img`
  width: 200px;

  @media screen and (max-width: 320px) {
    width: 130px;
  }

  @media screen and (min-width: 992px) {
    width: 220px;
  }
`;

export const HeroSocial = styled.div`
  position: absolute;
  bottom: 5rem;
  left: 0;
  display: grid;
  row-gap: 0.5rem;

  &::after {
    content: "";
    width: 32px;
    height: 2px;
    background-color: hsla(0, 94%, 46%, 1);
    transform: rotate(90deg) translate(16px, 3px);
  }

  @media screen and (min-width: 992px) {
    &::after {
      transform: rotate(90deg) translate(16px, 0);
    }
  }
`;

export const HeroSocialLink = styled.a`
  width: max-content;
  background-color: hsla(0, 91%, 15%, 1); // container color
  color: hsla(0, 70%, 64%, 1);
  padding: 0.25rem;
  border-radius: 0.25rem;
  display: flex;
  font-size: 1rem;
  transition: 0.4s;

  &:hover {
    background-color: hsla(0, 100%, 45%, 1);
    color: #fff;
  }

  @media screen and (min-width: 992px) {
    padding: 0.4rem;
    font-size: 1.25rem;
  }
`;

export const HeroScroll = styled(LinkS)`
  cursor: pointer;
  position: absolute;
  color: hsla(0, 94%, 60%, 1);
  right: -1.5rem;
  bottom: 4.5rem;
  display: grid;
  row-gap: 2.25rem;
  justify-items: center;
  font-size: 1.25rem;

  @media screen and (min-width: 992px) {
    font-size: 2rem;
  }
`;

export const HeroScrollName = styled.span`
  font-size: 0.75rem;
  transform: rotate(-90deg);
`;

export const ButtonCV = styled.a`
  display: inline-block;
  background-color: hsla(0, 100%, 45%, 1); // first color
  color: hsl(219, 15%, 95%); // body color
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: 0.4s;
  cursor: pointer;

  &.hero_ghost {
    background-color: transparent;
    border: 2px solid hsla(0, 100%, 45%, 1);
    color: hsla(0, 66%, 58%, 1);
  }

  &:hover {
    background-color: hsla(0, 60%, 35%, 1);
    color: hsl(219, 15%, 95%);
  }
`;
