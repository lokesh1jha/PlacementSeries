const Avatar = ({src, alt, size=80}) => {
    return (
        <div className="'avatar">
            <img src={src} 
            alt={alt} 
            style={{
                borderRadius: '50%',
                width: size,
                height: size,
                border: '2px solid #ddd'
            }}/>
        </div>
    );
};

export default Avatar;