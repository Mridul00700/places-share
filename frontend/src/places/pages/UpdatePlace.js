
import { useParams } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/components/Util/validators';

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
        title: 'Empire',
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

    const placeId = useParams.placeId;
    // const identifiedPlace = DummyPlaces.filter(place => place.id === placeId)
    const identifiedPlace = DummyPlaces.find(place => place.id === placeId);

    if (!identifiedPlace) {
        return (
            <div className="center">
                <h2>Could Not find the place!</h2>
            </div>)
    }

    return <form>
        <Input id='title'
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={() => { }}
            value={identifiedPlace.title}
            valid={true}
        />
        <Input id='description'
            element="text"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description. (Minimum 5 characters)"
            onInput={() => { }}
            value={identifiedPlace.description}
            valid={true}
        />
        <Button type="submit" disabled={true}>
            Update Place
        </Button>
    </form>
}

export default UpdatePlace;