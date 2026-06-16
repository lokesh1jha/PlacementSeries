function UserCard({ user }) {

    return (
        <div
            style={{
                background: 'white',
                borderRadius: '12px',
                padding: '20px',
                width: '260px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.6)'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }} >
                <div style={{
                    width: 44, height: 44, borderRadius: '50%',
                    background: '#0088AA', color: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: '700', fontSize: '18px'
                }}>
                    {user.name.charAt(0)}
                </div>
                <div>
                    <h3 style={{ margin: 0, fontSize: '15px' }}>{user.name}</h3>
                    <p style={{ margin: 0, color: '#666', fontSize: '12px' }}>{user.username}</p>
                </div>
            </div>
            <p style={{ fontSize: '13px', color: '#444', marginBottom: '4px' }}>📧 {user.email}</p>
            <p style={{ fontSize: '13px', color: '#444', marginBottom: '4px' }}>🏢 {user.company.name}</p>
            <p style={{ fontSize: '13px', color: '#444' }}>📍 {user.address.city}</p>
        </div>

    )
}

export default UserCard;