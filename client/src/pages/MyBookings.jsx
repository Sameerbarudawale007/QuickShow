import React, { useEffect, useState } from "react";
import { dummyBookingData } from "../assets/assets";
import BlurCircle from "../components/BlurCircle";
import timeFormat from "../lib/timeFormat";
import { dateFormat } from "../lib/dateFormat";
import { motion } from "framer-motion";
import { useAppContext } from "../context/AppContext";

const MyBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY;
  const { axios, getToken, user, image_base_url } = useAppContext();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getMyBookings = async () => {
    try {
      const { data } = await axios.get("/api/user/bookings", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        setBookings(data.bookings);
      }
       setBookings(dummyBookingData); 
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to fetch bookings. Please try again later.");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (user) {
      getMyBookings();
    }
  }, [user]);

  return !isLoading ? (
    <div className="relative px-4 md:px-16 lg:px-40 pt-28 pb-10 min-h-[80vh]">
      <BlurCircle top="100px" left="100px" />
      <BlurCircle bottom="0px" left="600px" />
      <h1 className="text-lg font-semibold mb-6 text-white">My Bookings</h1>

      <div className="space-y-6">
        {bookings.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex flex-col md:flex-row md:items-center justify-between bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-sm"
          >
            <div className="flex flex-col md:flex-row items-center gap-4 p-4 w-full">
              <img
                src={image_base_url + item.show.movie.poster_path}
                alt="poster"
                className="w-full md:w-32 h-44 object-cover rounded-lg"
              />
              <div className="flex flex-col gap-1 w-full">
                <p className="text-base md:text-lg font-semibold text-white">
                  {item.show.movie.title}
                </p>
                <p className="text-gray-400 text-sm">
                  Duration: {timeFormat(item.show.movie.runtime)}
                </p>
                <p className="text-gray-400 text-sm">
                  Show Date: {dateFormat(item.show.showDateTime)}
                </p>
                <p className="text-gray-400 text-sm">
                  Seats: {item.bookedSeats.join(", ")} (
                  {item.bookedSeats.length} tickets)
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end justify-between p-4 md:w-48">
              <p className="text-xl font-semibold text-white">
                {currency}
                {item.amount}
              </p>
              {!item.isPaid && (
                <button className="mt-2 text-sm bg-primary hover:bg-primary/80 transition-colors px-4 py-1.5 text-white rounded-full">
                  Pay Now
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen text-white">
      <p>Loading...</p>
    </div>
  );
};

export default MyBookings;
