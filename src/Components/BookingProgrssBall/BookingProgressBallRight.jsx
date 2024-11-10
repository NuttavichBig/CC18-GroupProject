import { motion } from 'framer-motion';

function BookingProgressBallRight() {
    return (


        <div className="flex justify-center items-center w-full mx-auto">
            <div className="flex items-center h-[100px]">
                <motion.div
                    className="rounded-full bg-orange-500"
                    style={{ width: '60px', height: '60px' }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                />
                <div className="h-1 w-52 bg-black mx-0"></div>
                <motion.div
                    className="rounded-full bg-orange-500"
                    style={{ width: '60px', height: '60px' }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
                />
                <div className="h-1 w-52 bg-black mx-0"></div>
                <motion.div
                    className="rounded-full bg-orange-500"
                    style={{ width: '60px', height: '60px' }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 1 }}
                />
            </div>
        </div>

    );
}

export default BookingProgressBallRight;
