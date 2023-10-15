import styled from "styled-components";
import { Link as LinkS } from "react-scroll";
import { Link as LinkR } from "react-router-dom";

export const HeaderNav = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: ${(props) =>
    props.light ? "hsl(355, 100%, 7%)" : "hsl(219, 100%, 99%)"};
  box-shadow: ${(props) =>
    props.scrollNav ? "0 2px 6px hsla(0, 0%, 7%, 0.2)" : "transparent"};
  z-index: 10;
`;

export const NavContainer = styled.nav`
  max-width: 968px;
  margin-left: 1rem;
  margin-right: 1rem;
  height: 3.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.25rem;

  @media screen and (min-width: 992px) {
    margin-left: auto;
    margin-right: auto;
    height: calc(3.5rem + 1rem);
  }
`;

export const NavLogo = styled(LinkS)`
  color: hsla(344, 100%, 57%, 1);
  font-weight: 500;
  transition: 0.4s;
  cursor: pointer;

  &:hover {
    color: hsla(360, 100%, 69%, 1);
  }
`;

export const NavMenu = styled.div`
  position: fixed;
  bottom: 1rem;
  background-color: ${(props) =>
    props.light ? "hsla(360, 32%, 16%, 0.3)" : "hsla(360, 46%, 90%, 0.3)"};
  width: 90%;
  border-radius: 4rem;
  padding: 1rem 2.25rem;
  backdrop-filter: blur(10px);

  @media screen and (max-width: 320px) {
    padding: 1rem 1.5rem;
  }

  @media screen and (min-width: 576px) {
    width: 328px;
    left: 0;
    right: 0;
    margin: 0 auto;
  }
`;

export const NavList = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NavItem = styled.li`
  list-style: none;
`;

export const NavLink = styled(LinkS)`
  color: ${(props) =>
    props.light ? "hsl(219, 8%, 75%)" : "hsla(219, 8%, 33%, 1)"};
  padding: 0.4rem;
  display: flex;
  border-radius: 5rem;
  cursor: pointer;

  &.active {
    background: linear-gradient(
      180deg,
      hsla(360, 80%, 60%, 1),
      hsla(320, 40%, 60%, 0.2)
    );
    box-shadow: 0 0 16px hsla(360, 40%, 60%, 0.4);
    color: ${(props) =>
    props.light ? "hsl(360, 15%, 95%)" : "hsla(360, 15%, 8%, 1)"};
  }
`;

export const ThemeIcon = styled.div`
  font-size: 1.25rem;
  transition: 0.3s;
  color: hsla(344, 100%, 57%, 1);
  cursor: pointer;

  &:hover {
    color: hsla(360, 66%, 73%, 1);
  }
`;

export const ButtonLogin = styled(LinkR)`
  background-color: hsla(344, 100%, 57%, 1);
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  color: #fff;
  font-weight: 500;
  transition: 0.4s;
  cursor: pointer;
  font-size: 0.8rem;

  &:hover {
    background-color: hsla(0, 100%, 45%, 1);
    font-weight: 600;
  }
`;
