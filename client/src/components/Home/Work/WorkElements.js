import styled from "styled-components";

export const WorkSection = styled.section`
  padding: 4.5rem 0 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 992px) {
    padding: 6.5rem 0 1rem;
  }
`;

// export const WorkFilter = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   column-gap: 0.75rem;
//   margin-bottom: 2rem;

//   @media screen and (max-width: 320px) {
//     column-gap: 0.25rem;
//   }
// `;

// export const WorkItem = styled.span`
//   cursor: pointer;
//   color: hsl(219, 15%, 95%);
//   padding: 0.25rem 0.75rem;
//   font-weight: 600;
//   border-radius: 0.5rem;

//   &.active_work {
//     background-color: hsl(250, 66%, 75%);
//     color: hsl(219, 48%, 8%);
//   }

//   @media screen and (max-width: 320px) {
//     font-size: 0.813rem;
//   }
// `;

export const WorkContainer = styled.div`
  max-width: 968px;
  margin-left: 1rem;
  margin-right: 1rem;
  display: grid;
  gap: 1.25rem;
  padding-top: 1rem;

  @media screen and (min-width: 576px) {
    justify-content: center;
    padding: 2rem;
  }

  @media screen and (min-width: 767px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media screen and (min-width: 992px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    margin-left: auto;
    margin-right: auto;
    gap: 2rem;
  }
`;

export const WorkCard = styled.div`
  background-color: ${(props) =>
    props.light ? "hsla(0, 13%, 14%, 1)" : "hsl(219, 100%, 99%)"};
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0 2px 8px hsla(219, 48%, 8%, 0.1);

  @media screen and (min-width: 992px) {
    padding: 1.25rem;
  }
`;

export const WorkImg = styled.img`
  border-radius: 1rem;
  margin-bottom: 0.75rem;
  width: 100%;

  @media screen and (min-width: 992px) {
    margin-bottom: 1rem;
  }
`;

export const WorkTitle = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.75rem;
  color: ${(props) =>
    props.light ? "hsl(219, 15%, 95%)" : "hsl(219, 40%, 10%)"};
`;

export const WorkButton = styled.a`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: max-content;
  color: hsla(0, 100%, 45%, 1);
  font-size: 0.813rem;
  column-gap: 0.25rem;
  transition: 0.4s;
  color: hsla(0, 70%, 100%, 1);
  background-color: hsla(0, 100%, 45%, 1);
  padding: 0.25rem 0.75rem;
  margin: 0 0.5rem 0 0;
  border-radius: 0.5rem;

  &.btn_ghost {
    background-color: transparent;
    border: 2px solid hsla(0, 100%, 45%, 1);
    color: hsla(0, 66%, 58%, 1);
  }

  &:hover {
    font-weight: 600;
    background-color: hsla(0, 100%, 29%, 1);
    color: hsl(219, 15%, 95%);
  }
`;

// export const ButtonMore = styled.a`
//   cursor: pointer;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   border-radius: 0.5rem;
//   font-size: 0.85rem;
//   margin: 1rem;
//   padding: 0.25rem 0.75rem;
//   width: fit-content;
//   transition: 0.2s;
//   color: hsla(0, 70%, 100%, 1);
//   background-color: hsla(0, 100%, 45%, 1);

//   &:hover {
//     background-color: hsla(0, 100%, 29%, 1);
//     color: hsl(219, 15%, 95%);
//   }
// `;
