import classNames from "classnames";
import React from "react";
import Link from "next/link";
import styles from "../../styles/modules/header/statslink.module.scss";

const StatsLink: React.FC = () => {
  return (
    <Link href="/stats">
      <a className={classNames("reset-link", styles.link)}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 20H14V4H10V20ZM4 20H8V12H4V20ZM16 9V20H20V9H16Z"
            fill="#DC3E22"
          />
        </svg>
        Статистика
      </a>
    </Link>
  );
};

export default StatsLink;
