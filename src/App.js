import React, { useReducer, useCallback, useMemo } from "react";
import UserList from "./UserList";
import CreateUser from "./CreateUser";

//리액트 개발할 땐 useCallback, useMemo, React.memo는 컴포넌트의 성능을 실제로 개선할 수 있는 상황에서만 사용.
// ex) User 컴포넌트에 b와 button에 onClick 으로 설정해준 함수들은 해당 함수들을 useCallback으로 재사용한다고 해서 리렌더링을 막을 수 있는 것은 아니므로, 굳이 그렇게 할 필요는 없다.
// 렌더링 최적화를 하지 않을 컴포넌트에 React.memo를 사용하는 것은, 불필요한 props 비교만 하는 것이기 때문에 실제로 렌더링을 방지할 수 있는 상황이 있는 경우에만 사용 권장.

const countActiveUsers = (users) => {
  console.log("활성 사용자 수를 세는중 ...");
  return users.filter((user) => user.active).length;
};

const initialState = {
  inputs: {
    username: "",
    email: "",
  },
  users: [
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
  ],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value,
        },
      };
    case "CREATE_USER":
      return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user),
      };
    case "TOGGLE_USER":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.id ? { ...user, active: !user.active } : user
        ),
      };
    case "REMOVE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.id),
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { users } = state;
  const { username, email } = state.inputs;

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({
      type: "CHANGE_INPUT",
      name,
      value,
    });
  }, []);
  const onCreate = useCallback(
    (nextId) => {
      dispatch({
        type: "CREATE_USER",
        user: {
          id: nextId.current,
          username,
          email,
        },
      });
      nextId.current += 1;
    },
    [username, email]
  );

  const onToggle = useCallback((id) => {
    dispatch({
      type: "TOGGLE_USER",
      id,
    });
  }, []);

  const onRemove = useCallback((id) => {
    dispatch({
      type: "REMOVE_USER",
      id,
    });
  }, []);

  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onToggle={onToggle} onRemove={onRemove} />
      <div>활성사용자 수 : {count}</div>
    </>
  );
};

export default App;
