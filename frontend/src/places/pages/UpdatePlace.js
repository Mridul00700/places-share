
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/components/Util/validators';
import { useForm } from '../../shared/hooks/form-hook.js';
import Card from '../../shared/components/UIElements/Card';
import './PlaceForm.css';

const DummyPlaces = [
    {
        id: 'p1',
        title: 'Empire',
        description: 'Skyscraper',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/375px-Empire_State_Building_%28aerial_view%29.jpg',
        address: '20 W 34th St, New York, NY 10001, United States',
        location: {
            lat: 40.748817,
            lng: -73.985428
        },
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Empire2',
        description: 'Skyscraper',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/375px-Empire_State_Building_%28aerial_view%29.jpg',
        address: '20 W 34th St, New York, NY 10001, United States',
        location: {
            lat: 36.6355333,
            lng: -75.1263605
        },
        creator: 'u2'
    }
]


const UpdatePlace = () => {

    const placeId = useParams().placeId;
    const [loading, setLoading] = useState(true);

    const [formState, inputHandler, setFormData] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        }
    }, false);

    const placeUpdateSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
    }
    const identifiedPlace = DummyPlaces.find(place => place.id === placeId);

    useEffect(() => {

        if (identifiedPlace) {
            setFormData({
                title: {
                    value: identifiedPlace.title,
                    isValid: true
                },
                description: {
                    value: identifiedPlace.description,
                    isValid: true
                }
            }, true);
        }
        setLoading(false);
    }, [setFormData, identifiedPlace]);

    // console.log(placeId);
    // const identifiedPlace = DummyPlaces.filter(place => place.id === placeId)

    if (!identifiedPlace) {
        return (
            <div className="center">
                <Card>
                    <h2>Could Not find the place!</h2>
                </Card>
            </div>)
    }
    if (loading) {
        return (
            <div className="center">
                <h2>Loading!....</h2>
            </div>)
    }

    return (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
            <Input id='title'
                element="input"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title."
                onInput={inputHandler}
                initialValue={formState.inputs.title.value}
                initialValid={formState.inputs.title.isValid}
            />
            <Input id='description'
                element="text"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid description. (Minimum 5 characters)"
                onInput={inputHandler}
                initialValue={formState.inputs.description.value}
                initialValid={formState.inputs.description.isValid}
            />
            <Button type="submit" disabled={!formState.isValid}>
                Update Place
            </Button>
        </form>
    )
}

export default UpdatePlace;