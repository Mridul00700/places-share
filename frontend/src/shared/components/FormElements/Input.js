// import { useState } from "react";
import { useReducer } from "react";
import "./Input.css";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  // const [enterValue, setEntervalue] = useState("");
  // const [isValid, setIsvalid] = useState(false);
  useReducer(inputReducer);
  const changeHandler = (event) => {};

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onchange={changeHandler}
      />
    ) : (
      <textarea id={props.id} rows={props.rows || 3} onchange={changeHandler} />
    );

  return (
    <div className={`form-control`}>
      <label htmlfor={props.id}>{props.label}</label>
      {element}
    </div>
  );
};

export default Input;
