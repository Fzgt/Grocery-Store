const Footer = () => (
    <footer style={{
        backgroundColor: '#1a1a1a',
        padding: '20px',
        borderTop: '1px solid #333333',
        marginTop: 'auto',
        flexShrink: 0
    }}>
        <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px'
        }}>



            <div style={{
                fontSize: '12px',
                color: '#777777'
            }}>
                © 2025 BeyzMarket. All rights reserved
            </div>
        </div>
    </footer>
);

export default Footer;