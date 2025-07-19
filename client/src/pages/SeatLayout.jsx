import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowRightIcon, ClockIcon } from "lucide-react";
import { dummyShowsData, dummyDateTimeData, assets } from "../assets/assets";
import isoTimeFormat from "../lib/isoTimeFormat";
import BlurCircle from "../components/BlurCircle";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const SEAT_LIMIT = 5;
const ROW_GROUPS = [
  ["A", "B"],
  ["C", "D"],
  ["E", "F"],
  ["G", "H"],
  ["I", "J"],
];

const SeatLayout = () => {
  const { id, date } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const match = dummyShowsData.find((m) => m.id === parseInt(id));
    if (match) setShow({ movie: match, dateTime: dummyDateTimeData });
  }, [id]);

  const handleSeatClick = (seatId) => {
    if (!selectedTime) return toast("Please select time first");
    if (!selectedSeats.includes(seatId) && selectedSeats.length >= SEAT_LIMIT)
      return toast(`You can only select ${SEAT_LIMIT} seats`);

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : [...prev, seatId]
    );
  };

  const renderSeats = (row, count = 9) => (
    <div key={row} className="flex gap-2 mt-2 flex-wrap justify-center">
      {Array.from({ length: count }, (_, i) => {
        const seatId = `${row}${i + 1}`;
        const active = selectedSeats.includes(seatId);
        return (
          <motion.button
            key={seatId}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSeatClick(seatId)}
            className={`h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded border border-primary/60 text-xs font-medium
              ${active ? "bg-primary text-white" : "hover:bg-primary/20"}`}
          >
            {seatId}
          </motion.button>
        );
      })}
    </div>
  );

  if (!show)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center h-[60vh] text-white"
      >
        Loading seats…
      </motion.div>
    );

  const timings = show.dateTime[date] || [];

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-40 pt-24 pb-10 flex flex-col md:flex-row gap-10">
      <motion.aside
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 16 }}
        className="md:w-60 w-full bg-gradient-to-br from-[#2a0912]/80 to-[#110a0f]/80 border border-white/10 backdrop-blur rounded-xl p-6 shadow-lg sticky md:top-28 h-max"
      >
        <h2 className="text-lg font-semibold mb-4 text-white">Available Timings</h2>
        <div className="space-y-2">
          {timings.map((t) => {
            const active = selectedTime === t.time;
            return (
              <button
                key={t.time}
                onClick={() => setSelectedTime(t.time)}
                className={`flex items-center gap-2 w-full px-5 py-2 rounded-md transition-colors
                  ${active ? "bg-[#ff3c78] text-white" : "hover:bg-white/10"}`}
              >
                <ClockIcon className="w-4 h-4" />
                <span className="text-sm tracking-wide">{isoTimeFormat(t.time)}</span>
              </button>
            );
          })}
        </div>
      </motion.aside>

      <motion.main
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex flex-col items-center"
      >
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle bottom="0" right="0" />

        <h1 className="text-2xl font-semibold mb-4 text-white">Select Your Seat</h1>
        <img src={assets.screenImage} alt="screen" className="max-w-xs" />
        <p className="text-gray-400 text-sm mb-10">SCREEN SIDE</p>

        <div className="text-gray-300 text-[11px] flex flex-col items-center w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12 mb-8 w-full">
            {ROW_GROUPS[0].map((row) => renderSeats(row))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 w-full">
            {ROW_GROUPS.slice(1).map((pair) => (
              <div key={pair[0]} className="space-y-2">
                {pair.map((row) => renderSeats(row))}
              </div>
            ))}
          </div>
        </div>

        {selectedSeats.length > 0 && selectedTime && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/my-bookings")}
            className="flex items-center cursor-pointer gap-2 mt-10 bg-primary text-white py-2 px-6 rounded-full shadow-lg"
          >
            Proceed to Checkout
            <ArrowRightIcon strokeWidth={3} className="w-4 h-4" />
          </motion.button>
        )}
      </motion.main>
    </div>
  );
};

export default SeatLayout;