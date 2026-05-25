
import { useState } from 'react';


function LikeButton() {
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);


    // Define handler as a function inside the component
    function handleLike() {
        if (liked) {
            setLikes(likes - 1);
            setLiked(false);
        } else {
            setLikes(likes + 1);
            setLiked(true);
        }
    }


    return (
        <button
            onClick={handleLike}
            style={{
                background: liked ? '#e0245e' : '#f0f0f0',
                color: liked ? 'white' : '#333',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '99px',
                cursor: 'pointer',
                fontSize: '14px'
            }}
        >
            {liked ? '♥' : '♡'} {likes} {likes === 1 ? 'Like' : 'Likes'}
        </button>
    );
}



export default LikeButton;