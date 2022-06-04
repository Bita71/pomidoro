import React, { useEffect, useState } from "react";
import Plus from "../../../public/asset/icons/plus_circle.svg";
import Delete from "../../../public/asset/icons/delete.svg";
import Edit from "../../../public/asset/icons/edit.svg";
import Image from "next/image";
import GenericList from "../../../utils/react/GenericList";
import styles from "../../../styles/modules/main/tasks/tasksmenu.module.scss";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHooks";
import {
  decreasePomodoro,
  deleteTask,
  increasePomodoro,
  ITask,
} from "../../../store/tasks";

interface TasksMenuProps {
  task: Pick<ITask, "id" | "pomodoro">;
  onClickEdit: () => void;
  className?: string;
}

const TasksMenu: React.FC<TasksMenuProps> = ({
  onClickEdit,
  task: { id, pomodoro },
  className,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useAppDispatch();
  const handleIncrease = () => dispatch(increasePomodoro({ id }));
  const handleDecrease = () => dispatch(decreasePomodoro({ id }));
  const handleDelete = () => {
    dispatch(deleteTask({ id }));
  };
  const handleClick = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };
  useEffect(() => {
    if (!isDropdownOpen) {
      return;
    }

    function close() {
      setIsDropdownOpen(false);
    }

    window.addEventListener("click", close);
    
    return () => {
      window.removeEventListener("click", close);
    };
  }, [isDropdownOpen]);
  
  const menuList = [
    {
      Icon: () => <Image src={Plus} width={18} height={18} />,
      text: "Увеличить",
      onClick: handleIncrease,
    },
    {
      Icon: () => (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 1.5C4.8675 1.5 1.5 4.8675 1.5 9C1.5 13.1325 4.8675 16.5 9 16.5C13.1325 16.5 16.5 13.1325 16.5 9C16.5 4.8675 13.1325 1.5 9 1.5ZM9 15C5.6925 15 3 12.3075 3 9C3 5.6925 5.6925 3 9 3C12.3075 3 15 5.6925 15 9C15 12.3075 12.3075 15 9 15Z"
            fill="#A8B64F"
          />
          <path
            d="M5.25 8.25H8.25H9.75H12.75V9.75H9.75H8.25H5.25V8.25Z"
            fill="#A8B64F"
          />
        </svg>
      ),
      text: "Уменьшить",
      onClick: handleDecrease,
      disabled: pomodoro === 1,
    },
    {
      Icon: () => <Image src={Edit} width={18} height={18} />,
      text: "Редактировать",
      onClick: onClickEdit,
    },
    {
      Icon: () => <Image src={Delete} width={18} height={18} />,
      text: "Удалить",
      onClick: handleDelete,
    },
  ].map(({ Icon, text, onClick, disabled }) => ({
    text: (
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={classNames("reset-button", styles.buttonItem)}
      >
        <Icon />
        <span className={styles.text}>{text}</span>
      </button>
    ),
  }));

  return (
    <div className={classNames(styles.menu, className)}>
      <button
        type="button"
        className={classNames("reset-button", styles.button)}
        onClick={handleClick}
      />
      {isDropdownOpen && (
        <div className={styles.dropdown}>
          <ul className={classNames("reset-list", styles.list)}>
            <GenericList list={menuList} />
          </ul>
        </div>
      )}
    </div>
  );
};

export default TasksMenu;
