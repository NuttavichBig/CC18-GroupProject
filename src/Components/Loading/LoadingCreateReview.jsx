import React from 'react';
import loadingAnimationUrl from '../../assets/Loading/CreateReviewLoading.gif';


const LoadingCreateReview = () => {
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
        height: '100vh', // ความสูง
        width: '100vh',  // ความกว้าง
        textAlign: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0)', // พื้นหลังโปร่งแสง
    },
    image: {
        width: '300px', // ขนาดภาพ
        height: '300px', // ขนาดภาพ
        marginBottom: '10px', // เพิ่มระยะห่างด้านล่างของภาพ
    },
    loadingText: {
        fontSize: '24px', // ขนาดตัวอักษร
        color: '#FF6AD3', // สีตัวอักษร
        fontWeight: 'bold', // ตัวหนา
        animation: 'fadeIn 1s ease-in-out',
    },
    // '@keyframes fadeIn': {
    //     '0%': { opacity: 0 },
    //     '100%': { opacity: 1 },
    // },
};



export default LoadingCreateReview;
