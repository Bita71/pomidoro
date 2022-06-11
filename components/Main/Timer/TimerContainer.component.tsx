import { useEffect, useState } from "react";
import { Timer } from "../..";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHooks";
import { addTask, deleteTask, editDay } from "../../../store/tasks";
import formatDate from "../../../utils/ts/formatDate";

interface TimerContainer {
  className?: string;
}

const initialTime = 60 * 0.2;
const breakTime = 60 * 0.2;
const bigBreakTime = 60 * 15;

export type TStatuses =
  | "default"
  | "work"
  | "work_pause"
  | "break"
  | "break_pause";

const TimerContainer: React.FC<TimerContainer> = ({ className }) => {
  const { tasks, hystory } = useAppSelector((store) => store.tasks);
  const dispatch = useAppDispatch();
  const [time, setTime] = useState(0);
  const [pomodor, setPomodor] = useState(0);
  const [defaultTime, setDefaultTime] = useState(initialTime);
  const [isAward, setIsAward] = useState(true);
  const [status, setStatus] = useState<TStatuses>("default");
  const [timer, setTimer] = useState(null);
  const [pauseStart, setPauseStart] = useState(Date.now());
  const task = tasks[0] || null;
  const taskNumber = (hystory[formatDate()]?.tasks || 0) + 1;
  const taskName = task ? task.name : "Нет задачи";

  function startTimer() {
    if (timer) {
      return;
    }
    setTimer(
      setInterval(() => {
        setTime((prevState) => prevState - 1);
      }, 1000)
    );
  }

  function stopTimer() {
    if (!timer) {
      return;
    }
    clearInterval(timer);
    setTimer(null);
  }

  useEffect(() => {
    if (!task) {
      setTime(0);
      setPomodor(0);
      clearInterval(timer);
      setStatus("default");
      return;
    }
    setTime(initialTime);
    stopTimer();
    setPomodor(1);
    setStatus("default");
  }, [task]);

  useEffect(() => {
    if (time <= 0) {
      stopTimer();
      switch (status) {
        case "work":
          dispatch(
            editDay({
              focus: defaultTime,
            })
          );
          if (taskNumber % 4 == 0) {
            setTime(bigBreakTime);
          } else {
            setTime(breakTime);
          }
          setStatus("break");
          break;
        case "break":
          dispatch(
            editDay({
              break: breakTime,
              pomodoro: Number(isAward),
              tasks: Number(task.pomodoro === pomodor),
            })
          );
          if (task.pomodoro === pomodor) {
            dispatch(deleteTask({ id: task.id }));
          } else {
            setPomodor((prevState) => prevState + 1);
          }
          setStatus("default");
          break;
      }
    }
  }, [time]);

  useEffect(() => {
    if (!task) {
      return;
    }
    switch (status) {
      case "work":
        startTimer();
        break;
      case "work_pause":
        stopTimer();
        setIsAward(false);
        break;
      case "break":
        startTimer();
        break;
      case "break_pause":
        stopTimer();
        break;
      case "default":
        setTime(initialTime);
        setIsAward(true);
        stopTimer();
        break;
    }

    return () => stopTimer();
  }, [status]);

  const handleAddTime = () => {
    if (!task || status !== "default" || defaultTime === 60 * 60) {
      return;
    }
    setDefaultTime((prevState) => prevState + 60);
    setTime((prevState) => prevState + 60);
  };
  const handleStart = () => {
    if (!task) {
      return;
    }

    switch (status) {
      case "default":
        setStatus("work");
        break;
      case "work":
        setStatus("work_pause");
        setPauseStart(Date.now());
        break;
      case "work_pause":
        dispatch(
          editDay({ pause: Math.round((Date.now() - pauseStart) / 1000) })
        );
        setStatus("work");
        break;
      case "break":
        setStatus("break_pause");
        setPauseStart(Date.now());
        break;
      case "break_pause":
        setStatus("break");
        dispatch(
          editDay({ pause: Math.round((Date.now() - pauseStart) / 1000) })
        );
        break;
    }
  };

  const handleStop = () => {
    if (!task) {
      return;
    }

    switch (status) {
      case "work":
        dispatch(editDay({ stops: 1 }));
        setStatus("default");
        break;
      case "work_pause":
        dispatch(
          editDay({
            pause: Math.round((Date.now() - pauseStart) / 1000),
            focus: defaultTime - time,
          })
        );
        setPomodor(task.pomodoro);
        setStatus("break");
        if (taskNumber % 4 == 0) {
          setTime(bigBreakTime);
        } else {
          setTime(breakTime);
        }
        break;
      case "break":
        dispatch(
          editDay({
            break: taskNumber % 4 == 0 ? bigBreakTime - time : breakTime - time,
            pomodoro: Number(isAward),
            tasks: Number(task.pomodoro === pomodor),
          })
        );
        if (task.pomodoro === pomodor) {
          dispatch(deleteTask({ id: task.id }));
        } else {
          setPomodor((prevState) => prevState + 1);
        }
        setStatus("default");
        break;
      case "break_pause":
        dispatch(
          editDay({
            break: taskNumber % 4 == 0 ? bigBreakTime - time : breakTime - time,
            pomodoro: Number(isAward),
            tasks: Number(task.pomodoro === pomodor),
            pause: Math.round((Date.now() - pauseStart) / 1000),
          })
        );
        if (task.pomodoro === pomodor) {
          dispatch(deleteTask({ id: task.id }));
        } else {
          setPomodor((prevState) => prevState + 1);
        }
        setStatus("default");
        break;
    }
  };
  return (
    <Timer
      className={className}
      taskName={taskName}
      time={time}
      status={status}
      pomodor={pomodor}
      taskNumber={taskNumber}
      onAddTime={handleAddTime}
      onStart={handleStart}
      onStop={handleStop}
    />
  );
};
export default TimerContainer;
