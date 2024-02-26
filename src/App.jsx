import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./App.module.css";

import { UserButton } from "./components/UserButton";
import { UserSelect } from "./components/UserSelect";
import { Task } from "./components/Task";
import { TaskForm } from "./components/TaskForm";

function App() {
  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState();
  const [isFormOpen, setIsFormOpen] = useState(false);

  async function handleClickUserButton(name) {
    const response = await axios.get(
      `https://backend-node-js-routes.onrender.com/` + name
    );
    console.log(response.data);
    setTasks(response.data);
  }

  async function handleAddTask(task) {
    const { data } = await axios.post(
      "https://backend-node-js-routes.onrender.com/" + tasks[0].name,
      {
        headers: {
          "Content-Type": "application/json",
        },
        content: task.content,
      }
    );
    console.log(data);
    console.log(task.content);

    setIsFormOpen((prevIsFormOpen) => !prevIsFormOpen);
  }
  async function handleEditTask(task) {
    console.log(task);
  }
  async function handleDeleteTask(task) {
    console.log(task);
    // const id = task.id;
    // const name = task.name;
    // const response = await axios.get(
    //   `delete https://backend-node-js-routes.onrender.com/${name}/(${id})`
    // );
    setTasks(
      tasks.filter((item) => {
        return item.id !== task.id;
      })
    );
  }

  useEffect(() => {
    async function loadUsers(params) {
      console.log("Load Data");
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://backend-node-js-routes.onrender.com`
        );
        console.log(response.data);
        setUsers(response.data);
      } catch (err) {
        setIsError(true);
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadUsers();
  }, []);

  if (isError) {
    return (
      <>
        <h1>Componet Livecycle</h1>
        <p>oops - an error appeared!</p>
      </>
    );
  }

  return (
    <main>
      <section className={styles.card}>
        <h1>ToDo</h1>

        {isloading ? (
          <span className="loader"></span>
        ) : (
          <>
            <UserSelect
              users={users}
              onClickUserButton={(name) => {
                handleClickUserButton(name);
              }}
            />
            {/* <UserButton
              users={users}
              onClickUserButton={(name) => {
                handleClickUserButton(name);
              }}
            /> */}
            {tasks ? (
              <>
                <button
                  className={styles["btn-add-todo"]}
                  onClick={() => {
                    setIsFormOpen((prevIsFormOpen) => !prevIsFormOpen);
                  }}
                >
                  {isFormOpen ? "Cancel" : "Add Todo"}
                </button>

                {isFormOpen ? (
                  <TaskForm onAddTask={handleAddTask} />
                ) : (
                  <></>
                )}
                {tasks.map((task) => {
                  return (
                    <Task
                      key={task.id}
                      task={task}
                      onEditTask={(task) => {
                        handleEditTask(task);
                      }}
                      onDeleteTask={(task) => {
                        handleDeleteTask(task);
                      }}
                    />
                  );
                })}
              </>
            ) : undefined}
          </>
        )}
      </section>
    </main>
  );
}

export default App;
