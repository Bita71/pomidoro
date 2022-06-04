import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";
import styles from "../../styles/modules/buttons/button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ className, children, ...props }) => {
  return <button {...props} className={classNames(styles.button, className)}>{children}</button>;
};

export default Button;
