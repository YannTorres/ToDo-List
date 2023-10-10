import { PlusCircle } from "@phosphor-icons/react";
import { TasksList } from "./TasksList";
import styles from "./NewTask.module.css";
import { ChangeEvent, FormEvent, useState } from "react";

export function NewTask() {
  const [tasks, setTasks] = useState(["Acordar as 6h30min da manhã"]);
  const [countTaskState, setCountTaskState] = useState(0)
  const [textTasks, setTextTasks] = useState("");

  const taskCount = tasks.length;

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setTextTasks(event.target.value);
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();
    setTasks([...tasks, textTasks]);
    setTextTasks("");
  }

  function handleInvalidTask(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Esse campo não pode estar vazio.");
  }

  function countTaskConclued(activeButton: Boolean) {
    if (activeButton == true) {
      setCountTaskState(countTaskState - 1)
    } else if (activeButton == false) {
      setCountTaskState(countTaskState + 1)
    }
  }

  function deleteComment(taskToDelete: String) {
    const taskIndexToDelete = tasks.findIndex((task) => task === taskToDelete);

    if (taskIndexToDelete !== -1) {
      const taskIsCompleted = taskIndexToDelete < countTaskState;

      const tasksWithoutDeleteOne = tasks.filter((_, index) => index !== taskIndexToDelete);
      setTasks(tasksWithoutDeleteOne);

      if (taskIsCompleted) {
        setCountTaskState(countTaskState - 1);
      }
    }
  }

  return (
    <div>
      <form onSubmit={handleCreateNewTask} className={styles.newTask}>
        <input
          onChange={handleNewTaskChange}
          value={textTasks}
          className={styles.newTaskInput}
          type="text"
          placeholder="Adicione uma nova tarefa"
          onInvalid={handleInvalidTask}
          required
        />
        <button className={styles.newTaskButton} type="submit">
          <p className={styles.newTaskButtonText}>Criar</p>
          <PlusCircle size={20} weight="bold" />
        </button>
      </form>
      <div>
        <header className={styles.tasksHeader}>
          <p className={styles.tasksHeaderCreate}>
            Tarefas Criadas <span>{taskCount}</span>
          </p>
          <p className={styles.tasksHeaderCompleted}>
            Concluídas{" "}
            <span>
              {countTaskState} de {taskCount}
            </span>
          </p>
        </header>
        <main className={styles.tasksList}>
          {tasks.map((task) => {
            return (
              <TasksList
                key={task}
                content={task}
                onDeleteComment={deleteComment}
                onTaskConcluedCount={countTaskConclued}
              />
            );
          })}
        </main>
      </div>
    </div>
  );
}
