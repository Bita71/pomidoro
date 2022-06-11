import classNames from "classnames";
import React from "react";
import Image from "next/image";
import TomatoIcon from "../../public/asset/icons/tomato.svg";
import Link from "next/link";
import styles from "../../styles/modules/header/logo.module.scss";

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <a className={classNames("reset-link", styles.logo)}>
        <Image width={40} height={40} src={TomatoIcon} alt="Tomato" />
        <span className={styles.logoText}>pomodoro_box</span>
      </a>
    </Link>
  );
};

export default Logo;
