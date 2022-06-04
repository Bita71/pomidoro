import classNames from "classnames";
import Link from "next/link";
import { Container } from "..";
import styles from "../../styles/modules/header/header.module.scss";
import Logo from "./Logo.link";
import StatsLink from "./Stats.link";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Container className={styles.container}>
        <Logo />
        <StatsLink />
      </Container>
    </header>
  );
};

export default Header;
