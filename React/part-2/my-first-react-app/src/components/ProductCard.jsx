const ProductCard = ({ name, image, price, rating, inStock }) => {
    return <>
        <div
            style={{
                border: '1px solid #e0e0e0',
                borderRadius: '10px',
                overflow: 'hidden',
                width: '200px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                fontFamily: 'Arial, sans-serif'
            }}>
            <img
                src={image}
                alt={name}
                style={{
                    width: '100%',
                    height: '180px',
                    objectFit: 'cover'
                }} />
            <div style={{ padding: '14px' }}>
                <h3 style={{ margin: '0 0 6px', fontSize: '15px' }}>{name}</h3>
                <p style={{ margin: '0 0 8px', color: '#e44', fontWeight: 'bold', fontSize: '18px' }}>
                    Rs. {price}
                </p>
            </div>

            <div
                style={{
                    marginBottom: '10px'
                }}>
                {'\u2605'.repeat(Math.floor(rating))}
                {'\u2606'.repeat(5 - Math.floor(rating))}
                <span style={{ marginLeft: '6px', color: '#888', fontSize: '12px' }}>
                    ({rating})
                </span>

                <span style={{
                    fontSize: '12px',
                    padding: '3px 8px',
                    borderRadius: '99px',
                    background: inStock ? '#d4edda' : '#f8d7da',
                    color: inStock ? '#155724' : '#721c24'
                }}>
                    {inStock ? 'In Stock' : 'Out of Stock'}
                </span>
                <button style={{
                    display: 'block',
                    width: '100%',
                    marginTop: '12px',
                    padding: '10px',
                    background: inStock ? '#FF9F00' : '#ccc',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: inStock ? 'pointer' : 'not-allowed',
                    fontWeight: 'bold',
                    fontSize: '14px'
                }}>
                    {inStock ? 'Add to Cart' : 'Notify Me'}
                </button>

            </div>
        </div>
    </>
}

export default ProductCard;