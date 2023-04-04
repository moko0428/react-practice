import React from "react";

const User = ({ user }) => {
  return (
    <div>
      <b>{user.username}</b>
      <span>({user.email})</span>
    </div>
  );
};
const UserList = () => {
  const users = [
    {
      id: 1,
      username: "lee",
      email: "public@gmail.com",
    },
    {
      id: 2,
      username: "park",
      email: "park@gmail.com",
    },
    {
      id: 3,
      username: "lim",
      email: "lim@gmail.com",
    },
  ];

  return (
    <>
      <div>
        {users.map((user, index) => (
          <User user={user} key={index} />
        ))}
      </div>
    </>
  );
};

export default UserList;
