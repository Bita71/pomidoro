import classNames from "classnames";
import React from "react";
import { Layout } from "../../components";
import Analysis from "../../components/Stats/Analysis.component";
import Select from "../../components/Stats/Select.component";
import styles from "../../styles/modules/stats/stats.module.scss";

const Stats: React.FC = () => {
  return (
    <Layout>
      <div className={styles.top}>
        <h1 className={classNames("reset-title", styles.title)}>
          Ваша активность
        </h1>
        <Select className={styles.select} />
      </div>
      <Analysis />
    </Layout>
  );
};

export default Stats;
