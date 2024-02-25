import styles from "./UserSelect.module.css";

export function UserSelect({ users, onClickUserButton }) {
  function handleClickUserButton(e) {
    const userName = e.target.value;
    onClickUserButton(userName);
  }
  return (
    <>
      <div className={styles["user-button-bar"]}>
        <select className={styles["user-select"]}>
          {users.map((user) => {
            return (
              <option
                className={styles["user-button"]}
                key={user.id}
                type="text"
                value={user.name}
                onChange={handleClickUserButton}
              >
                {user.name}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
}
