import styles from "../../styles/modules/stats/pomodoro.module.scss";
import Image from "next/image";
import Tomato from "../../public/asset/icons/tomato.svg";
import SmilingTomato from "../../public/asset/icons/stats/smiling_tomato.svg";
import classNames from "classnames";

export function formatPomodoroText(pomodoro: number) {
  let result = `${pomodoro} помидор`;
  if (pomodoro >= 11 && pomodoro <= 14) {
    result += "ов";
  } else {
    switch (pomodoro % 10) {
      case 1:
        break;
      case 2:
      case 3:
      case 4:
        result += "а";
        break;
      default:
        result += "ов";
        break;
    }
  }

  return result;
}

interface PomodoroProps {
  className?: string;
  pomodoro: number;
}

const Pomodoro: React.FC<PomodoroProps> = ({ className, pomodoro }) => {
  const pomodoroText = formatPomodoroText(pomodoro);
  return (
    <div className={classNames(styles.pomodoro, className)}>
      <div className={styles.pomodoroCount}>
        {pomodoro > 0 ? (
          <>
            <Image width={81} height={81} src={Tomato} alt="Tomato" />
            <span className={styles.pomodoroCountText}>x {pomodoro}</span>
          </>
        ) : (
          <Image
            width={115}
            height={115}
            src={SmilingTomato}
            alt="Улыбающееся Tomato"
          />
        )}
      </div>
      {pomodoro > 0 && (
        <div className={styles.pomodoroText}>{pomodoroText}</div>
      )}
    </div>
  );
};

export default Pomodoro;
