import React from 'react';
import loadingAnimationUrl from '../../assets/Loading/LoadingCouponCreate.gif';


const LoadingCouponCreate = () => {
    return (
        <div style={styles.container}>
            <img src={loadingAnimationUrl} alt="Loading..." style={styles.image} />

        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', 
        width: '100vh',  
        textAlign: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0)', 
    },
    image: {
        width: '300px', 
        height: '300px', 
        marginBottom: '10px',
    },
    loadingText: {
        fontSize: '24px', 
        color: '#FF6AD3', 
        fontWeight: 'bold', 
        animation: 'fadeIn 1s ease-in-out',
    },
    // '@keyframes fadeIn': {
    //     '0%': { opacity: 0 },
    //     '100%': { opacity: 1 },
    // },
};



export default LoadingCouponCreate;
