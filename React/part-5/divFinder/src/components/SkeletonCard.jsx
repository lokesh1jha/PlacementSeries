function SkeletonCard() {
    const shimmer = {
        background: 'linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
        borderRadius: '6px'
    }

    return (
        <div style={{ background: 'white', borderRadius: '12px', padding: '20px', width: '260px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <div style={{ ...shimmer, width: 48, height: 48, borderRadius: '50%', marginBottom: 12 }} />
            <div style={{ ...shimmer, width: '70%', height: 14, marginBottom: 8 }} />
            <div style={{ ...shimmer, width: '50%', height: 12, marginBottom: 8 }} />
            <div style={{ ...shimmer, width: '60%', height: 12 }} />
        </div>
    )

}

export default SkeletonCard;