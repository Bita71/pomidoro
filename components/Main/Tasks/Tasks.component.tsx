import GenericList from "../../../utils/react/GenericList";
import styles from "../../../styles/modules/main/tasks/tasks.module.scss";
import React from "react";
import Task from "./Task.component";
import { useAppSelector } from "../../../hooks/storeHooks";
import classNames from "classnames";

function format(time: number) {
  const years = Math.floor(time / 31536000);
  const days = Math.floor((time - years * 31536000) / 86400);
  const hours = Math.floor((time - days * 86400) / 3600);
  const minutes = Math.floor((time - hours * 3600) / 60);
  let result = "";
  if (years) {
    result += years.toString() + " ";
    switch (years % 10) {
      case 1:
        result += "год";
        break;
      case 2:
      case 3:
      case 4:
        result += "года";
        break;
      default:
        result += "лет";
        break;
    }
    result += " ";
  }

  if (days) {
    result += days.toString() + " ";
    switch (days % 10) {
      case 1:
        result += "день";
        break;
      case 2:
      case 3:
      case 4:
        result += "дня";
        break;
      default:
        result += "дней";
        break;
    }
    result += " ";
  }

  if (hours) {
    result += hours.toString() + " ";
    console.log(hours % 10);
    switch (hours % 10) {
      case 1:
        result += "час";
        break;
      case 2:
      case 3:
      case 4:
        result += "часа";
        break;
      default:
        result += "часов";
        break;
    }
    result += " ";
  }

  if (minutes) {
    result += minutes.toString() + " ";
    switch (minutes % 10) {
      case 1:
        result += "минута";
        break;
      case 2:
      case 3:
      case 4:
        result += "минуты";
        break;
      default:
        result += "минут";
        break;
    }
  }

  return result;
}

const defaultTime = 60 * 25;

const Tasks: React.FC = () => {
  const { tasks } = useAppSelector((state) => state.tasks);
  const list = tasks.map(({ id, name, pomodoro }) => ({
    text: <Task id={id} name={name} pomodoro={pomodoro} />,
    className: styles.item,
  }));

  let allPomodoro = 0;
  tasks.forEach((item) => (allPomodoro += item.pomodoro));

  const formatedTime = format(allPomodoro * defaultTime);

  return (
    <div>
      <ul className={classNames("reset-list", styles.list)}>
        <GenericList list={list} />
      </ul>
      <span className={styles.time}>{formatedTime}</span>
    </div>
  );
};

export default Tasks;
