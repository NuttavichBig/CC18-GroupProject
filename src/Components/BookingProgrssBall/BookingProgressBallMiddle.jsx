import { motion } from "framer-motion";

function BookingProgressBallMiddle() {
  return (
    <div className="grid grid-cols-2 mx-auto items-center mb-3">
      <h2 className="text-5xl font-bold ml-2 ">Payment</h2>
      <div className="flex justify-center items-center w-full">
        <div className="flex items-center h-[100px]">
          <motion.div
            className="rounded-full bg-orange-500"
            style={{ width: "40px", height: "40px" }}
          />
          <div className="h-1 w-52 bg-orange-300 mx-0"></div>
          <motion.div
            className="rounded-full bg-orange-500"
            style={{ width: "40px", height: "40px" }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
          />
          <div className="h-1 w-52 bg-gray-300 mx-0"></div>
          <motion.div
            className="rounded-full bg-gray-300"
            style={{ width: "40px", height: "40px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default BookingProgressBallMiddle;
