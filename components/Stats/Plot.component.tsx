import classNames from "classnames";
import styles from "../../styles/modules/stats/plot.module.scss";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import React, { useState } from "react";
import GenericList from "../../utils/react/GenericList";

const formatTime = (time: number) => {
  if (time == 0) {
    return "";
  }

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time - hours * 3600) / 60);
  const seconds = time - minutes * 60;
  let result = "";

  if (hours) {
    result += hours.toString() + " ч ";
  }

  if (minutes) {
    result += minutes.toString() + " мин";
  }

  if (!hours && !minutes && seconds) {
    result += seconds.toString() + " cек";
  }

  return result;
};

export type TWeekDay = "Пн" | "Вт" | "Ср" | "Чт" | "Пт" | "Сб" | "Вс";

export const days: TWeekDay[] = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

export interface IDay {
  day: TWeekDay;
  time: number;
}

interface PlotProps {
  className?: string;
  data: IDay[];
  onChooseDay: (index: number) => void;
  activeIndex: number;
}

const Plot: React.FC<PlotProps> = ({
  className,
  data = [],
  onChooseDay,
  activeIndex,
}) => {
  const handleClick = (_: any, index: number) => {
    onChooseDay(index);
  };

  const handleClickDay = (index: number) => {
    onChooseDay(index);
  };

  const daysList = days.map((item, index) => ({
    text: item,
    className: classNames(styles.daysItem, {
      [styles.active]: activeIndex == index,
    }),
    onClick: () => handleClickDay(index),
  }));

  return (
    <div className={classNames(styles.block, className)}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          barCategoryGap={16}
          margin={{
            top: 45,
            right: 0,
            left: 0,
            bottom: 0,
          }}
          style={{ backgroundColor: "#f4f4f4" }}
        >
          <XAxis hide={true} padding={{ left: 56, right: 56 }} />
          <YAxis
            width={109}
            tickMargin={25}
            axisLine={false}
            tickLine={false}
            fontSize={12}
            color="#333"
            tickCount={5}
            orientation="right"
            dataKey="time"
            tickFormatter={formatTime}
          />
          <CartesianGrid vertical={false} />
          <Bar dataKey="time" onClick={handleClick} minPointSize={5}>
            {data.map((entry, index) => (
              <Cell
                cursor="pointer"
                fill={
                  entry.time > 0
                    ? index === activeIndex
                      ? "#dc3e22"
                      : "#ea8a79"
                    : "#c4c4c4"
                }
                style={{ transition: "fill .2s ease-in-out" }}
                key={`cell-${index}`}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <ul className={classNames("reset-list", styles.days)}>
        <GenericList list={daysList} />
      </ul>
    </div>
  );
};

export default Plot;
