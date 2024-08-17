import styled from "styled-components";

export const StyledColorRectangle = styled.div<{ color: string }>`
  width: 100px;
  height: 50px;
  background-color: ${(props) => (props.color ? `${props.color}` : null)};
`;

export const StyledColorContainer = styled.div<{ color: string }>`
  min-height: 40px;
  width: 14.28%;
  background-color: ${(props) => (props.color ? `${props.color}` : null)};
`;
