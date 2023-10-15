import styled from "styled-components";

export const SkillSection = styled.section`
  padding: 4.5rem 0 1rem;

  &.bxs-badge-check {
    font-size: 1rem;
  }

  @media screen and (min-width: 992px) {
    padding: 6.5rem 0 1rem;
  }
`;

export const SkillContainer = styled.div`
  max-width: 968px;
  margin-left: 1rem;
  margin-right: 1rem;
  display: grid;
  gap: 1.25rem;
  row-gap: 2rem;
  /* flex-wrap: wrap; */
  /* justify-content: center;
  align-items: center; */
  padding-top: 1rem;

  @media screen and (min-width: 576px) {
    grid-template-columns: repeat(1, 600px);
    justify-content: center;
  }

  @media screen and (min-width: 992px) {
    margin-left: auto;
    margin-right: auto;
    grid-template-columns: repeat(1, 800px);
    column-gap: 3rem;
  }
`;

export const SkillContent = styled.div`
  background-color: ${(props) =>
    props.light ? "hsla(0, 13%, 14%, 1)" : "hsl(219, 100%, 99%)"};
  padding: 1rem;
  width: 100%;
  border-radius: 1.25rem;
  box-shadow: 0 2px 8px hsla(219, 48%, 8%, 0.1);

  @media screen and (min-width: 576px) {
    padding: 2rem 3rem;
  }
`;

// export const SkillTitle = styled.h3`
//   font-size: 0.938rem;
//   font-weight: 600;
//   text-align: center;
//   margin-bottom: 1.5rem;
//   color: hsla(0, 100%, 45%, 1);
// `;

export const SkillBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 2.5rem;

  @media screen and (max-width: 320px) {
    column-gap: 1rem;
  }
`;

export const SkillGroup = styled.div`
  display: flex;
  padding-left: 1rem;
  padding-right: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  column-gap: 1.2rem;
  row-gap: 1rem;

  @media screen and (max-width: 320px) {
    padding-left: 0.1rem;
    padding-right: 0.1rem;
  }
`;

export const SkillData = styled.div`
  display: flex;
  column-gap: 0.1rem;
  color: hsla(0, 100%, 45%, 1);
  background-color: ${(props) =>
    props.light ? "#323232" : "#fff"};
  border-radius: 1rem;
  box-shadow: 0 2px 8px hsla(219, 48%, 8%, 0.1);
  padding: 0.8rem 1rem;
`;

export const SkillName = styled.h3`
  font-size: 0.938rem;
  font-weight: 600;
  line-height: 18px;
  color: ${(props) =>
    props.light ? "hsl(219, 15%, 95%)" : "hsl(219, 15%, 15%)"};

  @media screen and (max-width: 320px) {
    font-size: 10px;
  }
`;
export const SkillLevel = styled.span`
  font-size: 0.625rem;

  @media screen and (max-width: 320px) {
    font-size: 7px;
  }
`;
