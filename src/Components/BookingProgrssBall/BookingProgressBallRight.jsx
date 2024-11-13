import { motion } from "framer-motion";

function BookingProgressBallRight() {
  return (
    <div className="flex items-center justify-center mb-8 ">
      <div className="flex items-center h-[100px]">
        <motion.div
          className="rounded-full bg-orange-500"
          style={{ width: "40px", height: "40px" }}
        />
        <div className="h-1 w-52 bg-orange-300 mx-0"></div>
        <motion.div
          className="rounded-full bg-orange-500"
          style={{ width: "40px", height: "40px" }}
        />
        <div className="h-1 w-52 bg-orange-300 mx-0"></div>
        <motion.div
          className="rounded-full bg-orange-500"
          style={{ width: "40px", height: "40px" }}
        />
      </div>
    </div>
  );
}

export default BookingProgressBallRight;
