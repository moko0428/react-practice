import React, { useEffect } from "react";

const User = ({ user, onRemove, onToggle }) => {
  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <div>
      <b
        style={{ cursor: "pointer", color: user.active ? "green" : "black" }}
        onClick={() => onToggle(user.id)}
      >
        {user.username}
      </b>
      &nbsp;
      <span>({user.email})</span>
      <button onClick={() => onRemove(user.id)}>삭제</button>
    </div>
  );
};
const UserList = ({ users, onRemove, onToggle }) => {
  return (
    <>
      <div>
        {users.map((user) => (
          <User
            user={user}
            key={user.id}
            onRemove={onRemove}
            onToggle={onToggle}
          />
        ))}
      </div>
    </>
  );
};
// 추가적으로, React.memo에서 두번째 파라미터에 propsAreEqual 이라는 함수를 사용하여 특정 값들만 비교를 하는 것도 가능하다.
// 하지만 잘못 사용한다면 오히려 의도치 않은 버그들이 발생하기 쉽다.
// ex) 함수형 업데이트로 전환을 안했는데, 이렇게 users만 비교를 하게 된다면 onToggle과 onRemove에서 최신 users 배열을 참조하지 않으므로 심각한 오류가 발생할 수 있다.
export default React.memo(
  UserList,
  (prevProps, nextProps) => prevProps.users === nextProps.users
);
