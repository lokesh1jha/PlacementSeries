const UserInfo = ({name, role, city}) => {
    return (
        <div className="user-info">
            <h2>{name}</h2>
            <p>{role}</p>
            <p>{city}</p>
        </div>
    );
}

export default UserInfo;