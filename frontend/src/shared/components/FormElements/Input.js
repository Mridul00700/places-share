import "./Input.css";

const Input = (props) => {
  return (
    <div classNames={`form-control`}>
      <label htmlFor={props.id}>{props.label}</label>
    </div>
  );
};

export default Input;
