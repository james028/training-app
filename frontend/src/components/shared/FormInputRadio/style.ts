import styled from "styled-components";

export const StyledRadioOrCheckboxButtonContainer = styled.div<{
  leftSideLabel?: boolean;
}>`
  display: flex;
  justify-content: ${(props) =>
    props.leftSideLabel ? "flex-end" : "flex-start"};
  flex-direction: ${(props) =>
    props.leftSideLabel ? "row-reverse" : "reverse"};
`;
