import classNames from "classnames";
import React from "react";
import { AddTask, Layout, Tasks, Timer, TimerContainer } from "../components";
import GenericList from "../utils/react/GenericList";
import styles from "../styles/modules/main/main.module.scss";

const list = [
  "Выберите категорию и напишите название текущей задачи",
  "Запустите таймер («помидор»)",
  "Работайте пока «помидор» не прозвонит",
  "Сделайте короткий перерыв (3-5 минут)",
  "Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена. Каждые 4 «помидора» делайте длинный перерыв (15-30 минут).",
].map((item) => ({
  text: <p className={classNames("reset-text", styles.itemText)}>{item}</p>,
  className: styles.item,
}));

const title = "Pomodoro_box";

const Hello: React.FC = () => {
  return (
    <Layout title={title} className={styles.block}>
      <div className={styles.left}>
        <h2 className={classNames("reset-title", styles.title)}>
          Ура! Теперь можно начать работать:
        </h2>
        <ul className={classNames(styles.list)}>
          <GenericList list={list} />
        </ul>
        <div className={styles.tasks}>
          <AddTask className={styles.addTask} />
          <Tasks />
        </div>
      </div>
      <TimerContainer className={styles.right} />
    </Layout>
  );
};

export default Hello;
