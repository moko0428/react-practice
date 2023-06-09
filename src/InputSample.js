import React, { useRef, useState } from "react";

const InputSample = () => {
  const [inputs, setInputs] = useState({
    name: "",
    nickName: "",
  });
  const nameInput = useRef();
  const { name, nickName } = inputs; //비구조화 할당을 통해 값을 추출

  const onChange = (e) => {
    const { value, name } = e.target; //우선 e.target에서 name 과 value를 추출
    setInputs({
      ...inputs, //기존의 input 객체를 복사한 뒤
      [name]: value, //name 키를 가진 값을 value 로 설정
    });
  };
  const onReset = () => {
    setInputs({
      name: "",
      nickName: "",
    });
    nameInput.current.focus();
  };
  return (
    <div>
      <input
        placeholder="이름"
        onChange={onChange}
        value={name}
        name="name"
        ref={nameInput}
      />
      <input
        placeholder="닉네임"
        onChange={onChange}
        value={nickName}
        name="nickName"
      />
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값:</b>
        {name} ({nickName})
      </div>
    </div>
  );
};

export default InputSample;
