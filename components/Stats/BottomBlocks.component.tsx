import classNames from "classnames";
import styles from "../../styles/modules/stats/bottomblocks.module.scss";

export function formatPauseTime(time: number) {
  const hours = Math.floor(time / 3600);
  const minutes = Math.ceil((time - hours * 3600) / 60);
  let result = "";
  if (hours > 0) {
    result += `${hours}ч `;
  }

  result += `${minutes}м`;
  return result;
}

interface FocusProps {
  className?: string;
  focusPercent: number;
  disabled?: boolean;
}

const Focus: React.FC<FocusProps> = ({ className, focusPercent, disabled }) => {
  return (
    <div
      className={classNames(
        styles.bottomBlock,
        styles.focus,
        { [styles.disabled]: disabled },
        className
      )}
    >
      <div className={styles.bottomBlockLeft}>
        <h3 className={classNames("reset-title", styles.bottomBlockTitle)}>
          Фокус
        </h3>
        <span className={styles.bottomBlockCount}>{focusPercent}%</span>
      </div>
      <svg
        className={styles.bottomBlockIcon}
        width="115"
        height="115"
        viewBox="0 0 115 115"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M57.3158 111.632C87.3136 111.632 111.632 87.3136 111.632 57.3158C111.632 27.318 87.3136 3 57.3158 3C27.318 3 3 27.318 3 57.3158C3 87.3136 27.318 111.632 57.3158 111.632Z"
          stroke="#FFAE35"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M57.5 95C78.2107 95 95 78.2107 95 57.5C95 36.7893 78.2107 20 57.5 20C36.7893 20 20 36.7893 20 57.5C20 78.2107 36.7893 95 57.5 95Z"
          stroke="#FFAE35"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M57.5 78C68.8218 78 78 68.8218 78 57.5C78 46.1782 68.8218 37 57.5 37C46.1782 37 37 46.1782 37 57.5C37 68.8218 46.1782 78 57.5 78Z"
          stroke="#FFAE35"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

interface PauseProps {
  className?: string;
  pauseTime: number;
  disabled?: boolean;
}

const Pause: React.FC<PauseProps> = ({ className, pauseTime, disabled }) => {
  const formatedPauseTime = formatPauseTime(pauseTime);

  return (
    <div
      className={classNames(
        styles.bottomBlock,
        styles.pause,
        { [styles.disabled]: disabled },
        className
      )}
    >
      <div className={styles.bottomBlockLeft}>
        <h3 className={classNames("reset-title", styles.bottomBlockTitle)}>
          Время на паузе
        </h3>
        <span className={styles.bottomBlockCount}>{formatedPauseTime}</span>
      </div>
      <svg
        className={styles.bottomBlockIcon}
        width="129"
        height="129"
        viewBox="0 0 129 129"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M64.3158 118.632C94.3136 118.632 118.632 94.3136 118.632 64.3158C118.632 34.318 94.3136 10 64.3158 10C34.318 10 10 34.318 10 64.3158C10 94.3136 34.318 118.632 64.3158 118.632Z"
          stroke="#9C97D7"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M64.3154 37.1579V64.3158L77.8944 77.8947"
          stroke="#9C97D7"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

interface StopsProps {
  className?: string;
  stops: number;
  disabled?: boolean;
}

const Stops: React.FC<StopsProps> = ({
  className,
  stops,
  disabled = false,
}) => {
  return (
    <div
      className={classNames(
        styles.bottomBlock,
        styles.stops,
        { [styles.disabled]: disabled },
        className
      )}
    >
      <div className={styles.bottomBlockLeft}>
        <h3 className={classNames("reset-title", styles.bottomBlockTitle)}>
          Остановки
        </h3>
        <span className={styles.bottomBlockCount}>{stops}</span>
      </div>
      <svg
        className={styles.bottomBlockIcon}
        width="129"
        height="129"
        viewBox="0 0 129 129"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M64.3158 118.632C94.3136 118.632 118.632 94.3136 118.632 64.3158C118.632 34.318 94.3136 10 64.3158 10C34.318 10 10 34.318 10 64.3158C10 94.3136 34.318 118.632 64.3158 118.632Z"
          stroke="#7FC2D7"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M28 27L102 101"
          stroke="#7FC2D7"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export { Focus, Pause, Stops };
