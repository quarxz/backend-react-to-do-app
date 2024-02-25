import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./App.module.css";

import { UserButton } from "./components/UserButton";
import { Task } from "./components/Task";

function App() {
  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState();

  async function handleClickUserButton(name) {
    const response = await axios.get(
      `https://backend-node-js-routes.onrender.com/` + name
    );
    console.log(response.data);
    setTasks(response.data);
  }

  useEffect(() => {
    async function loadData(params) {
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
    loadData();
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
        <h1>App</h1>
        {isloading ? (
          <span className="loader"></span>
        ) : (
          <>
            <UserButton
              users={users}
              onClickUserButton={(name) => {
                handleClickUserButton(name);
              }}
            />
            {tasks ? <Task tasks={tasks} /> : "Kein Task vorhanden"}
          </>
        )}
      </section>
    </main>
  );
}

export default App;
