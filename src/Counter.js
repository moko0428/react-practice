import React, { useState } from "react";

const Counter = () => {
  const [number, setNumber] = useState(0);
  const inCrease = () => {
    setNumber((prevNumber) => prevNumber + 1);
  };
  const deCrease = () => {
    setNumber((prevNumber) => prevNumber - 1);
  };
  return (
    <div>
      <h1>{number}</h1>
      <button onClick={inCrease}>+1</button>
      <button onClick={deCrease}>-1</button>
    </div>
  );
};

export default Counter;
