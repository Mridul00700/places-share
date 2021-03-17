
import PlaceList from '../components/PlaceList';

const DummyPlaces = [
    {
        id: 'p1',
        title: 'Empire',
        description: 'Skyscraper',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/375px-Empire_State_Building_%28aerial_view%29.jpg',
        address: '20 W 34th St, New York, NY 10001, United States',
        location: {
            lat: 36.6355333,
            lng: -75.1263605
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

const UserPlaces = () => {


    return <PlaceList items={DummyPlaces} />

}

export default UserPlaces;