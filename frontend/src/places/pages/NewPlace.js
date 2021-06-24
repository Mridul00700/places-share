// import Input from "";
import { useCallback } from "react";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MIN,
  VALIDATOR_REQUIRE,
} from "../../shared/components/Util/validators";
import "./NewPlace.css";

const NewPlace = () => {
  const titleInputHandler = useCallback((id, valid, isValid) => {}, []);
  const descriptionInputHandler = useCallback((id, valid, isValid) => {}, []);

  return (
    <form className="place-form">
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title"
        onInput={titleInputHandler}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MIN(5)]}
        errorText="Please enter a valid description (atleast 5 characters)"
        onInput={descriptionInputHandler}
      />
    </form>
  );
};

export default NewPlace;
