import styles from "./UserSelect.module.css";

export function UserSelect({ users, onClickUserButton }) {
  function handleClickUserButton(e) {
    const userName = e.target.value;
    onClickUserButton(userName);
    console.log(e.target);
  }
  return (
    <>
      <div className={styles["user-button-bar"]}>
        <select
          className={styles["user-select"]}
          onChange={handleClickUserButton}
        >
          <option>-</option>
          {users
            .sort(function compareNumbers(a, b) {
              return a.id - b.id;
            })
            .slice()
            .map((user) => {
              return (
                <option
                  className={styles["user-button"]}
                  key={user.id}
                  type="text"
                  value={user.name}
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
