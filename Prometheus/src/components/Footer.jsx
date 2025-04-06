import { ChevronRightIcon } from '@radix-ui/react-icons';

const Footer = () => (
    <footer style={{ 
        backgroundColor: '#1a1a1a', 
        padding: '20px',
        borderTop: '1px solid #333333',
        marginTop: 'auto', // Helps with flexbox sticky footer
        flexShrink: 0 // Prevents the footer from shrinking
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
                © 2023 BeyzMarket. All rights reserved
            </div>
        </div>
    </footer>
);

export default Footer;