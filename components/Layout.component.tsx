import classNames from "classnames";
import { Container, Header } from ".";
import styles from "../styles/modules/layout.module.scss";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  title :string;
}

const Layout: React.FC<LayoutProps> = ({ children, className, title }) => {
  return (
    <div>
      <Header />
      <h1 className="visually-hidden">{title}</h1>
      <Container className={classNames(styles.container, className)}>
        {children}
      </Container>
    </div>
  );
};

export default Layout;
