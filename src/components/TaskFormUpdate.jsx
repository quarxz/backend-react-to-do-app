import { useState } from "react";
import styles from "./TaskForm.module.css";

export function TaskFormUpdate({ test, onEditTask }) {
  const [todo, setTodo] = useState(test.content);
  const [isButtonDisabled, setButtonDisabled] = useState(true);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onEditTask({
            id: test.id,
            name: test.name,
            content: todo,
          });
        }}
      >
        <input
          value={todo}
          onChange={(e) => {
            setTodo(e.target.value);
            e.target.value.length > 0
              ? setButtonDisabled(false)
              : setButtonDisabled(true);
          }}
          type="text"
          name="todo"
          id="todo"
        />
        <button
          type="submit"
          className={styles["btn-add-todo"]}
          disabled={isButtonDisabled && isButtonDisabled}
        >
          Update
        </button>
      </form>
    </>
  );
}
