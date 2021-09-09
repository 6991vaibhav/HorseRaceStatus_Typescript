import { useEffect } from "react";
import { TOAST_TIMER } from "../../../helpers/constants";
import { StyledCloseBtn, ToastContainer } from "./ToastStyled";
import { ToastType } from "./ToastTypes";

const Toast = ({ message, type, handleCloseToast }: ToastType) => {
  // Toast will be closed in 5secs.
  useEffect(() => {
    setTimeout(() => handleCloseToast(), TOAST_TIMER);
  }, [handleCloseToast]);

  return (
    <ToastContainer type={type}>
      <div>{message}</div>
      <StyledCloseBtn role="button" onClick={handleCloseToast}>
        x
      </StyledCloseBtn>
    </ToastContainer>
  );
};

export default Toast;
