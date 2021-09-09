export type ToastNotificationType = "success" | "error" | "warning";

export interface ToastType {
  message: string;
  type: ToastNotificationType;
  handleCloseToast: () => void;
};
