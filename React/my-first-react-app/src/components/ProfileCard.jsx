import Avatar from "./Avatar"
import UserInfo from "./UserInfo"

const ProfileCard = ({name, role, city, avatarURL, size}) => {
    return (
        <div
        style={{
            border: '1px solid #ddd',
            borderRadius: '12px',
            padding: '24px',
            maxWidth: '300px',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
        }}>
            <Avatar src={avatarURL} alt={name}/>
            <UserInfo name={name} role={role} city={city}/>
        </div>
    )
}

export default ProfileCard;
