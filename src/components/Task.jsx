import styles from "./Task.module.css";

export function Task({ task, onAddTask, onEditTask, onDeleteTask }) {
  return (
    <>
      <div key={task.id} className={styles.task}>
        {task.content} - ({task.id})
        <div className={styles["btn-task-bar"]}>
          <span
            className={styles["btn-add"]}
            onClick={() => {
              onAddTask(task);
            }}
          >
            <svg
              className={styles.svgAdd}
              width="100"
              height="100"
              viewBox="0 0 100 100"
            >
              <line x1="0" y1="50" x2="100" y2="50" />
              <line x1="50" y1="0" x2="50" y2="100" />
            </svg>
          </span>
          <span
            className={styles["btn-edit"]}
            onClick={() => {
              onEditTask(task);
            }}
          ></span>
          <span
            className={styles["btn-delete"]}
            onClick={() => {
              onDeleteTask(task);
            }}
          >
            <svg
              className={styles.highlight}
              width="100"
              height="100"
              viewBox="0 0 100 100"
            >
              <line x1="0" y1="100" x2="100" y2="0" />
              <line x1="0" y1="0" x2="100" y2="100" />
            </svg>
          </span>
        </div>
      </div>
    </>
  );
}
