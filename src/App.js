import React, { useCallback, useMemo, useRef, useState } from "react";
import UserList from "./UserList";
import CreateUser from "./CreateUser";

//리액트 개발할 땐 useCallback, useMemo, React.memo는 컴포넌트의 성능을 실제로 개선할 수 있는 상황에서만 사용.
// ex) User 컴포넌트에 b와 button에 onClick 으로 설정해준 함수들은 해당 함수들을 useCallback으로 재사용한다고 해서 리렌더링을 막을 수 있는 것은 아니므로, 굳이 그렇게 할 필요는 없다.
// 렌더링 최적화를 하지 않을 컴포넌트에 React.memo를 사용하는 것은, 불필요한 props 비교만 하는 것이기 때문에 실제로 렌더링을 방지할 수 있는 상황이 있는 경우에만 사용 권장.

const countActiveUsers = (users) => {
  console.log("활성 사용자 수를 세는중 ...");
  return users.filter((user) => user.active).length;
};

function App() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
  });
  const { username, email } = inputs;

  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setInputs({
        ...inputs,
        [name]: value,
      });
    },
    [inputs]
  );

  const [users, setUsers] = useState([
    {
      id: 1,
      username: "lee",
      email: "public@gmail.com",
      active: true,
    },
    {
      id: 2,
      username: "park",
      email: "park@gmail.com",
      active: false,
    },
    {
      id: 3,
      username: "lim",
      email: "lim@gmail.com",
      active: true,
    },
  ]);
  const nextId = useRef(4);

  const onCreate = useCallback(() => {
    const user = {
      id: nextId.current,
      username,
      email,
    };
    setUsers((users) => users.concat(user));

    setInputs({
      username: "",
      email: "",
    });
    nextId.current += 1;
  }, [username, email]);

  const onRemove = useCallback(
    (id) => {
      //user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
      // = user.id 가 id 인 것을 제거함
      setUsers(users.filter((user) => user.id !== id));
    },
    [users]
  );
  const onToggle = useCallback(
    (id) => {
      setUsers(
        users.map((user) =>
          user.id === id ? { ...user, active: !user.active } : user
        )
      );
    },
    [users]
  );
  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
      <div>활성사용자 수 : {count}</div>
    </>
  );
}

export default App;
