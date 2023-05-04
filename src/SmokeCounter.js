import React, { useState } from "react";

const SmokeCounter = () => {
  const [count, setCount] = useState(0);
  const [day, setDay] = useState("");

  const onIncreament = () => {
    setCount((prev) => (prev += 1));
    onDate();
  };
  const onDecreament = () => {
    setCount((prev) => (prev -= 1));
  };
  const onDate = () => {
    let date = new Date();
    setDay(
      `${date.getFullYear()}년 ${
        date.getMonth() + 1
      }월 ${date.getDay()}일 ${date.getHours()}시 ${date.getMinutes()}분`
    );
  };

  return (
    <div>
      <h2>{count}</h2>
      <button onClick={onIncreament}>+</button>
      <button onClick={onDecreament}>-</button>
      <h3>{`${day} : ${count}개비`}</h3>
    </div>
  );
};

export default SmokeCounter;
