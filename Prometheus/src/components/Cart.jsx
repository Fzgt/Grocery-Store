import React from 'react';

const Cart = () => {
    return (
        <div style={{ 
            maxWidth: '1000px',
            margin: '0 auto', 
            padding: '20px',
            backgroundColor: '#121212',
            color: '#e0e0e0'
        }}>
            <h1 style={{ 
                fontSize: '24px', 
                marginBottom: '20px',
                color: '#ffffff'
            }}>
                Shopping Cart
            </h1>
            
            <div style={{ 
                backgroundColor: '#1a1a1a', 
                borderRadius: '8px', 
                padding: '40px',
                textAlign: 'center',
                minHeight: '300px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '20px'
            }}>
                <div style={{ fontSize: '20px' }}>Your cart is empty</div>
                <p style={{ color: '#a0a0a0' }}>Items added to your cart will appear here</p>
                <a 
                    href="/" 
                    style={{ 
                        display: 'inline-block', 
                        padding: '10px 20px', 
                        backgroundColor: '#3b82f6', 
                        color: 'white', 
                        borderRadius: '4px', 
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        marginTop: '10px'
                    }}
                >
                    Continue Shopping
                </a>
            </div>
        </div>
    );
};

export default Cart; 