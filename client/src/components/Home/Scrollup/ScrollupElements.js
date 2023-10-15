import styled from "styled-components";
import { Link as LinkS } from "react-scroll";

export const ScrollupMain = styled(LinkS)`
  position: fixed;
  right: 2rem;
  bottom: ${(props) => (props.isscrollup ? "30px" : "-50px")};
  background-color: ${(props) =>
        props.light ? "hsla(0, 100%, 19%, 1)" : "#fff"};
  box-shadow: 0 4px 12px hsla(0, 0%, 20%, 0.3);
  display: inline-flex;
  padding: 0.5rem;
  border-radius: 0.25rem;
  z-index: 10;
  opacity: 0.8;
  transition: 0.4s;
  cursor: pointer;

  @media screen and (max-width: 576px) {
    bottom: -50px;
  }
`;

export const ScrollupIcon = styled.i`
  font-size: 1.25rem;
  color: hsl(355, 70%, 54%);

  &:hover {
    opacity: 1;
  }
`;
