import classNames from "classnames";
import styles from "../../styles/modules/stats/day.module.scss";

export function formatDayText(time: number) {
  const hours = Math.floor(time / 3600);
  const minutes = Math.ceil((time - hours * 3600) / 60);
  let result = "";

  if (hours) {
    result += hours.toString() + " час";
    if (hours == 11) {
      result += "ов";
    } else {
      switch (hours % 10) {
        case 1:
          result += "а";
          break;
        default:
          result += "ов";
          break;
      }
    }
    result += " ";
  }

  if (minutes) {
    result += minutes.toString() + " минут";
    if (minutes != 11) {
      switch (minutes % 10) {
        case 1:
          result += "ы";
          break;
        default:
          break;
      }
    }
  }

  return result;
}

const weekDays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']

interface DayProps {
  className?: string;
  time: number;
  weekDay: number;
}

const Day: React.FC<DayProps> = ({className, time, weekDay}) => {
  const text = formatDayText(time);
  return (
    <div className={classNames(styles.day, className)}>
      <h3 className={classNames("reset-title", styles.dayTitle)}>
        {weekDays[weekDay]}
      </h3>
      <p className={classNames("reset-text", styles.dayText)}>
        {time > 0 ? (
          <>
            Вы работали над задачами в течение{" "}
            <span className={styles.dayTextTime}>{text}</span>
          </>
        ) : (
          "Нет данных"
        )}
      </p>
    </div>
  );
};

export default Day;
