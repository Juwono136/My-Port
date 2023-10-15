import styled from "styled-components";
import { Link as LinkS } from "react-scroll";

export const FooterMain = styled.footer`
  background-color: hsla(0, 73%, 60%, 1);
`;

export const FooterContainer = styled.div`
  max-width: 968px;
  margin-left: 1rem;
  margin-right: 1rem;
  padding: 2rem 0 6rem;

  @media screen and (min-width: 992px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

export const FooterTitle = styled.h1`
  color: hsla(219, 8%, 19%, 1);
  text-align: center;
  margin-bottom: 2rem;
`;

export const FooterList = styled.ul`
  display: flex;
  justify-content: center;
  column-gap: 1.5rem;
  margin-bottom: 2rem;
`;

export const FooterLink = styled(LinkS)`
  color: hsla(219, 8%, 19%, 1);
  cursor: pointer;
`;

export const FooterSocial = styled.ul`
  display: flex;
  justify-content: center;
  column-gap: 1.25rem;
`;

export const FooterSocialLink = styled.a`
  background-color: hsla(0, 91%, 15%, 1);
  color: hsla(0, 70%, 64%, 1);
  padding: 0.25rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  display: inline-flex;
  transition: 0.4s;

  &:hover {
    background-color: hsla(0, 94%, 46%, 1);
    color: #fff;
  }

  @media screen and (min-width: 992px) {
    font-size: 1.25rem;
    padding: 0.4rem;
    border-radius: 0.5rem;
  }
`;

export const FooterCopy = styled.span`
  display: block;
  margin-top: 4.5rem;
  color: hsl(219, 32%, 12%);
  text-align: center;
  font-size: 0.625rem;

  @media screen and (min-width: 992px) {
    font-size: 0.813rem;
  }
`;
