import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/storeHooks";
import styles from "../../styles/modules/stats/analysis.module.scss";
import formatDate from "../../utils/ts/formatDate";
import { Focus, Pause, Stops } from "./BottomBlocks.component";
import Day from "./Day.components";
import { IDay as IHystory } from "../../store/tasks";
import Plot, { days, IDay as IPlotDay, TWeekDay } from "./Plot.component";
import Pomodoro from "./Pomodoro.component";
import { useRouter } from "next/router";

interface IData {
  day: TWeekDay;
  hystory: IHystory;
}

const Analysis: React.FC = () => {
  const { hystory } = useAppSelector((state) => state.tasks);
  const router = useRouter();
  const { week, number } = router.query;
  const [chosenWeekNumber, setChosenWeekNumber] = useState(0);
  const [chosenDay, setChosenDay] = useState(hystory[formatDate(Date.now())])
  const today = new Date();
  const weekDay = today.getDay() != 0 ? today.getDay() - 1 : 7;
  const [chosenWeekDay, setChosenWeekDay] = useState(weekDay)
  const data: IData[] = [];
  const allTime = chosenDay?.focus + chosenDay?.break + chosenDay?.pause;
  const focusPercent = allTime > 0 ? Math.round((chosenDay?.focus / allTime) * 100) : 0;

  for (let i = 0; i < 7; i++) {
    const date = formatDate(
      Number(today) + (i - weekDay - chosenWeekNumber * 7) * 24 * 60 * 60 * 1000
    );
    if (hystory[date]) {
      data.push({ day: days[i], hystory: hystory[date] });
    } else {
      data.push({ day: days[i], hystory: null });
    }
  }

  const plotData: IPlotDay[] = data.map(({ day, hystory }) => {
    const time = hystory ? hystory.focus + hystory.break + hystory.pause : 0;
    return { day: day, time: time };
  });

  useEffect(() => {
    setChosenWeekNumber(week ? (number ? Number(number) : 1) : 0);
  }, [router.query]);

  useEffect(() => {
    if(chosenWeekNumber == 0) {
      setChosenDay(data[weekDay].hystory)
      setChosenWeekDay(weekDay)
      return
    }
    setChosenDay(data[0].hystory)
    setChosenWeekDay(0)
  }, [chosenWeekNumber]);


  const handleChooseDay = (index: number) => {
    setChosenDay(data[index].hystory)
    setChosenWeekDay(index)
  }
  
  return (
    <div className={classNames(styles.block)}>
      <Day weekDay={chosenWeekDay} className={styles.day} time={chosenDay?.focus ?? 0} />
      <Pomodoro
        className={styles.pomodoro}
        pomodoro={chosenDay?.pomodoro ?? 0}
      />
      <Plot activeIndex={chosenWeekDay} className={styles.plot} data={plotData} onChooseDay={handleChooseDay} />
      <Focus
        className={styles.bottomBlock}
        disabled={!chosenDay}
        focusPercent={focusPercent}
      />
      <Pause
        className={styles.bottomBlock}
        disabled={!chosenDay}
        pauseTime={chosenDay?.pause ?? 0}
      />
      <Stops
        className={styles.bottomBlock}
        disabled={!chosenDay}
        stops={chosenDay?.stops ?? 0}
      />
    </div>
  );
};

export default Analysis;
