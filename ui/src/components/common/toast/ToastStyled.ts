import styled from "styled-components";

export interface ToastContainerType {
  type: string;
}

export const ToastContainer = styled.div<ToastContainerType>`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  border: 2px solid
    ${(props): string => {
      switch (props.type) {
        case "error": {
          return "#D3432F";
        }
        case "warning": {
          return "#FFB34D";
        }
        default: {
          return "#219653";
        }
      }
    }};
  border-radius: 10px;
  color: #ffffff;
  background: ${(props): string => {
    switch (props.type) {
      case "error": {
        return "#D3432F";
      }
      case "warning": {
        return "#FFB34D";
      }
      default: {
        return "#219653";
      }
    }
  }};
  padding: 8px;
`;

export const StyledCloseBtn = styled.div`
  font-weight: 600;
  cursor: pointer;
  margin-left: 16px;
`;
