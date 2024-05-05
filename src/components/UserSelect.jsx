import styles from "./UserSelect.module.css";

export function UserSelect({ data, users, onClickUserButton, defaultUser }) {
  function handleClickUserButton(e) {
    const userName = e.target.value;
    onClickUserButton(userName);
  }

  // console.log(users);

  const test = (data) => {
    data.map((item) => {
      // console.log(item.user.name);
      console.log(item);
    });
  };
  test(data);

  return (
    <>
      <div className={styles["user-button-bar"]}>
        <select
          className={styles["user-select"]}
          onChange={handleClickUserButton}
          defaultValue={defaultUser}
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
