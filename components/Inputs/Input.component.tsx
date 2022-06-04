import classNames from "classnames";
import React from "react";
import { InputHTMLAttributes } from "react";
import styles from "../../styles/modules/inputs/input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  classInput?: string;
  classLabel?: string;
  classError?: string;
  error?: string;
}
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error, classError, classInput, classLabel, ...props }, ref) => {
    return (
      <label className={classNames("reset-label", styles.label, classLabel)}>
        <span className={classNames(styles.error, classError)}>{error}</span>
        <input
          {...props}
          ref={ref}
          className={classNames("reset-input", styles.input, classInput)}
        />
      </label>
    );
  }
);

export default Input;
