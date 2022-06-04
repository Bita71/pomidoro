import classNames from "classnames";
import { ChangeEvent, FormEvent, useState } from "react";
import { Button, Input } from "..";
import { useAppDispatch } from "../../hooks/storeHooks";
import { addTask } from "../../store/tasks";
import styles from "../../styles/modules/main/addtast.module.scss";

interface AddTaskProps {
  className?: string;
}

const AddTask: React.FC<AddTaskProps> = ({ className }) => {
  const dispatch = useAppDispatch();

  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setError("");
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimedValue = value.trim();
    if (!trimedValue) {
      setError("Название задачи не может быть пустым");
      return;
    }
    dispatch(addTask({ name: value }));
    setError("");
    setValue("");
  };

  return (
    <form
      className={classNames(styles.form, className)}
      onSubmit={handleSubmit}
    >
      <Input
        type="text"
        value={value}
        onChange={handleChange}
        classLabel={styles.label}
        classInput={styles.input}
        classError={styles.error}
        placeholder="Название задачи"
        error={error}
      />
      <Button className={styles.button} type="submit">
        Добавить
      </Button>
    </form>
  );
};

export default AddTask;
