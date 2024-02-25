import styles from "./UserButton.module.css";

export function UserButton({ users, onClickUserButton }) {
  function handleClickUserButton(e) {
    const userName = e.target.value;
    onClickUserButton(userName);
  }
  return (
    <>
      <div className={styles["user-button-bar"]}>
        {users.map((user) => {
          return (
            <button
              className={styles["user-button"]}
              key={user.id}
              type="text"
              value={user.name}
              onClick={handleClickUserButton}
            >
              {user.name}
            </button>
          );
        })}
      </div>
    </>
  );
}
