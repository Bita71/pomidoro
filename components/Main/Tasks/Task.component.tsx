import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import styles from "../../../styles/modules/main/tasks/task.module.scss";
import TasksMenu from "./TasksMenu.component";
import { Input } from "../..";
import { editTaskName, ITask } from "../../../store/tasks";
import { useAppDispatch } from "../../../hooks/storeHooks";

type TTaskProps = Pick<ITask, "id" | "name" | "pomodoro">;

const Task: React.FC<TTaskProps> = ({ id, name, pomodoro }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [value, setValue] = useState(name);
  const [error, setError] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const handleClickEdit = () => {
    setIsEditOpen(true);
    if (ref && ref.current) {
      ref.current.focus();
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimedValue = value.trim();
    if (!trimedValue) {
      setError("Название задачи не может быть пустым");
      return;
    }
    setError("");
    setIsEditOpen(false);
    dispatch(editTaskName({ id, name: trimedValue }));
  };

  return (
    <div className={styles.task}>
      <span className={styles.pomodoro}>{pomodoro}</span>
      {isEditOpen ? (
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            ref={ref}
            type="text"
            placeholder="Название задачи"
            value={value}
            classInput={styles.input}
            onChange={handleChange}
            error={error}
          />
        </form>
      ) : (
        <span className={styles.text}>{name}</span>
      )}
      <TasksMenu
        className={styles.menu}
        task={{ id, pomodoro }}
        onClickEdit={handleClickEdit}
      />
    </div>
  );
};

export default Task;
