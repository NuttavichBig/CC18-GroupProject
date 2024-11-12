import { motion } from "framer-motion";

function BookingProgressBallRight() {
  return (
    <div className="grid grid-cols-2 items-center mb-8">
      <h2 className="text-5xl font-bold ml-2 text-green-500">PAID SUCCESS</h2>
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
