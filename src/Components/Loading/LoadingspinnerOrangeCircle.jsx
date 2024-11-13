import React from 'react';
import loadingAnimationUrl from '../../assets/Loading/spinnerloadingOrange.gif';

const LoadingspinnerOrangeCircle = () => {
    return (
        <div style={styles.container}>
            <img src={loadingAnimationUrl} alt="Loading..." style={styles.image} />
            {/* <div style={styles.loadingText}>Loading ...</div> */}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100px', // ความสูง
        width: '100px',  // ความกว้าง
        textAlign: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0)', // พื้นหลังโปร่งแสง
    },
    image: {
        width: '100px', // ขนาดภาพ
        height: '100px', // ขนาดภาพ
        marginBottom: '10px', // เพิ่มระยะห่างด้านล่างของภาพ
    },
    loadingText: {
        fontSize: '24px', // ขนาดตัวอักษร
        color: '#FF6AD3', // สีตัวอักษร
        fontWeight: 'bold', // ตัวหนา
        animation: 'fadeIn 1s ease-in-out', // เพิ่มอนิเมชัน
    },
    '@keyframes fadeIn': {
        '0%': { opacity: 0 },
        '100%': { opacity: 1 },
    },
};



export default LoadingspinnerOrangeCircle;
