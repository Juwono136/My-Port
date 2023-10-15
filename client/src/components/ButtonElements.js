import styled from "styled-components";
import { Link as LinkS } from "react-scroll";

export const Button = styled(LinkS)`
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
