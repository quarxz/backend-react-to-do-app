import { useState, useEffect, Fragment } from "react";
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

  const [serverInfo, setServerInfo] = useState("");

  const [handledTask, setHandledTask] = useState("I´m in action");

  const [taskIdToEdit, setTaskIdToEdit] = useState("");
  const [updatedNote, setUpdatedNote] = useState("");

  async function handleClickUserButton(name) {
    console.log("handleClickUserButton:", name);
    const response = await axios.get(
      `https://backend-node-js-routes.onrender.com/` + name
    );
    console.log(response.data);
    setTasks(response.data);

    setHandledTask("Selected User: " + name);
  }

  async function setServerInfoFn(data) {
    setServerInfo((prevServerInfo) => (prevServerInfo = data));
    setTimeout(() => {
      setServerInfo("");
    }, 5000);
  }

  async function handleAddTask(task) {
    console.log("handleAddTask:", task);
    setTaskIdToEdit(task.id);
    const { data } = await axios.post(
      "https://backend-node-js-routes.onrender.com/" + tasks[0].name,
      {
        headers: {
          "Content-Type": "application/json",
        },
        content: task.content,
      }
    );

    // console.log(data);
    console.log(task);
    console.log(tasks[0].name);
    console.log(task.name);
    console.log(task.content);

    setIsFormOpen((prevIsFormOpen) => !prevIsFormOpen);
    // setServerInfoFn(data);
    setHandledTask("Added new Note");
  }

  async function handleEditTask(task) {
    console.log("handleEditTask:", task);
    // console.log(task);
    // console.log(tasks.id);
    // console.log(tasks.name);
    // console.log(task.content);
    // const { data } = await axios.put(
    //   `https://backend-node-js-routes.onrender.com/${task.name}/${task.id}`,
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     content: task.content,
    //   }
    // );
    // setIsFormOpen((prevIsFormOpen) => !prevIsFormOpen);
    // setServerInfoFn(data);
    setHandledTask("Edited Task");
  }

  async function handleDeleteTask(task) {
    console.log("handleDeleteTask:", task);
    const { data } = await axios.delete(
      `https://backend-node-js-routes.onrender.com/${task.name}/${task.id}`
    );
    setTasks(
      tasks.filter((item) => {
        return item.id !== task.id;
      })
    );
    setServerInfoFn(data.message);
    setHandledTask("Deleted Task");
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
        setHandledTask("All Users are loaded");
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
        <span>{handledTask}</span>

        {isloading ? (
          <span className="loader"></span>
        ) : (
          <>
            <UserSelect
              users={users}
              defaultUser={""}
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
                      onAddTask={(task) => {
                        handleAddTask(task);
                      }}
                      onDeleteTask={(task) => {
                        handleDeleteTask(task);
                      }}
                    />
                  );
                })}
              </>
            ) : undefined}
            {serverInfo ? (
              <p className={styles["server-info"]}>{serverInfo}</p>
            ) : (
              <p></p>
            )}
          </>
        )}
      </section>
    </main>
  );
}

export default App;
