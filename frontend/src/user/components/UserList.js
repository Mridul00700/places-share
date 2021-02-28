import './UserList.css';

const UserList = props => {

    if (props.items.length === 0) {
        return <div className="center">
            <h2>No Users Found</h2>
        </div>
    };

    return <ul>
        {props.items.map(user => {
            return
        })}
    </ul>
}


export default UserList;