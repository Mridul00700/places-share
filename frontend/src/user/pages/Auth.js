import Input from '../../shared/components/FormElements/Input';
import { useForm } from '../../shared/hooks/form-hook';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/components/Util/validators';
import './Auth.css';
const Auth = props => {


    const [formState, inputHandler] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    }, false);

    const submitHandler = e => {
        e.preventDefault();
        console.log(formState.inputs);
    }

    return (
        <Card className="authentication" >
            <h2>Login Required</h2>
            <hr />
            <form onSubmit={submitHandler} >
                <Input
                    id="email"
                    element="input"
                    type="email"
                    label="Email"
                    validators={[VALIDATOR_EMAIL()]}
                    errorText="Please enter a valid email id."
                    onInput={inputHandler}
                />
                <Input
                    id='password'
                    element="input"
                    type="password"
                    label="Password"
                    validators={[VALIDATOR_MINLENGTH(7)]}
                    errorText="Please enter a valid password (atleast 7 characters)"
                    onInput={inputHandler}
                />
                <Button type="submit" disabled={!formState.isValid}>LOGIN</Button>
            </form>
        </Card>
    )
}

export default Auth;