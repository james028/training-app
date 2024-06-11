import styled from "styled-components";

type StyledButtonProps = {
  disabledClass?: boolean;
};

export const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${(props) => (props.disabledClass ? "#b7bcca" : null)};
`;

export const StyledDayWidth = styled.div`
  width: 14.26%;
`;
