import classNames from "classnames";
import styles from "../styles/modules/container.module.scss";

interface ContainerProps {
  className?: string;
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ className, children }) => {
  return <div className={classNames(styles.container, className)}>{children}</div>;
};

export default Container;
