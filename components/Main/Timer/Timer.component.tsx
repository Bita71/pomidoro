import { Button } from "../..";
import styles from "../../../styles/modules/main/timer/timer.module.scss";
import classNames from "classnames";
import formatDate from "../../../utils/ts/formatDate";
import { TStatuses } from "./TimerContainer.component";

function formatTime(time: number): string[] {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  let formatedMinutes = minutes.toString();
  let formatedSeconds = seconds.toString();
  if (formatedMinutes.length === 1) {
    formatedMinutes = "0" + formatedMinutes;
  }

  if (formatedSeconds.length === 1) {
    formatedSeconds = "0" + formatedSeconds;
  }

  return [formatedMinutes, formatedSeconds];
}

interface TimerProps {
  className?: string;
  time: number;
  taskName: string;
  pomodor: number;
  taskNumber: number;
  status: TStatuses;
  onAddTime: () => void;
  onStart: () => void;
  onStop: () => void;
}

enum startButtonTexts {
  "default" = "Старт",
  "work" = "Пауза",
  "work_pause" = "Продолжить",
  "break" = "Пауза",
  "break_pause" = "Продолжить",
}

enum stopButtonTexts {
  "default" = "Стоп",
  "work" = "Стоп",
  "work_pause" = "Сделано",
  "break" = "Пропустить",
  "break_pause" = "Пропустить",
}

const Timer: React.FC<TimerProps> = ({
  className,
  time,
  taskName,
  pomodor,
  taskNumber,
  status,
  onAddTime,
  onStart,
  onStop,
}) => {
  const [minutes, seconds] = formatTime(time);
  const isWorking = status === "work";
  const isWorkingPause = status === "work_pause";
  const isBreaking = status === "break";
  const isBreakingPause = status === "break_pause";
  const isPause = isBreakingPause || isWorkingPause
  const isProcess = isWorking || isBreaking;
  return (
    <div
      className={classNames(
        className,
        { [styles.work]: isWorking || isWorkingPause },
        { [styles.break]: isBreaking || isBreakingPause },
        { [styles.process]: isProcess }
      )}
    >
      <div className={styles.header}>
        <h3 className={classNames("reset-title", styles.headerName)}>
          {taskName}
        </h3>
        <span className={styles.pomodoro}>Помидор {pomodor}</span>
      </div>
      <div className={styles.timerBlock}>
        <div className={styles.timer}>
          {minutes}:{seconds}
          <button
            onClick={onAddTime}
            type="button"
            className={classNames("reset-button", styles.buttonAdd)}
          />
        </div>
        <div className={styles.nameBlock}>
          <span className={styles.taskNumber}>Задача {taskNumber} -</span>
          <h3 className={classNames("reset-title", styles.name)}>{taskName}</h3>
        </div>
        <div className={styles.buttons}>
          <Button
            type="button"
            className={styles.buttonGreen}
            onClick={onStart}
          >
            {startButtonTexts[status]}
          </Button>
          <Button type="button" disabled={!isProcess && !isPause} className={styles.buttonRed} onClick={onStop}>
            {stopButtonTexts[status]}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
