import { Trash } from "@phosphor-icons/react";
import styles from "./TasksList.module.css";
import { useState } from "react";

interface TaskProps {
  content: String;
  onDeleteComment: (commentToDelete: String) => void;
  onTaskConcluedCount: (activeButton: Boolean) => void;

}

export function TasksList({
  content,
  onDeleteComment,
  onTaskConcluedCount
}: TaskProps) {

  const [activeButton, setActiveButton] = useState(false);

  function handleDeleteTask() {
    onDeleteComment(content);
  }

  const handleButtonClick = () => {
    setActiveButton(!activeButton)
    onTaskConcluedCount(activeButton)
  }

  return (
    <div className={styles.tasks}>
      <input
        onClick={handleButtonClick}
        type="checkbox"
        className={`${styles.tasksButtonCheck} ${activeButton ? styles.tasksButtonCheckPress : styles.tasksButtonCheck}`}
      ></input>
      <p className={styles.tasksText}>{content}</p>
      <button onClick={handleDeleteTask} className={styles.tasksButtonTrash}>
        <Trash className={styles.tasksTrash} size={20} />
      </button>
    </div>
  );
}
