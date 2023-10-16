import React from "react";
import Button from "../../Button/Button";
import { FailIcon } from "../../svgs/FailIcon";
import styles from "./ErrorModal.module.scss";

interface IErrorModalProps {
  onClose?: () => void;
  errorMessage: string;
}

const ErrorModal = ({ onClose, errorMessage }: IErrorModalProps) => {
  return (
    <div className={styles["failed-popup-content"]}>
      <div className={styles["failed-icon"]}>
        <FailIcon />
      </div>
      <h1>Error</h1>
      <p>{errorMessage}</p>
      <Button variant="outlined" size="medium" onClick={onClose}>
        Go Back
      </Button>
    </div>
  );
};

export default ErrorModal;
