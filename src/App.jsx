import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import styles from "./App.module.css";

import { UserButton } from "./components/UserButton";
import { UserSelect } from "./components/UserSelect";
import { Task } from "./components/Task";
import { TaskForm } from "./components/TaskForm";
import { TaskFormUpdate } from "./components/TaskFormUpdate";

function App() {
  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [tasks, setTasks] = useState();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFormUpdateOpen, setIsFormUpdateOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [serverInfo, setServerInfo] = useState("");

  const [taskToEdit, setTaskToEdit] = useState();

  const url = "https://backend-node-js-routes.onrender.com";
  // const url = "https://backend-mongoos-notes-taking-app.onrender.com";

  async function handleClickUserButton(name) {
    console.log("handleClickUserButton:", name);
    const { data } = await axios.get(`${url}/${name}`);
    console.log(data);

    setTasks(data);

    setSelectedUser(name);
  }

  async function setServerInfoFn(data) {
    setServerInfo((prevServerInfo) => (prevServerInfo = data));
    setTimeout(() => {
      setServerInfo("");
    }, 5000);
  }

  async function handleAddTask(task) {
    console.log("handleAddTask:", task);
    console.log("handleAddTasks:", tasks);
    const { data } = await axios.post(`${url}/${tasks[0].name}`, {
      headers: {
        "Content-Type": "application/json",
      },
      content: task.content,
    });

    handleClickUserButton(tasks[0].name);
    setIsFormOpen((prevIsFormOpen) => !prevIsFormOpen);
    setServerInfoFn(data.message);
  }

  async function handleEditTask(task) {
    console.log("handleEditTask:", task);

    setTaskToEdit(task);
    console.log(taskToEdit);

    if (isEditMode) {
      console.log(taskToEdit);
      console.log(taskToEdit.name);
      console.log(taskToEdit.id);
      console.log(task.content);
      const { data } = await axios.put(`${url}/${taskToEdit.name}/${taskToEdit.id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        content: task.content,
      });

      console.log(data);
      setServerInfoFn(data.message);
      setTasks(
        tasks.map((task) => (taskToEdit.id == task.id ? { ...task, content: task.content } : task))
      );
      console.log(tasks);
      handleClickUserButton(taskToEdit.name);

      setIsEditMode(false);

      // console.log([{ ...taskToEdit, content: task.content }]);
      // setTasks([{ ...taskToEdit, content: task.content }, ...tasks]);
    }

    setIsFormUpdateOpen((prevIsFormUdateOpen) => !prevIsFormUdateOpen);
  }

  async function handleDeleteTask(task) {
    console.log("handleDeleteTask:", task);
    const { data } = await axios.delete(`${url}/${task.name}/${task.id}`);
    setTasks(
      tasks.filter((item) => {
        return item.id !== task.id;
      })
    );
    setServerInfoFn(data.message);
  }

  useEffect(() => {
    async function loadUsers(params) {
      console.log("Load Data");
      try {
        setIsLoading(true);
        const response = await axios.get(`${url}`);
        console.log(response.data);
        console.log(response.status);
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
        <h1>ToDo's App</h1>

        {isloading ? (
          <span className="loader"></span>
        ) : (
          <>
            <UserSelect
              data={data}
              users={users}
              defaultUser={selectedUser ? selectedUser : ""}
              onClickUserButton={(name) => {
                handleClickUserButton(name);
              }}
            />
            {/* {
              <UserButton
                users={users}
                onClickUserButton={(name) => {
                  handleClickUserButton(name);
                }}
              />
            } */}
            {tasks ? (
              <>
                <button
                  className={styles["btn-add-todo"]}
                  onClick={() => {
                    // setIsFormOpen((prevIsFormOpen) => !prevIsFormOpen);
                    isFormUpdateOpen
                      ? setIsFormUpdateOpen((prevIsFormUdateOpen) => !prevIsFormUdateOpen)
                      : undefined;
                    !isFormUpdateOpen
                      ? setIsFormOpen((prevIsFormOpen) => !prevIsFormOpen)
                      : undefined;
                    setIsEditMode(false);
                  }}
                >
                  {isFormOpen || isFormUpdateOpen ? "Cancel" : "Add Todo"}
                </button>

                {isFormOpen ? <TaskForm onAddTask={handleAddTask} /> : <></>}
                {isFormUpdateOpen ? (
                  <TaskFormUpdate onEditTask={handleEditTask} test={taskToEdit} />
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
                        setIsEditMode(true);
                      }}
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
            {serverInfo ? <p className={styles["server-info"]}>{serverInfo}</p> : <p></p>}
          </>
        )}
      </section>
    </main>
  );
}

export default App;
