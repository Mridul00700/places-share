import './UserList.css';
import UserItem from './UserItem';

const UserList = props => {

    if (props.items.length === 0) {
        return <div className="center">
            <h2>No Users Found</h2>
        </div>
    };

    return <ul>
        {props.items.map(user => (
            <UserItem key={user.id} id={user.id} image={user.image} name={user.name} placeCount={user.places} />
        ))}
    </ul>
}


export default UserList;